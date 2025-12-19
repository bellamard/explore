// Logements.js
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';

// Import des composants et styles
import HeaderLogement from '../components/headerLogement'; // Renommage pour cohérence
import TypeLogement from '../components/typeLogement';
import SiteCard from '../components/siteCard';
import SearchModal from '../components/SearchModal';
import FilterModal from '../components/FilterModal'; // Le nouveau composant complet
import { StylesLogement, Colors } from '../styles/logement'; // Styles regroupés

// --- Données Factices Améliorées (Les vôtres, rendues plus lisibles) ---
const ALL_TYPE_OPTION = {
  id: 0,
  typeName: 'Tout',
  icone: 'globe',
  isActive: true,
};
const MOCK_TYPES = [
  ALL_TYPE_OPTION,
  { id: 1, typeName: 'Appartement', icone: 'building', isActive: false },
  { id: 2, typeName: 'Maison', icone: 'home', isActive: false },
  { id: 3, typeName: 'Villa', icone: 'umbrella', isActive: false },
  { id: 4, typeName: 'Chambre', icone: 'bed', isActive: false },
  { id: 5, typeName: 'Bateau', icone: 'ship', isActive: false },
];

const MOCK_LOGEMENTS = [
  // ... Garder vos données factices
  {
    id: 'l1',
    logementName: 'Magnifique Loft en centre-ville',
    typeLogement: 'Appartement',
    Price: 120,
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

const INITIAL_FILTERS = {
  minPrice: 0,
  maxPrice: 500,
  minRating: 0,
};

// --- Composant Principal ---
const Logements = () => {
  const [loading, setLoading] = useState(true);
  const [username] = useState('Alexis'); // Simplifié, pas besoin de setUsername

  const [dataLogement] = useState(MOCK_LOGEMENTS); // Logements complets
  const [typeLogementList, setTypeLogementList] = useState(MOCK_TYPES);

  // États de Filtrage
  const [selectedType, setSelectedType] = useState(ALL_TYPE_OPTION.typeName); // Filtre rapide
  const [searchQuery, setSearchQuery] = useState(''); // Filtre de recherche
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la Modale
  const [advancedFilters, setAdvancedFilters] = useState(INITIAL_FILTERS); // Filtres Modale
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); // État de la Modale de Recherche

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // --- Handlers ---

  const handleTypeSelect = useCallback(typeName => {
    setSelectedType(typeName);
    // Mettre à jour l'état visuel des types
    setTypeLogementList(prevTypes =>
      prevTypes.map(type => ({
        ...type,
        isActive: type.typeName === typeName,
      })),
    );
  }, []);

  const onSearchChange = useCallback(text => {
    setSearchQuery(text);
  }, []);

  const onApplyFilters = useCallback(filters => {
    setAdvancedFilters(filters);
    setIsModalVisible(false); // Fermer la modale après application
  }, []);

  const formatPrice = useCallback(price => {
    return typeof price === 'number' ? `€${price}` : price;
  }, []);

  // --- LOGIQUE DE FILTRAGE (Combinée et Optimisée) ---
  const filteredLogements = useMemo(() => {
    let result = dataLogement;

    // 1. Filtrage par Type (FlatList en haut)
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

    // 3. Filtrage par Filtres Avancés (Prix et Note/Qualité)
    const { minPrice, maxPrice, minRating } = advancedFilters;

    result = result
      .filter(
        logement => logement.Price >= minPrice && logement.Price <= maxPrice,
      )
      .filter(logement => logement.ratingValue >= minRating);

    return result;
  }, [dataLogement, selectedType, searchQuery, advancedFilters]);

  // --- Composants de Rendu ---

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
            isActive={item.typeName === selectedType}
          />
        )}
        contentContainerStyle={StylesLogement.typeListContainer}
      />
    </View>
  );

  const ResearchList = () => {
    if (loading) {
      return (
        <View style={StylesLogement.feedbackContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={StylesLogement.feedbackText}>
            Recherche des meilleurs logements...
          </Text>
        </View>
      );
    }

    if (filteredLogements.length === 0) {
      const message = `Aucun logement ne correspond à vos critères actuels. Modifiez vos filtres ou votre recherche.`;
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

        <FlatList
          data={filteredLogements}
          renderItem={({ item }) => (
            <SiteCard
              data={{
                ...item,
                Price: formatPrice(item.Price),
              }}
              // Optionnel: Ajouter un onPress pour naviguer vers le détail
              onPress={() =>
                console.log('Aller au détail de:', item.logementName)
              }
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
        onFilterPress={() => setIsModalVisible(true)} // Ouvre la modale
        onSearchPress={() => {
          console.log('Opening search modal'); // Pour déboguer
          setIsSearchModalVisible(true);
        }}
        searchQuery={searchQuery} // Afficher la recherche
      />

      {/* 2. Filtres rapides par Type */}
      <GestionType />

      {/* 3. Liste des Logements */}
      <View style={StylesLogement.boxListLogement}>
        <ResearchList />
      </View>

      {/* 4. Modale de Filtres Avancés */}
      <FilterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialFilters={advancedFilters}
        onApplyFilters={onApplyFilters}
      />

      <SearchModal
        visible={isSearchModalVisible}
        onClose={() => setIsSearchModalVisible(false)}
        onSearch={query => {
          console.log('Search query:', query); // Pour déboguer
          setSearchQuery(query);
          setIsSearchModalVisible(false);
        }}
        initialValue={searchQuery}
      />
    </View>
  );
};

export default Logements;
