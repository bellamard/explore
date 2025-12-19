// components/FilterModal.js (Nouveau fichier)
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider'; // Nécessite l'installation
import { StylesLogement, Colors } from '../../styles/logement';

const RatingSelector = ({ minRating, onSelect }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={StylesLogement.ratingSelectorContainer}>
      <Text style={StylesLogement.filterLabel}>
        Note Minimum: {minRating.toFixed(1)} Étoiles
      </Text>
      <View style={StylesLogement.starRow}>
        {stars.map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => onSelect(star)}
            style={StylesLogement.starButton}
          >
            <Icon
              name="star"
              size={30}
              color={star <= minRating ? Colors.star : Colors.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const FilterModal = ({ visible, onClose, initialFilters, onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState(initialFilters);

  useEffect(() => {
    // Synchroniser les filtres lorsque la modale s'ouvre
    setTempFilters(initialFilters);
  }, [visible, initialFilters]);

  const handlePriceChange = (min, max) => {
    setTempFilters(prev => ({
      ...prev,
      minPrice: Math.round(min),
      maxPrice: Math.round(max),
    }));
  };

  const handleRatingChange = rating => {
    setTempFilters(prev => ({ ...prev, minRating: rating }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    setTempFilters({ minPrice: 0, maxPrice: 500, minRating: 0 });
  };

  // Ajout d'une logique simple pour la sélection de type (si vous le souhaitez dans la modale)
  // Non implémenté ici pour se concentrer sur les sliders/ratings.

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
              <Text style={StylesLogement.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flexGrow: 1 }}>
            {/* --- 1. Filtre de Prix --- */}
            <View style={StylesLogement.filterGroup}>
              <Text style={StylesLogement.filterLabel}>
                Budget: {tempFilters.minPrice}€ à {tempFilters.maxPrice}€
              </Text>
              <Slider
                style={StylesLogement.slider}
                minimumValue={0}
                maximumValue={500}
                step={10}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.backgroundLight}
                thumbTintColor={Colors.primary}
                value={tempFilters.maxPrice} // Utiliser un RangeSlider pour un vrai contrôle min/max
                onValueChange={value =>
                  handlePriceChange(tempFilters.minPrice, value)
                }
              />
              {/* NOTE: Un RangeSlider est préférable pour un contrôle min ET max simultané */}
            </View>

            <View style={StylesLogement.separator} />

            {/* --- 2. Filtre de Note/Qualité --- */}
            <View style={StylesLogement.filterGroup}>
              <RatingSelector
                minRating={tempFilters.minRating}
                onSelect={handleRatingChange}
              />
            </View>

            <View style={StylesLogement.separator} />

            {/* --- 3. Exemple d'Autre Filtre (Switch) --- */}
            <View style={StylesLogement.filterGroupRow}>
              <Text style={StylesLogement.filterLabel}>Avec Wifi</Text>
              <Switch
                trackColor={{ false: '#767577', true: Colors.primaryLight }}
                thumbColor={Colors.primary}
                value={false} // État réel à implémenter
                onValueChange={() => {}}
              />
            </View>
          </ScrollView>

          <TouchableOpacity
            style={StylesLogement.applyButton}
            onPress={handleApply}
          >
            <Text style={StylesLogement.applyButtonText}>
              Voir{' '}
              {tempFilters.minRating > 0
                ? 'les résultats filtrés'
                : 'les logements'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={StylesLogement.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
