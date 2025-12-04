import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesCardIem from './styleItem';

const CardItem = ({ item, onFavoritePress }) => {
  const defaultImage = 'https://picsum.photos/100/100?random=4';

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

          <Text style={stylesCardIem.priceText}>
            ${finalPrice}
            <Text style={stylesCardIem.priceSuffix}>/Person</Text>
          </Text>
        </View>
      </View>

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
