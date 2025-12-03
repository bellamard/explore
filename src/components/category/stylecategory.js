import Styles, { colors } from '../../styles';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const stylesCategory = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: width * 0.4,
    backgroundColor: colors.background,
    borderRadius: 40,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 6,
    marginVertical: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },

  // Style appliqué lorsque la carte est sélectionnée (Feedback visuel clé)
  cardSelected: {
    backgroundColor: colors.primary,
    // Ombre plus prononcée avec la couleur principale
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  iconWrapper: {
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },

  // Style du texte du titre lorsqu'il est sélectionné
  titleSelected: {
    color: '#FFFFFF', // Texte blanc sur fond violet
    fontWeight: '700',
  },

  // --- Badge de Compteur (countBadge) ---
  countBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#EF4444', // Rouge vif
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default stylesCategory;
