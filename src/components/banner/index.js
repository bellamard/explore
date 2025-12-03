import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'; // Nécessite l'installation
import stylesBanner from './StylesBanner';

// Nécessite l'installation : npm install react-native-linear-gradient

// Utiliser une constante séparée pour les types
const EVENT_TYPES = {
  SITE: 'Public Site',
  CONCERT: 'Concert',
  SPECTACLE: 'Spectacle', // Correction orthographique
  EXCURSION: 'Excursion', // Correction orthographique
  AUTRE: 'Autre',
};

const getIconName = type => {
  switch (type) {
    case EVENT_TYPES.SITE:
      return 'university';
    case EVENT_TYPES.CONCERT:
      return 'music';
    case EVENT_TYPES.SPECTACLE:
      return 'magic'; // Icône plus visible pour spectacle
    case EVENT_TYPES.EXCURSION:
      return 'compass';
    case EVENT_TYPES.AUTRE:
      return 'ellipsis-h';
    default:
      return 'question-circle';
  }
};

const Banner = ({
  title,
  image,
  type,
  town,
  payment,
  onPress, // Action de pression
  style, // Prop pour le style du conteneur (utilisée pour le Carrousel)
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[stylesBanner.bannerWrapper, style]}
  >
    <ImageBackground
      source={{
        uri:
          image || 'https://source.unsplash.com/random/800x600/?nature,forest',
      }}
      style={stylesBanner.bannerImage}
      imageStyle={stylesBanner.imageStyle} // Appliquer borderRadius à l'image
    >
      {/* 1. Gradient Overlay (Assure la lisibilité du texte) */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
        style={stylesBanner.gradientOverlay}
      >
        <View style={stylesBanner.contentContainer}>
          {/* 2. Catégorie et icône en haut */}
          <View style={stylesBanner.categoryPill}>
            <Icon
              name={getIconName(type)}
              size={12}
              color="#FFFFFF"
              style={stylesBanner.Icon}
            />
            <Text style={stylesBanner.category}>{type}</Text>
          </View>

          {/* 3. Titre Principal */}
          <Text style={stylesBanner.Title} numberOfLines={2}>
            {title}
          </Text>

          {/* 4. Ligne séparatrice et Infos du bas */}
          <View style={stylesBanner.line} />

          <View style={stylesBanner.infoContainer}>
            {/* Lieu */}
            <View style={stylesBanner.infoBox}>
              <Icon name="map-marker" size={14} style={stylesBanner.infoIcon} />
              <Text style={stylesBanner.infoText} numberOfLines={1}>
                {town || 'Non spécifié'}
              </Text>
            </View>

            {/* Paiement */}
            <View style={stylesBanner.infoBox}>
              <Icon name="dollar" size={14} style={stylesBanner.infoIcon} />
              <Text style={stylesBanner.infoText}>{payment || 'Gratuit'}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

export default Banner;
