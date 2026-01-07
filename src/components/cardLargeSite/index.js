import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import stylesAlt from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

// Version minimaliste professionnelle
const CardLargeSite = ({ data, onPress }) => {
    return (
        <TouchableOpacity
            style={stylesAlt.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <ImageBackground
                source={{ uri: data.imageUri }}
                style={stylesAlt.imageBackground}
                imageStyle={stylesAlt.image}
            >
                {/* Gradient overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={stylesAlt.gradient}
                />

                {/* Content */}
                <View style={stylesAlt.content}>
                    {/* Rating */}
                    <View style={stylesAlt.ratingContainer}>
                        <Icon name="star" size={12} color="#FFD700" />
                        <Text style={stylesAlt.ratingText}>{data.rating}</Text>
                    </View>

                    {/* Main info */}
                    <View style={stylesAlt.mainInfo}>
                        <Text style={stylesAlt.title} numberOfLines={2}>
                            {data.title}
                        </Text>
                        <View style={stylesAlt.locationRow}>
                            <Icon name="map-marker" size={12} color="#FFFFFF" />
                            <Text style={stylesAlt.location} numberOfLines={1}>
                                {data.location}
                            </Text>
                        </View>
                    </View>

                    {/* Bottom bar */}
                    <View style={stylesAlt.bottomBar}>
                        <View style={stylesAlt.priceBox}>
                            <Text style={stylesAlt.priceLabel}>PRIX</Text>
                            <Text style={stylesAlt.price}>
                                ${data.price}<Text style={stylesAlt.perDay}>/jour</Text>
                            </Text>
                        </View>

                        <View style={stylesAlt.typeBox}>
                            <Text style={stylesAlt.type}>{data.type}</Text>
                        </View>
                    </View>
                </View>

                {/* Hover effect */}
                <View style={stylesAlt.hoverEffect} />
            </ImageBackground>
        </TouchableOpacity>
    );
};


export default CardLargeSite;