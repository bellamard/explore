import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types'; // Optionnel mais recommandé pour les validations
import stylesSiteCard from './styleSiteCard';

// ----------------------------------------------------------------------
// Composant utilitaire pour afficher les étoiles
// ----------------------------------------------------------------------
const RatingStars = ({ rating }) => {
  const filledStars = Math.round(rating);
  const starArray = [];
  const totalStars = 5;

  for (let i = 1; i <= totalStars; i++) {
    starArray.push(
      <Icon
        key={i}
        name="star"
        size={14} // Légèrement agrandi pour plus de visibilité
        style={
          i <= filledStars
            ? stylesSiteCard.starFilled // Couleur principale
            : stylesSiteCard.starEmpty // Couleur de fond (gris clair/blanc transparent)
        }
      />,
    );
  }
  return <View style={stylesSiteCard.ratingStarsContainer}>{starArray}</View>;
};

// ----------------------------------------------------------------------
// Composant principal SiteCard
// ----------------------------------------------------------------------
const SiteCard = ({ data }) => {
  // Déstructuration avec des fallbacks (plus propre)
  const {
    logementName = 'Logement de Rêve',
    typeLogement = 'Maison',
    Price = 'Contacter',
    period = '/nuit',
    ratingValue = 0,
    image,
    onPress,
    onFavoritePress,
    isFavorite = false,
    iconName = 'home', // 'home' par défaut
  } = data || {};

  const imageUri =
    image || 'https://source.unsplash.com/random/800x600/?house,travel';

  return (
    <TouchableOpacity
      style={stylesSiteCard.containerCard}
      onPress={onPress}
      activeOpacity={0.7} // Rendre l'effet de pression plus prononcé
    >
      <ImageBackground
        source={{ uri: imageUri }}
        style={stylesSiteCard.cardsite}
        imageStyle={stylesSiteCard.ImageBackground}
      >
        {/* 1. Gradient Overlay (Assombrir le bas pour le texte) */}
        <LinearGradient
          // La transition commence plus haut pour ne pas cacher les étoiles et le badge
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.85)']}
          locations={[0, 0.6, 1]} // Contrôler la position des couleurs
          style={stylesSiteCard.gradient}
        >
          {/* A. Zone Supérieure (Note et Favoris) */}
          <View style={stylesSiteCard.topBox}>
            {/* Rating Badge (En Haut à Gauche) - Design plus proéminent */}
            <View style={stylesSiteCard.ratingBadge}>
              <RatingStars rating={ratingValue} />
              <Text style={stylesSiteCard.ratingText}>
                {ratingValue.toFixed(1)}
              </Text>
            </View>

            {/* Bouton Favoris (En Haut à Droite) - Avec un fond semi-transparent */}
            <TouchableOpacity
              style={stylesSiteCard.favoriteButton}
              onPress={onFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Augmenter la zone de clic
            >
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                size={22} // Agrandir l'icône
                color={isFavorite ? '#FF4500' : '#FFFFFF'}
              />
            </TouchableOpacity>
          </View>

          {/* B. Zone Inférieure (Titre et Détails) */}
          <View style={stylesSiteCard.bottomBox}>
            {/* Nom du Logement - Police plus grande, plus audacieuse */}
            <Text
              style={stylesSiteCard.logementName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {logementName}
            </Text>

            <View style={stylesSiteCard.separatorLine} />

            {/* Type et Prix/Action */}
            <View style={stylesSiteCard.detailsRow}>
              {/* Type de Logement (Mise en avant discrète) */}
              <View style={stylesSiteCard.typeContainer}>
                <Icon
                  name={iconName}
                  size={16}
                  color="#E0E0E0" // Couleur blanc cassé
                  style={stylesSiteCard.typeIcon}
                />
                <Text style={stylesSiteCard.typeText}>{typeLogement}</Text>
              </View>

              {/* Prix et Période (Mise en avant claire) */}
              <View style={stylesSiteCard.priceWrapper}>
                <Text style={stylesSiteCard.priceText}>{Price}</Text>
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
