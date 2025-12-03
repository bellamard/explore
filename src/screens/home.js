import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Styles from '../styles/home';
import Headers from '../components/header';
import CategoryCard from '../components/category';

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

const banner = () => {
  return (
    <View>
      <Text>Banner Section</Text>
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
      <View style={Styles.container}>
        {categories(categoriesItem)}
        <View>
          <Text style={Styles.welcomeText}>Actu</Text>
          {banner()}
        </View>
      </View>
    </View>
  );
};

export default Home;
