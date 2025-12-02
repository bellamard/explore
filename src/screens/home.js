import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Styles from '../styles/home';
import Headers from '../components/header';

const activites = () => {
  return (
    <View>
      <Text>Activités</Text>
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
        <Text style={Styles.welcomeText}>Bienvenue sur la page d'accueil!</Text>
        {activites()}
      </View>
    </View>
  );
};

export default Home;
