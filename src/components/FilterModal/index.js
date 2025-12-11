import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
// Assurez-vous que les styles importés sont ceux qui contiennent modalContainer, modalContent, etc.
import StylesLogement from './styles/logement';
import Icon from 'react-native-vector-icons/FontAwesome';

// Définition des options de Note/Qualité et de Type pour la modale
const RATING_OPTIONS = [5, 4, 3, 2, 1];
const TYPE_OPTIONS = ['Appartement', 'Maison', 'Villa', 'Chambre', 'Bateau']; // Récupérées des mocks

const FilterModalComponent = ({
  visible,
  onClose,
  initialFilters,
  onApplyFilters,
}) => {
  // 1. États internes pour la modale
  const [minPrice, setMinPrice] = useState(String(initialFilters.minPrice));
  const [maxPrice, setMaxPrice] = useState(String(initialFilters.maxPrice));
  const [minRating, setMinRating] = useState(initialFilters.minRating);
  const [selectedType, setSelectedType] = useState(initialFilters.typeFilter);

  // 2. Synchronisation de l'état interne avec les filtres initiaux à l'ouverture
  useEffect(() => {
    if (visible) {
      setMinPrice(String(initialFilters.minPrice));
      setMaxPrice(String(initialFilters.maxPrice));
      setMinRating(initialFilters.minRating);
      setSelectedType(initialFilters.typeFilter);
    }
  }, [visible, initialFilters]);

  // 3. Logique d'application des filtres
  const handleApply = () => {
    const filtersToApply = {
      minPrice: Number(minPrice) || 0, // Assurer un nombre
      maxPrice: Number(maxPrice) || 500, // Assurer un nombre
      minRating: minRating,
      typeFilter: selectedType,
    };
    onApplyFilters(filtersToApply);
    onClose();
  };

  // 4. Logique de réinitialisation
  const handleReset = () => {
    // Reset aux valeurs initiales (ou valeurs par défaut absolues)
    setMinPrice('0');
    setMaxPrice('500');
    setMinRating(0);
    setSelectedType(null);
  };

  // 5. Composant de rendu pour les étoiles de notation
  const RatingSelector = ({ value, label, onPress }) => (
    <TouchableOpacity
      style={[
        StylesLogement.ratingButton,
        value === minRating && StylesLogement.ratingButtonActive,
      ]}
      onPress={onPress}
    >
      <Icon
        name="star"
        size={16}
        color={value === minRating ? '#FFFFFF' : '#FFD700'}
      />
      <Text
        style={[
          StylesLogement.ratingText,
          value === minRating && StylesLogement.ratingTextActive,
        ]}
      >
        {` ${label}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={StylesLogement.modalContainer}>
        <View style={StylesLogement.modalContent}>
          <View style={StylesLogement.modalHeader}>
            <Text style={StylesLogement.modalTitle}>Filtres Avancés</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={StylesLogement.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* A. Filtre de Prix Min/Max */}
            <Text style={StylesLogement.filterLabel}>💰 Prix par Nuit (€)</Text>
            <View style={StylesLogement.priceInputContainer}>
              <TextInput
                style={StylesLogement.textInput}
                placeholder="Min (€)"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
                placeholderTextColor="#AAAAAA"
              />
              <View style={StylesLogement.priceSeparator} />
              <TextInput
                style={StylesLogement.textInput}
                placeholder="Max (€)"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
                placeholderTextColor="#AAAAAA"
              />
            </View>

            {/* B. Filtre de Qualité/Note Minimum */}
            <Text style={StylesLogement.filterLabel}>
              ⭐ Note Minimum (sur 5)
            </Text>
            <View style={StylesLogement.ratingContainer}>
              <TouchableOpacity
                style={[
                  StylesLogement.ratingButton,
                  minRating === 0 && StylesLogement.ratingButtonActive,
                ]}
                onPress={() => setMinRating(0)}
              >
                <Text
                  style={[
                    StylesLogement.ratingText,
                    minRating === 0 && StylesLogement.ratingTextActive,
                  ]}
                >
                  Toutes
                </Text>
              </TouchableOpacity>
              {RATING_OPTIONS.map(rating => (
                <RatingSelector
                  key={rating}
                  value={rating}
                  label={`${rating} et +`}
                  onPress={() => setMinRating(rating)}
                />
              ))}
            </View>

            {/* C. Filtre de Type de Logement (Redondant avec la FlatList, mais utile ici) */}
            <Text style={StylesLogement.filterLabel}>🏠 Type de Logement</Text>
            <View style={StylesLogement.typeModalContainer}>
              {TYPE_OPTIONS.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    StylesLogement.typeModalButton,
                    selectedType === type &&
                      StylesLogement.typeModalButtonActive,
                  ]}
                  onPress={() =>
                    setSelectedType(selectedType === type ? null : type)
                  }
                >
                  <Text
                    style={[
                      StylesLogement.typeModalText,
                      selectedType === type &&
                        StylesLogement.typeModalTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Boutons d'action en bas */}
          <View style={StylesLogement.modalActions}>
            <TouchableOpacity
              style={StylesLogement.closeButton}
              onPress={onClose}
            >
              <Text style={StylesLogement.closeButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={StylesLogement.applyButton}
              onPress={handleApply}
            >
              <Text style={StylesLogement.applyButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModalComponent;
