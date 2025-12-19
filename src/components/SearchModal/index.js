// components/SearchModal.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importation des styles
import { StylesLogement, Colors, Typography } from '../../styles/logement';

// Données de suggestions de recherche
const SEARCH_SUGGESTIONS = [
  { id: '1', type: 'ville', name: 'Paris', subtitle: 'France' },
  { id: '2', type: 'ville', name: 'Lyon', subtitle: 'France' },
  { id: '3', type: 'ville', name: 'Marseille', subtitle: 'France' },
  { id: '4', type: 'type', name: 'Appartement', subtitle: 'Type de logement' },
  { id: '5', type: 'type', name: 'Maison', subtitle: 'Type de logement' },
  { id: '6', type: 'type', name: 'Villa', subtitle: 'Type de logement' },
  { id: '7', type: 'type', name: 'Chambre', subtitle: 'Type de logement' },
  { id: '8', type: 'feature', name: 'Piscine', subtitle: 'Aménagement' },
  { id: '9', type: 'feature', name: 'Jardin', subtitle: 'Aménagement' },
  { id: '10', type: 'feature', name: 'Vue mer', subtitle: 'Aménagement' },
  { id: '11', type: 'feature', name: 'Centre ville', subtitle: 'Localisation' },
  { id: '12', type: 'feature', name: 'Proche plage', subtitle: 'Localisation' },
];

// Historique des recherches avec le bon format
const DEFAULT_SEARCH_HISTORY = [
  {
    id: 'h1',
    query: 'Paris appartement moderne',
    date: 'Hier',
    type: 'recent',
  },
  {
    id: 'h2',
    query: 'Villa avec piscine Marseille',
    date: 'Il y a 2 jours',
    type: 'recent',
  },
  {
    id: 'h3',
    query: 'Chambre centre ville Lyon',
    date: 'Il y a 3 jours',
    type: 'recent',
  },
];

