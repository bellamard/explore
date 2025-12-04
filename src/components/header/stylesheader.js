// Fichier : stylesheader.js
import { StyleSheet } from 'react-native';

const StylesHeader = StyleSheet.create({
  mainContainer: {
    paddingTop: 10, // Espace pour la barre de statut (ajuster si nécessaire)
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Fond blanc propre
    borderBottomWidth: 0,
    // Optionnel: Ombre douce pour l'effet "flottant"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },

  // --- 1. Top Row (Menu, Actions, Profil) ---
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  // Bouton Menu (à gauche)
  menuButton: {
    padding: 5,
  },

  // Bloc des icônes d'action (à droite)
  actionBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 20, // Espacement entre les icônes
  },

  // Image de l'utilisateur
  iconUser: {
    width: 40,
    height: 40,
    borderRadius: 20, // Pour la rendre circulaire
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#007AFF', // Bordure d'accentuation
  },

  // --- 2. Welcome Block ---
  welcomeBlock: {
    marginBottom: 15, // Espace sous le texte
  },
  greetingText: {
    fontSize: 16,
    color: '#6C757D', // Couleur de texte secondaire
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 24,
    color: '#333333',
    fontWeight: 'bold',
  },

  // Optionnel : style pour le badge de notification
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default StylesHeader;
