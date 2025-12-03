import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
// Nous allons utiliser FontAwesome pour le marqueur, l'étoile et le cœur.
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesCardIem from './styleItem';
// Assurez-vous que les couleurs sont bien définies dans vos styles globaux
// Ex: const colors = { primary: '#4F46E5', accent: '#FFC107', price: '#3295A8' }

// Note: Nous simplifions les props pour ce format, en utilisant principalement `item`.
const CardItem = ({ item, onFavoritePress }) => {
  // Fallbacks
  const defaultImage = 'https://picsum.photos/100/100?random=4';

  // Utiliser les props qui correspondent à l'image fournie
  const finalTitle = item?.title || 'Destination';
  const finalLocation = item?.location || 'Lieu non spécifié';
  const finalRating = item?.rating || 'N/A';
  const finalPrice = item?.price || '??';
  const finalImage = item?.image || defaultImage;

  return (
    <TouchableOpacity
      style={stylesCardIem.cardContainer}
      onPress={item?.onPress}
      activeOpacity={0.8}
    >
      <View style={stylesCardIem.imageWrapper}>
        <Image source={{ uri: finalImage }} style={stylesCardIem.image} />
      </View>

      <View style={stylesCardIem.detailsBlock}>
        <Text style={stylesCardIem.title} numberOfLines={1}>
          {finalTitle}
        </Text>
        <View style={stylesCardIem.locationRow}>
          <Icon
            name="map-marker"
            size={12}
            color="#EF4444"
            style={stylesCardIem.locationIcon}
          />
          <Text style={stylesCardIem.locationText} numberOfLines={1}>
            {finalLocation}
          </Text>
        </View>
        <View style={stylesCardIem.bottomRow}>
          {/* Note */}
          <View style={stylesCardIem.ratingRow}>
            <Icon name="star" size={14} color="#FFC107" />
            <Text style={stylesCardIem.ratingText}>{finalRating}</Text>
          </View>

          {/* Prix (à droite) */}
          <Text style={stylesCardIem.priceText}>
            ${finalPrice}
            <Text style={stylesCardIem.priceSuffix}>/Person</Text>
          </Text>
        </View>
      </View>

      {/* 3. BOUTON FAVORIS (Côté Droit) */}
      <TouchableOpacity
        style={stylesCardIem.favoriteButton}
        onPress={onFavoritePress}
      >
        {/* L'icône est un cœur non rempli, typique du design */}
        <Icon name="heart-o" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardItem;
