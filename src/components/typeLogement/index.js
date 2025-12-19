// components/TypeLogement.js
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Importation des styles depuis le fichier harmonisé
import { StylesLogement, Colors } from '../../styles/logement';

const TypeLogement = ({ isActive, typeName, icone, onPress }) => {
  const containerStyle = isActive
    ? StylesLogement.typeContainerActive
    : StylesLogement.typeContainerInactive;
  const textStyle = isActive
    ? StylesLogement.typeTextActive
    : StylesLogement.typeTextInactive;
  const iconColor = isActive ? Colors.white : Colors.textSecondary; // Utiliser la palette

  return (
    <TouchableOpacity
      onPress={onPress}
      style={StylesLogement.typeWrapper}
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
