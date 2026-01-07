import styles from './style';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const CardProv = ({ data, onPress }) => {
    const placeholderImage = require('../../assets/placeholder.jpg');
    const imageSource = data.urlImage ? { uri: data.urlImage } : placeholderImage;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image
                source={imageSource}
                style={styles.image}
                defaultSource={placeholderImage}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            />
            <View style={styles.content}>
                <Text style={styles.provinceName} numberOfLines={1}>
                    {data.name}
                </Text>
                {data.count && (
                    <Text style={styles.siteCount}>
                        {data.count} sites
                    </Text>
                )}
            </View>
            <View style={styles.overlay} />
        </TouchableOpacity>
    );
};


export default CardProv;
