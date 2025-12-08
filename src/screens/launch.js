import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Text, View, ImageBackground, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import storage from '../services/storage';

const logo = require('../assets/rdc_logo.png');

const Launch = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const bg = require('../assets/bg.jpg');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const startAnimations = useCallback(() => {
    // Animation du logo (Échelle et Opacité en parallèle)
    const logoAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500, // Durée du fondu
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200, // Durée du grossissement
        easing: Easing.out(Easing.back(1.5)), // Effet rebond léger
        useNativeDriver: true,
      }),
    ]);

    // Animation du titre (Fondu) après le logo
    const titleAnimation = Animated.timing(titleFadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    // Séquence d'animations : Logo puis Titre
    Animated.sequence([
      logoAnimation,
      Animated.delay(200), // Petit délai avant le titre
      titleAnimation,
    ]).start();
  }, [fadeAnim, scaleAnim, titleFadeAnim]);

  const fetchData = useCallback(async () => {
    try {
      startAnimations();
      const userData = await storage.getItem('userToken');
      setUserToken(userData);
    } catch (error) {
      console.warn('Erreur lors de la récupération des données :', error);
    } finally {
      setLoading(false);
    }
  }, [startAnimations]);

  const init = useCallback(async () => {
    try {
      await fetchData();
      await new Promise(resolve => setTimeout(resolve, 6000));
    } catch (error) {
      console.warn(error);
    } finally {
      userToken === null
        ? navigation.navigate('Dash')
        : navigation.navigate('Login');
    }
  }, [navigation, userToken, fetchData]);

  useEffect(() => {
    init();
  }, [init]);

  const animatedLogoStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  const animatedTitleStyle = {
    opacity: titleFadeAnim,
  };
  return (
    <View style={[Styles.container]}>
      <ImageBackground source={bg} resizeMode="cover" style={[Styles.bgImage]}>
        <View>
          <Animated.Image
            source={logo}
            style={[Styles.logo, animatedLogoStyle]}
          />
          <Animated.Text style={[Styles.title, animatedTitleStyle]}>
            Explore RDC
          </Animated.Text>
        </View>
        <View style={Styles.bottomContainer}>
          <Text style={Styles.bottomTitle}>Version 1.0.0</Text>
          <Text style={Styles.bottomTitle}>Powered by b2la</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Launch;
