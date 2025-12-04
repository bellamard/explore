import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import StylesCard from './StylesCard';

const CardSiteItem = ({ siteData, onPress }) => {
  const title = siteData?.name || 'Site Inconnu';
  const imageUri = siteData?.image || 'https://picsum.photos/200/300?random=2';
  const rating = siteData?.rating?.toFixed(1) || 'N/A';
  const town = siteData?.address?.town || 'Ville non spécifiée';
  const type = siteData?.type || 'Lieu';

  return (
    <TouchableOpacity
      style={StylesCard.container}
      onPress={onPress || siteData?.onPress}
      activeOpacity={0.8}
    >
      <ImageBackground
        style={StylesCard.card}
        source={{ uri: imageUri }}
        imageStyle={StylesCard.imageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          style={StylesCard.gradientOverlay}
        >
          <View style={StylesCard.rate}>
            <Icon name="star" size={12} style={StylesCard.icon} />
            <Text style={StylesCard.rateText}>{rating}</Text>
          </View>

          <View style={StylesCard.contentContainer}>
            <Text style={StylesCard.title} numberOfLines={2}>
              {title}
            </Text>

            <View style={StylesCard.location}>
              <Icon
                name="map-marker"
                size={14}
                style={StylesCard.locationIcon}
              />
              <Text style={StylesCard.locationText} numberOfLines={1}>
                {town}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CardSiteItem;
