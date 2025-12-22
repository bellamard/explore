import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d4150',
    textTransform: 'capitalize',
  },
  yearText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#00adf5',
    marginLeft: 5,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#FF5733',
  },
});

export default styles;
