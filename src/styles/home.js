import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const stylesHome = StyleSheet.create({
  categoryCard: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
export default stylesHome;
