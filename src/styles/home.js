import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const stylesHome = StyleSheet.create({
  categoryCard: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  // --- Styles du Carrousel (BannersCarousel) ---
  carouselContainer: {
    paddingVertical: 10,
  },
  carouselContent: {
    // Ajouter un padding pour que le premier et le dernier élément ne soient pas collés au bord
    paddingHorizontal: 10,
  },

  // Conteneur du Banner pour le FlatList
  bannerCard: {
    marginHorizontal: 10, // Utiliser la même marge que StylesBanner.js
  },

  // --- Pagination Dots ---
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#4F46E5', // Couleur principale
    marginHorizontal: 4,
  },
  // Le style actif est géré par l'animation (dotWidth et dotOpacity)
  /*
    dotActive: {
        width: 16,
        opacity: 1,
    }
    */
});
export default stylesHome;
