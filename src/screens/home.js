import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Styles from '../styles/home';
import Headers from '../components/header';

const Home = () => {
  return (
    <View>
      <Headers
        userData={{
          name: 'Jean Dupont',
          avatarUrl: 'https://example.com/avatar.jpg',
        }}
        onMenuPress={() => console.log('Menu Pressed')}
        onSearchPress={() => console.log('Search Pressed')}
        onNotificationPress={() => console.log('Notification Pressed')}
      />
      <View style={{ padding: 20 }}>
        <Text>Contenu de l'écran d'accueil</Text>
      </View>
    </View>
  );
};

export default Home;
