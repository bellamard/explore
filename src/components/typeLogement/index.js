import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StylesType from './StyleType';

const TypeLogement = ({ isActive, typeName, icone }) => (
  <View style={isActive ? StylesType.container : StylesType.containerBG}>
    <View>
      <Icon name={icone} size={32} color={isActive ? '#FFFFFF' : '#4F46E5'} />
      <Text>{typeName || 'type inconnu'}</Text>
    </View>
  </View>
);

export default TypeLogement;
