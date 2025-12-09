import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StylesHeaderLogement from './StyleHeaderLogement';

const HeaderLogement = ({
  userName,
  onNotificationPress,
  onFilterPress,
  onSearchPress,
}) => (
  <SafeAreaView style={StylesHeaderLogement.safeArea}>
    <View style={StylesHeaderLogement.container}>
      <View style={StylesHeaderLogement.topRow}>
        <View>
          <Text style={StylesHeaderLogement.greetingText}>
            Bonjour, {userName || 'Voyageur'}!
          </Text>
          <Text style={StylesHeaderLogement.mainTitle}>
            Où souhaitez-vous aller ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={onNotificationPress}
          style={StylesHeaderLogement.notificationButton}
        >
          <Icon name="notifications" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={StylesHeaderLogement.searchContainer}
        onPress={onSearchPress}
        activeOpacity={0.8}
      >
        <View style={StylesHeaderLogement.searchInputWrapper}>
          <Icon
            name="search"
            size={24}
            color="#666"
            style={StylesHeaderLogement.searchIcon}
          />

          <Text style={StylesHeaderLogement.searchPlaceholder}>
            Découvrez des lieux, villes...
          </Text>
        </View>

        <View style={StylesHeaderLogement.separator} />

        <TouchableOpacity
          onPress={onFilterPress}
          style={StylesHeaderLogement.filterButton}
        >
          <Icon name="tune" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default HeaderLogement;
