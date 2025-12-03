import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const stylesHome = StyleSheet.create({
  categoryCard: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },

  carouselContainer: {
    paddingVertical: 10,
  },
  carouselContent: {
    paddingHorizontal: 10,
  },

  bannerCard: {
    marginHorizontal: 10,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#4F46E5',
    marginHorizontal: 4,
  },
});
export default stylesHome;
