import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const calendarTheme = {
  selectedDayBackgroundColor: '#00adf5',
  dotColor: '#00adf5',
  todayTextColor: '#00adf5',
  arrowColor: '#00adf5',
};
const styles = StyleSheet.create({
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a',
    padding: 10,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row',
  },
  itemHour: {
    color: '#181c26',
    fontWeight: 'bold',
    width: 60,
  },
  itemTitle: {
    color: '#181c26',
    fontSize: 16,
    fontWeight: '600',
  },
  itemDuration: {
    color: '#79838a',
    fontSize: 12,
    marginTop: 4,
  },
  container: { flex: 1, paddingBottom: 120 },
  itemImage: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
});

export default styles;
