import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Modal, // Import de Modal
  TouchableOpacity, // Utile pour les boutons de modale
} from 'react-native';
import HeaderLogement from '../components/headerLogement';
import TypeLogement from '../components/typeLogement';
import SiteCard from '../components/siteCard';
import StylesLogement from '../styles/logement';

// --- NOUVEAU: Composant de Filtre Modal (À implémenter) ---
// Ce composant doit être créé séparément (ex: FilterModal.js)
const FilterModalComponent = ({
  visible,
  onClose,
  initialFilters,
  onApplyFilters,
}) => {
  // Ici, vous ajouteriez la logique interne pour gérer les sliders de prix,
  // les sélecteurs de type et de note.
  const [tempFilters, setTempFilters] = useState(initialFilters);

  // Exemple de gestion d'un changement de prix (vous aurez besoin de Sliders/Inputs)
  const handlePriceChange = (min, max) => {
    setTempFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={StylesLogement.modalContainer}>
        <View style={StylesLogement.modalContent}>
          <Text style={StylesLogement.modalTitle}>Filtres Avancés</Text>

          {/* --- Zone d'Implémentation des Filtres --- */}
          <Text>Prix Min/Max (Sliders/Inputs)</Text>
          <Text>Qualité/Note Min (Sélecteur d'étoiles)</Text>

          <TouchableOpacity
            style={StylesLogement.applyButton}
            onPress={handleApply}
          >
            <Text style={StylesLogement.applyButtonText}>
              Appliquer les Filtres
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={StylesLogement.closeButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
// -----------------------------------------------------------------

// --- Données Factices Améliorées ---
const ALL_TYPE_OPTION = {
  id: 0,
  typeName: 'Tout',
  icone: 'globe',
  isActive: true,
}; // Nouvelle option "Tout"
const MOCK_TYPES = [
  ALL_TYPE_OPTION,
  { id: 1, typeName: 'Appartement', icone: 'building', isActive: false },
  { id: 2, typeName: 'Maison', icone: 'home', isActive: false },
  { id: 3, typeName: 'Villa', icone: 'umbrella', isActive: false },
  { id: 4, typeName: 'Chambre', icone: 'bed', isActive: false },
  { id: 5, typeName: 'Bateau', icone: 'ship', isActive: false },
];

const MOCK_LOGEMENTS = [
  // ... (vos données existantes)
  {
    id: 'l1',
    logementName: 'Magnifique Loft en centre-ville',
    typeLogement: 'Appartement',
    Price: 120, // Rendre le prix numérique pour le filtrage
    period: '/nuit',
    ratingValue: 4.7,
    image: 'https://picsum.photos/400/300?random=1',
    iconName: 'building',
  },
  {
    id: 'l2',
    logementName: 'Villa familiale avec piscine',
    typeLogement: 'Villa',
    Price: 350,
    period: '/nuit',
    ratingValue: 4.9,
    image: 'https://picsum.photos/400/300?random=2',
    iconName: 'umbrella',
  },
  {
    id: 'l3',
    logementName: 'Petite Maisonnette charmante',
    typeLogement: 'Maison',
    Price: 80,
    period: '/nuit',
    ratingValue: 4.2,
    image: 'https://picsum.photos/400/300?random=3',
    iconName: 'home',
  },
  {
    id: 'l4',
    logementName: 'Chambre privée proche de la gare',
    typeLogement: 'Chambre',
    Price: 45,
    period: '/nuit',
    ratingValue: 3.9,
    image: 'https://picsum.photos/400/300?random=4',
    iconName: 'bed',
  },
  {
    id: 'l5',
    logementName: 'Appartement moderne vue mer',
    typeLogement: 'Appartement',
    Price: 180,
    period: '/nuit',
    ratingValue: 5.0,
    image: 'https://picsum.photos/400/300?random=5',
    iconName: 'building',
  },
];
// -----------------------------------------------------------------

const INITIAL_FILTERS = {
  minPrice: 0,
  maxPrice: 500, // Une valeur par défaut élevée
  minRating: 0,
  typeFilter: null, // Utilisé seulement par la modale, pas le FlatList en haut
};

const Logements = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('Alexis');

  const [dataLogement, setDataLogement] = useState(MOCK_LOGEMENTS);
  const [typeLogementList, setTypeLogementList] = useState(MOCK_TYPES);

  // NOUVEAUX ÉTATS POUR LE FILTRAGE AVANCÉ ET LA MODALE
  const [selectedType, setSelectedType] = useState(ALL_TYPE_OPTION.typeName); // Défaut: 'Tout'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la Modale
  const [advancedFilters, setAdvancedFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
      // OPTIONNEL: Calculer minPrice/maxPrice dynamique si les données sont réelles
    }, 1500);
  }, []);

  // --- LOGIQUE DE FILTRAGE PAR TYPE (FlatList en haut) ---
  const handleTypeSelect = typeName => {
    // Si l'utilisateur reclique sur le type sélectionné, cela ne fait rien (ou pourrait désélectionner)
    // Ici, on gère la sélection simple, 'Tout' est géré implicitement par le `filteredLogements`
    setSelectedType(typeName);

    // Mettre à jour l'état visuel des types
    setTypeLogementList(prevTypes =>
      prevTypes.map(type => ({
        ...type,
        isActive: type.typeName === typeName,
      })),
    );
  };

  // --- HANDLERS D'ÉVÉNEMENTS POUR LA MODALE ET LA RECHERCHE ---
  const onSearchChange = useCallback(text => {
    setSearchQuery(text);
  }, []);

  const onFilterPress = useCallback(() => {
    setIsModalVisible(true); // Ouvrir la modale
  }, []);

  const onApplyFilters = useCallback(filters => {
    // Appliquer les filtres avancés reçus de la modale
    setAdvancedFilters(filters);
    // OPTIONNEL: Désélectionner le FlatList de type en haut si un type est choisi dans la modale
    if (filters.typeFilter) {
      handleTypeSelect(ALL_TYPE_OPTION.typeName); // Revenir à 'Tout' dans la FlatList
    }
  }, []);

  // --- LOGIQUE DE RECHERCHE ET DE FILTRAGE (Fonction clé) ---
  const filteredLogements = useMemo(() => {
    let result = dataLogement;

    // 1. Filtrage par Type (depuis le FlatList en haut)
    if (selectedType !== ALL_TYPE_OPTION.typeName) {
      result = result.filter(
        logement => logement.typeLogement === selectedType,
      );
    }

    // 2. Filtrage par Recherche (Titre/Nom)
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        logement =>
          logement.logementName.toLowerCase().includes(lowerCaseQuery) ||
          logement.typeLogement.toLowerCase().includes(lowerCaseQuery),
      );
    }

    // 3. Filtrage par Filtres Avancés (depuis la Modale)
    const { minPrice, maxPrice, minRating } = advancedFilters;

    // a. Filtrage par Prix
    result = result.filter(
      logement => logement.Price >= minPrice && logement.Price <= maxPrice,
    );

    // b. Filtrage par Note/Qualité
    result = result.filter(logement => logement.ratingValue >= minRating);

    // c. Filtrage par Type (si la modale le gère, ici on se concentre sur le FlatList)
    // Si le filtre de type était géré uniquement par la modale, on l'ajouterait ici

    return result;
  }, [dataLogement, selectedType, searchQuery, advancedFilters]);

  // Fonction utilitaire pour formatter le prix dans le SiteCard
  const formatPrice = price => {
    if (typeof price === 'number') {
      return `€${price}`;
    }
    return price;
  };

  // --- Composants de Rendu (Pour la clarté) ---
  const GestionType = () => (
    <View style={StylesLogement.typeSection}>
      <FlatList
        data={typeLogementList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TypeLogement
            {...item}
            onPress={() => handleTypeSelect(item.typeName)}
            // Gérer le style actif/inactif
            isActive={item.typeName === selectedType}
          />
        )}
        contentContainerStyle={StylesLogement.typeListContainer}
      />
    </View>
  );

  const ResearchList = () => {
    // ... (Logique de chargement, erreur, aucun résultat inchangée)

    if (loading) {
      return (
        <View style={StylesLogement.feedbackContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={StylesLogement.feedbackText}>
            Chargement des logements...
          </Text>
        </View>
      );
    }

    if (isError) {
      // ... (Gestion de l'erreur)
    }

    if (filteredLogements.length === 0) {
      // Message d'absence de résultat plus générique car plusieurs filtres sont actifs
      const message = `Aucun logement ne correspond à vos critères actuels.`;
      return (
        <View style={StylesLogement.feedbackContainer}>
          <Text style={StylesLogement.feedbackText}>{message}</Text>
        </View>
      );
    }

    return (
      <View style={StylesLogement.resultSection}>
        <Text style={StylesLogement.resultCountText}>
          {filteredLogements.length} logements trouvés
        </Text>

        {/* FlatList des Logements (Utilise SiteCard) */}
        <FlatList
          data={filteredLogements}
          renderItem={({ item }) => (
            <SiteCard
              data={{
                ...item,
                Price: formatPrice(item.Price), // Formatter le prix pour le rendu
              }}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={StylesLogement.listContent}
        />
      </View>
    );
  };

  // --- Rendu Final ---
  return (
    <View style={StylesLogement.container}>
      {/* 1. Header et Barre de Recherche */}
      <HeaderLogement
        userName={username}
        onFilterPress={onFilterPress}
        onNotificationPress={() => console.log('Notification pressed')}
        onSearchPress={() =>
          console.log('Naviguer vers la page de recherche complète')
        }
        onSearchChange={onSearchChange}
      />

      {/* 2. Filtres rapides par Type */}
      <GestionType />

      {/* 3. Liste des Logements */}
      <View style={{ flex: 1 }}>
        <ResearchList />
      </View>

      {/* 4. Modale de Filtres Avancés */}
      <FilterModalComponent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialFilters={advancedFilters}
        onApplyFilters={onApplyFilters}
      />
    </View>
  );
};

export default Logements;
