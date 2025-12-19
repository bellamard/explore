import { StyleSheet, Dimensions } from 'react-native';
const styleFilterModal = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resetText: {
    color: '#FF4500',
    fontSize: 14,
    fontWeight: '600',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },

  // Inputs de Prix
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    color: '#333',
  },
  priceSeparator: {
    width: 15,
    height: 1,
    backgroundColor: '#AAAAAA',
    marginHorizontal: 10,
  },

  // Filtres de Note/Qualité
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#EEE',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  ratingButtonActive: {
    backgroundColor: '#FFD700', // Jaune rempli si actif
    borderColor: '#FFD700',
  },
  ratingText: {
    marginLeft: 5,
    color: '#333',
    fontWeight: '600',
  },
  ratingTextActive: {
    color: '#FFFFFF',
  },

  // Filtres de Type (dans la modale)
  typeModalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeModalButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  typeModalButtonActive: {
    backgroundColor: '#4F46E5', // Couleur principale si actif
  },
  typeModalText: {
    color: '#333',
    fontWeight: '500',
  },
  typeModalTextActive: {
    color: '#FFFFFF',
  },

  // Actions de la modale
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopColor: '#EEE',
    borderTopWidth: 1,
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styleFilterModal;
