// components/HeaderLogement.js
import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importation des styles depuis le fichier harmonisé
import { StylesLogement, Colors } from '../../styles/logement';

const HeaderLogement = ({
  userName,
  onNotificationPress,
  onFilterPress,
  onSearchPress,
  searchQuery, // Ajouté pour afficher la recherche actuelle (si l'on utilisait un TextInput)
}) => (
  <SafeAreaView style={StylesLogement.safeArea}>
    <View style={StylesLogement.headerContainer}>
      {/* --- 1. Top Row: Titre et Notifications --- */}
      <View style={StylesLogement.topRow}>
        <View>
          <Text style={StylesLogement.greetingText}>
            Bonjour, {userName || 'Voyageur'}!
          </Text>
          <Text style={StylesLogement.mainTitle}>
            Où souhaitez-vous aller ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={onNotificationPress}
          style={StylesLogement.notificationButton}
        >
          <Icon name="notifications" size={26} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* --- 2. Floating Search Bar/Filter Trigger --- */}
      <TouchableOpacity
        onPress={onSearchPress}
        style={StylesLogement.searchContainer}
        activeOpacity={0.8}
      >
        <View style={StylesLogement.searchInputWrapper}>
          <Icon
            name="search"
            size={24}
            color={Colors.primary}
            style={StylesLogement.searchIcon}
          />

          <Text>{searchQuery || 'Découvrez des lieux, villes...'}</Text>
        </View>

        <View style={StylesLogement.separator} />

        <TouchableOpacity
          onPress={onFilterPress}
          style={StylesLogement.filterButton}
        >
          <Icon name="tune" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default HeaderLogement;
