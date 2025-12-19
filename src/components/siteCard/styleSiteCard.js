import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; // 82% de la largeur de l'écran
const CARD_HEIGHT = CARD_WIDTH * 0.7; // Ratio 4:5 ou 3:4

const stylesSiteCard = StyleSheet.create({
  // --- Conteneur Général ---
  containerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    marginHorizontal: width * 0.03,
    borderRadius: 16, // Coins arrondis marqués
    elevation: 8, // Ombre (Android)
    shadowColor: '#000', // Ombre (iOS)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    overflow: 'hidden', // Très important pour les coins
  },

  // --- Image et Gradient ---
  cardsite: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  ImageBackground: {
    borderRadius: 16, // Doit correspondre au containerCard
  },
  gradient: {
    flex: 1,
    padding: 15, // Marge intérieure pour le contenu
    justifyContent: 'space-between', // Aligner le topBox en haut et le bottomBox en bas
  },

  // --- Zone Supérieure (TopBox) ---
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond blanc semi-transparent
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  starFilled: {
    color: '#FFD700', // Jaune or
    marginHorizontal: 1,
  },
  starEmpty: {
    color: '#D3D3D3', // Gris clair pour le fond des étoiles
    marginHorizontal: 1,
  },
  ratingText: {
    color: '#333333', // Texte sombre pour un bon contraste sur le blanc
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fond sombre transparent pour l'icône
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // --- Zone Inférieure (BottomBox) ---
  bottomBox: {
    // Aligné automatiquement en bas par `justifyContent: 'space-between'` du gradient
  },
  logementName: {
    color: '#FFFFFF',
    fontSize: 22, // Grande police pour le titre
    fontWeight: '900', // Très gras pour l'impact
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ombre portée pour le contraste
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  separatorLine: {
    height: 2,
    width: '20%', // Petite ligne de séparation stylisée
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
    marginVertical: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // --- Type de Logement ---
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    marginRight: 5,
  },
  typeText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '400',
  },

  // --- Prix ---
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 18, // Police moyenne pour le prix
    fontWeight: '700', // Gras
  },
  pricePeriodText: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 3,
    marginBottom: 1, // Aligner le bas avec le texte du prix
  },
});

export default stylesSiteCard;
