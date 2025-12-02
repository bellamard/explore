import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StylesHeader from './stylesheader';

const Header = ({
  userData,
  onMenuPress,
  onSearchPress,
  onNotificationPress,
  navigation,
}) => {
  const defaultAvatar = 'https://via.placeholder.com/150?text=Avatar';
  const avatarUri = userData?.avatarUrl || defaultAvatar;

  return (
    <View style={StylesHeader.mainContainer}>
      <View style={StylesHeader.topRow}>
        <TouchableOpacity onPress={onMenuPress} style={StylesHeader.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>

        <View style={StylesHeader.actionBlock}>
          <TouchableOpacity
            onPress={onSearchPress}
            style={StylesHeader.actionButton}
          >
            <Icon name="search" size={24} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNotificationPress}
            style={StylesHeader.actionButton}
          >
            {/* Optionnel: Indicateur de notification (badge) */}
            <Icon name="notifications" size={24} color="#555" />
          </TouchableOpacity>

          {/* Image Profil/Avatar */}
          <TouchableOpacity
            onPress={() => Alert.alert('Profil', 'Afficher les détails')}
          >
            <Image
              source={{ uri: avatarUri }}
              style={StylesHeader.iconUser}
              // Gestion d'erreur au chargement de l'image (si l'URL est mauvaise)
              onError={() => console.warn("Erreur de chargement d'avatar")}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. SECTION D'ACCUEIL : Texte de Bienvenue */}
      <View style={StylesHeader.welcomeBlock}>
        <Text style={StylesHeader.greetingText}>Bienvenue,</Text>
        <Text style={StylesHeader.userNameText}>
          {userData?.name || 'Utilisateur'}
        </Text>
      </View>
    </View>
  );
};

export default Header;
