import { StyleSheet, Dimensions } from 'react-native';

const Colors = {
  primary: '#4F46E5',
  primaryLight: '#EEF2FF',
  white: '#FFFFFF',
  textDark: '#1E293B',
};

const StylesType = StyleSheet.create({
  wrapper: {
    marginRight: 10,
    paddingVertical: 5,
  },

  containerInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  iconInactive: {
    color: Colors.primary,
  },
  textInactive: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },

  containerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,

    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  iconActive: {
    color: Colors.white,
  },
  textActive: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default StylesType;
