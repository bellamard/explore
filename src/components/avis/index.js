import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'; // 👈 Assurez-vous d'avoir ce package
import styles from './styleAvis'; // Importe les styles modernes

// Composant utilitaire pour afficher les étoiles (à inclure ou importer)
const RatingStars = ({ rating }) => {
  const filledStars = Math.round(rating);
  const starArray = [];
  const totalStars = 5;

  for (let i = 1; i <= totalStars; i++) {
    starArray.push(
      <Icon
        key={i}
        name="star"
        size={12}
        style={i <= filledStars ? styles.starFilled : styles.starEmpty}
      />,
    );
  }
  return <View style={styles.ratingContainer}>{starArray}</View>;
};

const CardAvis = data => {
  const authorName = data?.author || 'Utilisateur Anonyme';
  const contentText = data?.content || 'Aucun contenu d’avis.';
  const ratingValue = data?.rating || 4.0;
  const title = data?.title || 'Lieu visité';
  const avatarUri =
    data?.avatar || 'https://randomuser.me/api/portraits/thumb/men/1.jpg';
  const imageUri = data?.imageUrl || 'https://picsum.photos/400/250?random=1';
  const referenceText = data?.reference || '';

  return (
    <ImageBackground
      style={styles.card}
      source={{ uri: imageUri }}
      imageStyle={styles.imageStyle}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.gradientOverlay}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.topSection}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.ratingBadge}>
              <RatingStars rating={ratingValue} />
              <Text style={styles.ratingValueText}>
                {ratingValue.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.content} numberOfLines={6}>
            {contentText}
          </Text>

          <View style={styles.authorContainer}>
            <View style={styles.separator} />

            <View style={styles.authorInfoRow}>
              <Image style={styles.authorImage} source={{ uri: avatarUri }} />

              <View>
                {referenceText && (
                  <Text style={styles.authorLabel}>
                    À propos de : {referenceText}
                  </Text>
                )}
                <Text style={styles.author} numberOfLines={1}>
                  {authorName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default CardAvis;
