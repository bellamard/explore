// components/SiteCard.js
import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Assurez-vous d'avoir ce module
import Icon from 'react-native-vector-icons/FontAwesome';

// Importation des styles depuis le fichier harmonisé
import { StylesLogement, Colors } from '../../styles/logement';
import stylesSiteCard from './styleSiteCard';
// ----------------------------------------------------------------------
// Composant utilitaire pour afficher les étoiles
// ----------------------------------------------------------------------
const RatingStars = ({ rating }) => {
  const filledStars = Math.round(rating);
  const totalStars = 5;
  const starArray = [];

  for (let i = 1; i <= totalStars; i++) {
    starArray.push(
      <Icon
        key={i}
        name="star"
        size={14}
        style={
          i <= filledStars
            ? StylesLogement.starFilled
            : StylesLogement.starEmpty
        }
      />,
    );
  }
  return <View style={StylesLogement.ratingStarsContainer}>{starArray}</View>;
};

// ----------------------------------------------------------------------
// Composant principal SiteCard
// ----------------------------------------------------------------------
const SiteCard = ({ data, onPress, onFavoritePress }) => {
  const {
    logementName = 'Logement de Rêve',
    typeLogement = 'Maison',
    Price = 'Contacter',
    period = '/nuit',
    ratingValue = 0,
    image,
    isFavorite = false,
    iconName = 'home',
  } = data || {};

  const imageUri =
    image || 'https://source.unsplash.com/random/800x600/?house,travel';

  return (
    <TouchableOpacity
      style={stylesSiteCard.containerCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ImageBackground
        source={{ uri: imageUri }}
        style={StylesLogement.cardsite}
        imageStyle={{ borderRadius: 16 }} // S'assurer que l'image suit les coins
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.85)']}
          locations={[0, 0.6, 1]}
          style={StylesLogement.gradient}
        >
          {/* A. Zone Supérieure (Note et Favoris) */}
          <View style={StylesLogement.topBox}>
            {/* Rating Badge */}
            <View style={StylesLogement.ratingBadge}>
              <RatingStars rating={ratingValue} />
              <Text style={StylesLogement.ratingText}>
                {ratingValue.toFixed(1)}
              </Text>
            </View>

            {/* Bouton Favoris */}
            <TouchableOpacity
              style={StylesLogement.favoriteButton}
              onPress={onFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                size={22}
                color={isFavorite ? Colors.error : Colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* B. Zone Inférieure (Titre et Détails) */}
          <View style={StylesLogement.bottomBox}>
            {/* Nom du Logement */}
            <Text
              style={StylesLogement.logementName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {logementName}
            </Text>

            <View style={stylesSiteCard.separatorLine} />

            {/* Type et Prix/Action */}
            <View style={stylesSiteCard.detailsRow}>
              {/* Type de Logement */}
              <View style={StylesLogement.typeContainer}>
                <Icon
                  name={iconName}
                  size={16}
                  color="#E0E0E0"
                  style={StylesLogement.typeIcon}
                />
                <Text style={stylesSiteCard.typeText}>{typeLogement}</Text>
              </View>

              {/* Prix et Période */}
              <View style={StylesLogement.priceWrapper}>
                <Text style={StylesLogement.priceText}>{Price}</Text>
                {Price !== 'Contacter' && (
                  <Text style={stylesSiteCard.pricePeriodText}>{period}</Text>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SiteCard;
