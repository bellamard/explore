import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; // Pour afficher deux cartes par ligne avec marge

const Colors = {
  primary: '#4F46E5', // Bleu Vif
  white: '#FFFFFF',
  textDark: '#333333',
  star: '#FFC107', // Jaune pour l'étoile
};

const StylesCard = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3, // Format portrait pour une carte de site
    marginHorizontal: 8,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',

    // Ombre douce
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12, // Appliquer l'arrondi ici aussi
  },

  // --- Gradient Overlay (Superposition) ---
  gradientOverlay: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between', // Espacer la note et le contenu
  },

  // --- Note (En Haut à Droite) ---
  rate: {
    flexDirection: 'row',
    alignSelf: 'flex-end', // Aligner à droite
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  icon: {
    color: Colors.star, // L'étoile doit être jaune
    marginRight: 4,
    marginTop: 1, // Ajustement visuel
  },
  rateText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- Contenu du bas ---
  contentContainer: {
    // Aligné automatiquement en bas grâce à justify-content: 'space-between' du gradient
  },

  // Badge de Type
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 5,
  },
  typeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  // Titre
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // Lieu
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    color: Colors.white,
    marginRight: 5,
  },
  locationText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default StylesCard;
