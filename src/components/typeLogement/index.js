import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StylesType from './StyleType';

const TypeLogement = ({ isActive, typeName, icone, onPress }) => {
  const containerStyle = isActive
    ? StylesType.containerActive
    : StylesType.containerInactive;
  const textStyle = isActive ? StylesType.textActive : StylesType.textInactive;
  const iconColor = isActive
    ? StylesType.iconActive.color
    : StylesType.iconInactive.color;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={StylesType.wrapper}
      activeOpacity={0.7}
    >
      <View style={containerStyle}>
        <Icon name={icone || 'home'} size={20} color={iconColor} />
        <Text style={textStyle}>{typeName || 'Type'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TypeLogement;
