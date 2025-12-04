import React from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import Styles from '../styles/home';
import Headers from '../components/header';
import CategoryCard from '../components/category';
import Banner from '../components/banner';
import CardItem from '../components/cardItem';
import CardSiteItem from '../components/cardSite';
const { height } = Dimensions.get('window');

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

const siteData = [
  {
    id: 's1',
    name: 'Eiffel Tower',
    image: 'https://picsum.photos/200/300?random=1',
    address: { town: 'Paris' },
    rating: 4.7,
  },
  {
    id: 's2',
    name: 'Louvre Museum',
    image: 'https://picsum.photos/200/300?random=2',
    address: { town: 'Paris' },
    rating: 4.8,
  },
  {
    id: 's3',
    name: 'Notre-Dame Cathedral',
    image: 'https://picsum.photos/200/300?random=3',
    address: { town: 'Paris' },
    rating: 4.6,
  },
];

const Categories = ({ data }) => (
  <View style={{ marginTop: 10 }}>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CategoryCard {...item} />}
      contentContainerStyle={Styles.categoryCard}
    />
  </View>
);

const BannersCarousel = ({ data }) => (
  <FlatList
    data={data}
    horizontal
    pagingEnabled
    snapToAlignment="center"
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => <Banner {...item} style={Styles.bannerCard} />}
    contentContainerStyle={Styles.carouselContent}
    style={{ marginTop: 15 }}
  />
);

const EventsList = ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <CardItem item={item} />}
    keyExtractor={item => item.id}
    nestedScrollEnabled
    scrollEnabled={false}
  />
);

const SiteBest = ({ data }) => (
  <View style={{ marginTop: 10 }}>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <CardSiteItem siteData={item} />}
      contentContainerStyle={{ gap: 15, paddingHorizontal: 10 }}
    />
  </View>
);

const 

const Home = () => {
  return (
    <View>
      <View style={Styles.headerContainer}>
        <Headers
          userData={{
            name: 'Jean Dupont',
            avatarUrl: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
          }}
          onMenuPress={() => console.log('Menu Pressed')}
          onSearchPress={() => console.log('Search Pressed')}
          onNotificationPress={() => console.log('Notification Pressed')}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={[Styles.container]}>
              <Categories data={categoriesItem} />

              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}>Recommandation</Text>
                <View style={Styles.line} />
                <BannersCarousel data={bannerData} />
              </View>

              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}>Évènements</Text>
                <View style={Styles.line} />
              </View>
            </View>
          </>
        }
        data={itemEvents}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: height * 0.3 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <View style={Styles.container}>
              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}> Meilleur Places</Text>
                <View style={Styles.line} />
                <SiteBest data={siteData} />
              </View>
            </View>
            <View style={Styles.container}>
              <View style={Styles.section}>
                <Text style={Styles.sectionTitle}> Témoignage</Text>
                <View style={Styles.line} />
                <SiteBest data={siteData} />
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};
export default Home;
