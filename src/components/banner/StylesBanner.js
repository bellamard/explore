// Fichier : StylesBanner.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width * 0.85; // Le carrousel affichera 85% de la largeur de l'écran

const stylesBanner = StyleSheet.create({
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_WIDTH * 0.6, // Ratio 16:10 pour la hauteur
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden', // Important pour l'ImageBackground

    // Ombre pour l'effet flottant
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15, // Appliquer le même arrondi à l'image
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  contentContainer: {
    // Contenu du bas
  },

  // Pillule de Catégorie
  categoryPill: {
    flexDirection: 'row',
    alignSelf: 'flex-start', // Important pour que la pillule ne prenne pas toute la largeur
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  category: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  Icon: {
    marginTop: 2, // Ajustement visuel
  },

  Title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  line: {
    height: 2,
    width: 40,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%', // Pour gérer les longs noms de ville
  },
  infoIcon: {
    color: '#FFFFFF',
    marginRight: 5,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default stylesBanner;
