import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderLogement from '../components/headerLogement';
import CardProv from '../components/cardProv';
import CardLargeSite from '../components/cardLargeSite';
import styles from '../styles/site';

const { width } = Dimensions.get('window');

// Composant carousel amélioré pour les meilleurs sites
const BestSitesCarousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width * 0.8));
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.carouselItem}>
            <CardLargeSite data={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={width * 0.8 + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * (width * 0.8 + 16),
            index * (width * 0.8 + 16),
            (index + 1) * (width * 0.8 + 16),
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

// Composant pour la liste des provinces
const ListProvinces = ({ data, onProvincePress }) => {
  return (
    <View style={styles.provincesContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Toutes les provinces</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Tout voir</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardProv
            data={item}
            onPress={() => onProvincePress(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.provincesList}
      />
    </View>
  );
};

// Composant pour la liste générale des sites
const AllSitesList = ({ data, onSitePress }) => {
  const renderSiteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.siteItem}
      onPress={() => onSitePress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.siteImageContainer}>
        <Image
          source={{ uri: item.imageUri || 'https://via.placeholder.com/300x200' }}
          style={styles.siteImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.siteImageGradient}
        />
        <View style={styles.siteBadge}>
          <Text style={styles.siteType}>{item.type}</Text>
        </View>
        <View style={styles.siteRating}>
          <Icon name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.siteInfo}>
        <Text style={styles.siteTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.siteLocation}>
          <Icon name="map-marker" size={14} color="#666" />
          <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.siteFooter}>
          <Text style={styles.sitePrice}>
            À partir de <Text style={styles.priceValue}>${item.price}</Text>/jour
          </Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Réserver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.allSitesContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tous les sites touristiques</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Filtrer</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderSiteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.allSitesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Écran principal
const SiteBest = () => {
  const [provinces, setProvinces] = useState([]);
  const [bestSites, setBestSites] = useState([]);
  const [allSites, setAllSites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);

  // Fonction de rafraîchissement
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadData = () => {
    // Données des provinces
    const provincesData = [
      { id: 1, name: "Kinshasa", urlImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64", count: 45 },
      { id: 2, name: "Nord-Kivu", urlImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", count: 32 },
      { id: 3, name: "Sud-Kivu", urlImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba", count: 28 },
      { id: 4, name: "Kongo Central", urlImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", count: 21 },
      { id: 5, name: "Équateur", urlImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000", count: 18 },
      { id: 6, name: "Katanga", urlImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", count: 35 },
      { id: 7, name: "Kasaï", urlImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1", count: 16 },
    ];

    // Meilleurs sites
    const bestSitesData = [
      {
        id: '1',
        title: 'Parc National de Virunga',
        type: 'Parc National',
        rating: 4.8,
        price: 150,
        location: 'Nord-Kivu, RDC',
        imageUri: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7',
        description: 'Le plus ancien parc national d\'Afrique, habitat des gorilles de montagne',
        features: ['Gorilles', 'Volcan', 'Safari']
      },
      {
        id: '2',
        title: 'Lac Kivu',
        type: 'Lac',
        rating: 4.6,
        price: 100,
        location: 'Goma, RDC',
        imageUri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        description: 'Lac d\'eau douce entouré de montagnes et de plages de sable',
        features: ['Plage', 'Navigation', 'Pêche']
      },
      {
        id: '3',
        title: 'Chutes de Zongo',
        type: 'Chutes d\'eau',
        rating: 4.7,
        price: 80,
        location: 'Kongo Central, RDC',
        imageUri: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda',
        description: 'Magnifiques chutes d\'eau au cœur de la forêt tropicale',
        features: ['Randonnée', 'Baignade', 'Photos']
      },
      {
        id: '4',
        title: 'Mont Ngaliema',
        type: 'Montagne',
        rating: 4.5,
        price: 120,
        location: 'Kinshasa, RDC',
        imageUri: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        description: 'Point de vue panoramique sur la ville de Kinshasa',
        features: ['Randonnée', 'Panorama', 'Pique-nique']
      },
    ];

    // Tous les sites
    const allSitesData = [
      ...bestSitesData,
      {
        id: '5',
        title: 'Marché de la Liberté',
        type: 'Marché',
        rating: 4.3,
        price: 0,
        location: 'Kinshasa, RDC',
        imageUri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'
      },
      {
        id: '6',
        title: 'Musée National',
        type: 'Musée',
        rating: 4.4,
        price: 10,
        location: 'Kinshasa, RDC',
        imageUri: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd'
      },
    ];

    setProvinces(provincesData);
    setBestSites(bestSitesData);
    setAllSites(allSitesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProvincePress = (province) => {
    setSelectedProvince(province);
    // Navigation ou filtrage des sites par province
    console.log('Province sélectionnée:', province.name);
  };

  const handleSitePress = (site) => {
    // Navigation vers les détails du site
    console.log('Site sélectionné:', site.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLogement
        title="Sites Touristiques"
        showSearch={true}
        onSearchPress={() => console.log('Recherche')}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A6FA5']}
            tintColor="#4A6FA5"
          />
        }
      >
       

        {/* Section des meilleurs sites (carousel) */}
        <View style={styles.bestSitesSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>⭐ Meilleurs sites</Text>
              <Text style={styles.sectionSubtitle}>Les plus populaires cette semaine</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Tout voir</Text>
              <Icon name="arrow-right" size={12} color="#4A6FA5" />
            </TouchableOpacity>
          </View>
          <BestSitesCarousel data={bestSites} />
        </View>

        {/* Section des provinces */}
        <ListProvinces
          data={provinces}
          onProvincePress={handleProvincePress}
        />

        {/* Section tous les sites */}
        <AllSitesList
          data={allSites}
          onSitePress={handleSitePress}
        />

        {/* Espace en bas pour la tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SiteBest;