import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; // Largeur du carrousel

const Colors = {
  white: '#FFFFFF',
  accent: '#FFC107', // Jaune pour les étoiles
  textSecondary: '#E0E0E0',
};

const StylesAvis = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.65, // Augmenté légèrement la hauteur
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',

    // Ajout d'une ombre douce pour l'effet "flottant"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  imageStyle: {
    borderRadius: 15, // Important pour l'arrondi de l'image
  },

  // --- Overlay et Contenu ---
  gradientOverlay: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // --- 1. Top Section (Titre & Note) ---
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    flex: 1, // Pour gérer le débordement
    marginRight: 10,
    // Ombre de texte pour la lisibilité sur l'image
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Badge semi-transparent
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  starFilled: {
    color: Colors.accent,
    marginRight: 1,
  },
  starEmpty: {
    color: Colors.textSecondary,
    marginRight: 1,
  },
  ratingValueText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- 2. Contenu de l'Avis ---
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    flexShrink: 1, // Permet au texte de se compresser
  },

  // --- 3. Auteur ---
  authorContainer: {
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 10,
  },
  authorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.accent, // Bordure d'accent sur l'avatar
  },
  authorLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default StylesAvis;
