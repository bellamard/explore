import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Styles from '../styles/home';
import Headers from '../components/header';
import CategoryCard from '../components/category';
import Banner from '../components/banner';
import CardItem from '../components/cardItem';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width * 0.85 + 20;
const categoriesItem = [
  {
    id: 1,
    title: 'Voyages',
    iconName: 'plane',
    count: 12,
    onPress: () => {
      console.log('Voyages Pressed');
    },
    isSelected: false,
  },
  {
    id: 2,
    title: 'Nourriture',
    iconName: 'cutlery',
    count: 5,
    onPress: () => {
      console.log('Nourriture Pressed');
    },
    isSelected: false,
  },
  {
    id: 3,
    title: 'Voyages',
    iconName: 'plane',
    count: 12,
    onPress: () => {
      console.log('Voyages Pressed');
    },
    isSelected: false,
  },
  {
    id: 4,
    title: 'Nourriture',
    iconName: 'cutlery',
    count: 5,
    onPress: () => {
      console.log('Nourriture Pressed');
    },
    isSelected: false,
  },
  {
    id: 5,
    title: 'Voyages',
    iconName: 'plane',
    count: 12,
    onPress: () => {
      console.log('Voyages Pressed');
    },
    isSelected: false,
  },
  {
    id: 6,
    title: 'Nourriture',
    iconName: 'cutlery',
    count: 5,
    onPress: () => {
      console.log('Nourriture Pressed');
    },
    isSelected: false,
  },
];

const bannerData = [
  {
    title: 'Festival des Lumières de Lyon',
    image: 'https://picsum.photos/800/600?random=31',
    type: 'Spectacle',
    town: 'Lyon, France',
    payment: 'Gratuit',
    onPress: () => console.log('Lumières de Lyon'),
  },
  {
    title: 'Concert de Jazz au bord du lac',
    image: 'https://picsum.photos/800/600?random=5',
    type: 'Concert',
    town: 'Genève, Suisse',
    payment: '45 €',
    onPress: () => console.log('Concert Jazz'),
  },
  {
    title: 'Visite guidée du Colisée',
    image: 'https://picsum.photos/800/600?random=8',
    type: 'Public Site',
    town: 'Rome, Italie',
    payment: '12 €',
    onPress: () => console.log('Colisée'),
  },
];

const itemEvents = [
  {
    id: 'e1',
    title: 'Excursion à la Montagne Bleue et randonnée',
    image: 'https://picsum.photos/100/100?random=11',
    rating: 4.8,
    location: 'Chamonix, France',
    price: 187,
    onPress: () => console.log('Hôtel Chamonix Pressed'),
    onFavoritePress: () => console.log('Toggle Favorite Chamonix'), // Action pour le cœur
  },
  {
    id: 'e2',
    title: 'Dégustation de vins fins régionaux',
    image: 'https://picsum.photos/100/100?random=22',
    rating: 4.5,
    location: 'Bordeaux, France',
    price: 120,
    onPress: () => console.log('Hôtel Bordeaux Pressed'),
    onFavoritePress: () => console.log('Toggle Favorite Bordeaux'),
  },
  {
    id: 'e3',
    title: 'Visite guidée du musée d’art moderne',
    image: 'https://picsum.photos/100/100?random=33',
    rating: 4.9,
    location: 'Paris, France',
    price: 250,
    onPress: () => console.log('Hôtel Paris Pressed'),
    onFavoritePress: () => console.log('Toggle Favorite Paris'),
  },
];

const categories = categoriesData => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={Styles.categoryCard}>
          {categoriesData.map(data => (
            <CategoryCard key={data.id} {...data} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const BannersCarousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={Styles.carouselContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Banner {...item} style={Styles.bannerCard} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={Styles.carouselContent}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={Styles.paginationContainer}>
        {data.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              BANNER_WIDTH * (index - 1),
              BANNER_WIDTH * index,
              BANNER_WIDTH * (index + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const dotOpacity = scrollX.interpolate({
            inputRange: [
              BANNER_WIDTH * (index - 1),
              BANNER_WIDTH * index,
              BANNER_WIDTH * (index + 1),
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[Styles.dot, { width: dotWidth, opacity: dotOpacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const EventsList = ({ items }) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <CardItem item={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const Container = () => {
  return (
    <View style={Styles.container}>
      {categories(categoriesItem)}
      <View style={Styles.section}>
        <Text style={Styles.welcomeText}>Recommandation</Text>
        <View style={Styles.line} />
        <BannersCarousel data={bannerData} />
      </View>

      <View style={Styles.section}>
        <Text style={Styles.sectionTitle}>Evenements</Text>
        <View style={Styles.line} />
        <EventsList items={itemEvents} />
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View>
      <Headers
        userData={{
          name: 'Jean Dupont',
          avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
        }}
        onMenuPress={() => console.log('Menu Pressed')}
        onSearchPress={() => console.log('Search Pressed')}
        onNotificationPress={() => console.log('Notification Pressed')}
      />
      <Container />
    </View>
  );
};

export default Home;
