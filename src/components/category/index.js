import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesCategory from './stylecategory';

const CategoryCard = ({ title, iconName, count, onPress, isSelected }) => (
  <TouchableOpacity
    accessibilityLabel={title}
    accessibilityRole="button"
    style={[
      stylesCategory.cardContainer,
      isSelected && stylesCategory.cardSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={stylesCategory.iconWrapper}>
      <Icon
        name={iconName || 'question-circle'}
        size={32}
        color={isSelected ? '#FFFFFF' : '#4F46E5'}
      />
    </View>

    {count !== undefined && (
      <View style={stylesCategory.countBadge}>
        <Text style={stylesCategory.countText}>{count}</Text>
      </View>
    )}

    <Text
      style={[stylesCategory.title, isSelected && stylesCategory.titleSelected]}
      numberOfLines={1}
    >
      {title || 'Catégorie Inconnue'}
    </Text>
  </TouchableOpacity>
);

export default CategoryCard;
