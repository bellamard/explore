// Fichier : styleItem.js

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const stylesCardIem = StyleSheet.create({
  cardContainer: {
    width: width * 0.95, // Prend presque toute la largeur
    flexDirection: 'row', // IMPORTANT : pour aligner l'image et le texte horizontalement
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginVertical: 8,

    // Ombre douce et peu élevée (style Dribbble)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  // --- 1. Image ---
  imageWrapper: {
    borderRadius: 10, // Bords arrondis pour l'image
    overflow: 'hidden', // Nécessaire pour l'arrondi
    width: 80, // Taille de l'image
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // --- 2. Détails (Centre) ---
  detailsBlock: {
    flex: 1, // Prend l'espace restant au centre
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    height: 80, // Correspond à la hauteur de l'image
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },

  // Localisation
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#888',
  },

  // Bottom Row (Note et Prix)
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  // Note
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 5,
  },

  // Prix
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3295A8', // Couleur turquoise/bleu pour le prix
  },
  priceSuffix: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#888',
  },

  // --- 3. Favoris ---
  favoriteButton: {
    padding: 10,

    alignSelf: 'flex-start',
  },
});

export default stylesCardIem;
