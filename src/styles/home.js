import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  headerContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { height: 4 },
  },

  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  categoryCard: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },

  line: {
    width: 50,
    height: 3,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    marginBottom: 15,
  },

  // Carousel
  carouselContent: {
    paddingHorizontal: 10,
  },

  bannerCard: {
    marginHorizontal: 10,
    width: width * 0.85,
  },
});