const SearchModal = ({
  visible,
  onClose,
  onSearch,
  initialValue = '',
  recentSearches = DEFAULT_SEARCH_HISTORY,
}) => {
  const [searchText, setSearchText] = useState(initialValue);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('tous');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const inputRef = useRef(null);

  // Animation d'entrée
  useEffect(() => {
    if (visible) {
      setSearchText(initialValue);
      setActiveCategory('tous');

      // Réinitialiser les animations
      fadeAnim.setValue(0);
      slideAnim.setValue(300);

      // Démarrer les animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();

      // Focus sur l'input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    } else {
      setSearchText('');
      Keyboard.dismiss();
    }
  }, [visible, initialValue]);

  // Filtrer les suggestions
  useEffect(() => {
    if (searchText.trim() === '') {
      // Quand la recherche est vide
      switch (activeCategory) {
        case 'tous':
          setFilteredSuggestions(SEARCH_SUGGESTIONS.slice(0, 8));
          break;
        case 'recent':
          setFilteredSuggestions(recentSearches || []);
          break;
        default:
          setFilteredSuggestions(
            SEARCH_SUGGESTIONS.filter(item => item.type === activeCategory),
          );
      }
    } else {
      // Quand il y a du texte dans la recherche
      const allData = [...SEARCH_SUGGESTIONS];
      const filtered = allData.filter(
        item =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.subtitle &&
            item.subtitle.toLowerCase().includes(searchText.toLowerCase())),
      );
      setFilteredSuggestions(filtered);
    }
  }, [searchText, activeCategory, recentSearches]);

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    if (trimmedText) {
      onSearch(trimmedText);
      onClose();
    } else {
      onSearch('');
      onClose();
    }
  };

  const handleSuggestionPress = suggestion => {
    let searchTerm = '';

    if (suggestion.type === 'recent') {
      searchTerm = suggestion.query;
    } else {
      searchTerm = suggestion.name;
    }

    setSearchText(searchTerm);

    // Rechercher immédiatement
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onClose();
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  const handleClearHistory = () => {
    // Ici, vous pourriez appeler une fonction pour effacer l'historique du stockage
    console.log('Historique effacé');
  };

  const renderCategoryButton = (category, label, icon) => (
    <TouchableOpacity
      style={[
        StylesLogement.categoryButton,
        activeCategory === category && StylesLogement.categoryButtonActive,
      ]}
      onPress={() => setActiveCategory(category)}
      activeOpacity={0.7}
    >
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={activeCategory === category ? Colors.white : Colors.primary}
          style={StylesLogement.categoryIcon}
        />
      )}
      <Text
        style={[
          StylesLogement.categoryText,
          activeCategory === category && StylesLogement.categoryTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderSuggestionItem = ({ item }) => {
    const isRecent = item.type === 'recent';

    return (
      <TouchableOpacity
        style={StylesLogement.suggestionItem}
        onPress={() => handleSuggestionPress(item)}
        activeOpacity={0.6}
      >
        <View style={StylesLogement.suggestionIconContainer}>
          {isRecent ? (
            <Icon name="history" size={20} color={Colors.textLight} />
          ) : (
            <Icon
              name={
                item.type === 'ville'
                  ? 'location-on'
                  : item.type === 'type'
                  ? 'home'
                  : 'star'
              }
              size={20}
              color={Colors.primary}
            />
          )}
        </View>

        <View style={StylesLogement.suggestionContent}>
          <Text style={StylesLogement.suggestionTitle}>
            {isRecent ? item.query : item.name}
          </Text>
          <Text style={StylesLogement.suggestionSubtitle}>
            {isRecent ? item.date : item.subtitle}
          </Text>
        </View>

        <Icon
          name="chevron-right"
          size={20}
          color={Colors.textLight}
          style={StylesLogement.suggestionArrow}
        />
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={StylesLogement.emptySuggestionsContainer}>
      <Icon
        name="search-off"
        size={60}
        color={Colors.textLight}
        style={StylesLogement.emptyIcon}
      />
      <Text style={StylesLogement.emptyTitle}>Aucun résultat trouvé</Text>
      <Text style={StylesLogement.emptySubtitle}>
        Essayez d'autres termes de recherche
      </Text>
    </View>
  );

  if (!visible) return null;

  return (
    <Animated.View style={[StylesLogement.modalOverlay, { opacity: fadeAnim }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={StylesLogement.keyboardAvoidingView}
      >
        <Animated.View
          style={[
            StylesLogement.searchModalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={StylesLogement.searchModalHeader}>
            <Text style={StylesLogement.searchModalTitle}>
              Rechercher un logement
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={StylesLogement.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="close" size={24} color={Colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={StylesLogement.searchInputContainer}>
            <View style={StylesLogement.searchInputWrapper}>
              <Icon
                name="search"
                size={24}
                color={Colors.primary}
                style={StylesLogement.searchIcon}
              />

              <TextInput
                ref={inputRef}
                style={StylesLogement.searchTextInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Ville, type de logement, aménagement..."
                placeholderTextColor={Colors.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />

              {searchText ? (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={StylesLogement.clearButton}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Icon name="close" size={18} color={Colors.textLight} />
                </TouchableOpacity>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={handleSearch}
              style={StylesLogement.searchActionButton}
              activeOpacity={0.8}
            >
              <Text style={StylesLogement.searchActionText}>Rechercher</Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <View style={StylesLogement.categoriesContainer}>
            <View style={StylesLogement.categoriesScroll}>
              {renderCategoryButton('tous', 'Tout', 'apps')}
              {renderCategoryButton('ville', 'Villes', 'location-on')}
              {renderCategoryButton('type', 'Types', 'home')}
              {renderCategoryButton('feature', 'Aménagements', 'star')}
              {renderCategoryButton('recent', 'Récent', 'history')}
            </View>
          </View>

          {/* Suggestions List Header */}
          <View style={StylesLogement.suggestionsContainer}>
            <Text style={StylesLogement.suggestionsTitle}>
              {searchText
                ? 'Suggestions'
                : activeCategory === 'recent'
                ? 'Recherches récentes'
                : 'Populaires'}
            </Text>

            {activeCategory === 'recent' &&
              recentSearches &&
              recentSearches.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearHistory}
                  style={StylesLogement.clearHistoryButton}
                >
                  <Text style={StylesLogement.clearHistoryText}>Effacer</Text>
                </TouchableOpacity>
              )}
          </View>

          {/* Suggestions List */}
          <FlatList
            data={filteredSuggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={item => item.id}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={StylesLogement.suggestionsList}
            contentContainerStyle={StylesLogement.suggestionsListContent}
            ListEmptyComponent={renderEmptyState}
            ListFooterComponent={
              filteredSuggestions.length > 0 ? (
                <View style={StylesLogement.suggestionsFooter}>
                  <Text style={StylesLogement.suggestionsFooterText}>
                    {filteredSuggestions.length} résultat
                    {filteredSuggestions.length > 1 ? 's' : ''}
                  </Text>
                </View>
              ) : null
            }
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SearchModal;
