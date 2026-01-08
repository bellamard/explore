import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Modal,
  FlatList,
  Dimensions,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderLogement from '../components/headerLogement';
import styles, { calendarTheme } from '../styles/evenement';

const { height, width } = Dimensions.get('window');

// Configuration de la locale française
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

// Données fictives d'événements enrichies
import FAKE_EVENTS from '../data/fake_event';

// Composant Evenements Pro
const Evenements = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState(FAKE_EVENTS);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    categories: [],
    priceRange: { min: 0, max: 50000 },
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const today = new Date().toISOString().split('T')[0];
  const maxYear = new Date().getFullYear() + 2;
  const maxLimitDate = `${maxYear}-01-01`;
  const minYear = new Date().getFullYear();
  const minLimitDate = `${minYear}-01-01`;

  // Initialisation
  useEffect(() => {
    setFilteredEvents(events);
  }, []);

  // Filtrage des événements
  useEffect(() => {
    let filtered = [...events];

    // Filtres rapides
    switch (activeFilter) {
      case 'today':
        filtered = filtered.filter(section => section.date === today);
        break;
      case 'premium':
        filtered = filtered
          .map(section => ({
            ...section,
            data: section.data.filter(event => event.premium),
          }))
          .filter(section => section.data.length > 0);
        break;
      case 'sport':
        filtered = filtered
          .map(section => ({
            ...section,
            data: section.data.filter(event => event.type === 'Sport'),
          }))
          .filter(section => section.data.length > 0);
        break;
      case 'culture':
        filtered = filtered
          .map(section => ({
            ...section,
            data: section.data.filter(event => event.type === 'Culture'),
          }))
          .filter(section => section.data.length > 0);
        break;
      case 'family':
        filtered = filtered
          .map(section => ({
            ...section,
            data: section.data.filter(event => event.type === 'Famille'),
          }))
          .filter(section => section.data.length > 0);
        break;
      default:
        break;
    }

    // Filtres avancés
    if (selectedFilters.types.length > 0) {
      filtered = filtered
        .map(section => ({
          ...section,
          data: section.data.filter(event =>
            selectedFilters.types.includes(event.type),
          ),
        }))
        .filter(section => section.data.length > 0);
    }

    setFilteredEvents(filtered);
  }, [activeFilter, selectedFilters, events, today]);

  const handleCalendarStateChange = isOpen => {
    setCalendarOpen(isOpen);
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 0.8 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const getStatusColor = useCallback(status => {
    const colors = {
      confirmé: '#10B981',
      complet: '#EF4444',
      'places disponibles': '#3B82F6',
      'inscriptions ouvertes': '#8B5CF6',
      limité: '#F59E0B',
      'presque complet': '#EC4899',
    };
    return colors[status] || '#6B7280';
  }, []);

  const getTypeColor = useCallback(type => {
    const colors = {
      Travail: '#4A6FA5',
      Culture: '#FF6B6B',
      Famille: '#10B981',
      Sport: '#3B82F6',
      Art: '#8B5CF6',
      Gastronomie: '#EC4899',
    };
    return colors[type] || '#4A6FA5';
  }, []);

  const openEventPreview = useCallback(event => {
    setSelectedEvent(event);
    setIsPreviewModalVisible(true);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeEventPreview = useCallback(() => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsPreviewModalVisible(false);
      setSelectedEvent(null);
    });
  }, []);

  const getMarkedDates = useCallback(() => {
    const markedDates = {};

    // Marquer aujourd'hui
    markedDates[today] = {
      selected: today === selectedDate,
      selectedColor: '#4A6FA5',
      selectedTextColor: '#FFFFFF',
      dotColor: '#FFFFFF',
    };

    // Marquer les dates avec événements filtrés
    filteredEvents.forEach(section => {
      if (!markedDates[section.date]) {
        markedDates[section.date] = {
          dots: [{ color: '#FF6B6B', selectedDotColor: '#FFFFFF' }],
        };
      }

      // Si c'est la date sélectionnée
      if (section.date === selectedDate) {
        markedDates[section.date] = {
          ...markedDates[section.date],
          selected: true,
          selectedColor: '#4A6FA5',
          selectedTextColor: '#FFFFFF',
        };
      }
    });

    return markedDates;
  }, [filteredEvents, selectedDate, today]);

  const getEventsForDate = useCallback(() => {
    return (
      filteredEvents.find(section => section.date === selectedDate)?.data || []
    );
  }, [filteredEvents, selectedDate]);

  const getFutureEvents = useCallback(() => {
    const futureSections = filteredEvents
      .filter(section => {
        const sectionDate = new Date(section.date);
        const selectedDateObj = new Date(selectedDate);
        return sectionDate > selectedDateObj;
      })
      .slice(0, 2);

    return futureSections;
  }, [filteredEvents, selectedDate]);

  const currentEvents = getEventsForDate();
  const futureEvents = getFutureEvents();

  const FILTER_OPTIONS = [
    { id: 'all', label: 'Tous', icon: 'globe', color: '#4A6FA5' },
    { id: 'today', label: "Aujourd'hui", icon: 'calendar', color: '#10B981' },
    { id: 'premium', label: 'Premium', icon: 'star', color: '#F59E0B' },
    { id: 'sport', label: 'Sport', icon: 'futbol-o', color: '#3B82F6' },
    { id: 'culture', label: 'Culture', icon: 'music', color: '#FF6B6B' },
    { id: 'family', label: 'Famille', icon: 'home', color: '#10B981' },
  ];

  const TYPE_OPTIONS = [
    { id: 'Travail', label: 'Travail', color: '#4A6FA5' },
    { id: 'Culture', label: 'Culture', color: '#FF6B6B' },
    { id: 'Famille', label: 'Famille', color: '#10B981' },
    { id: 'Sport', label: 'Sport', color: '#3B82F6' },
    { id: 'Art', label: 'Art', color: '#8B5CF6' },
    { id: 'Gastronomie', label: 'Gastronomie', color: '#EC4899' },
  ];

  // Render Item pour FlatList
  const renderEventItem = useCallback(
    ({ item }) => (
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={[styles.item, item.premium && styles.itemPremium]}
          onPress={() => openEventPreview(item)}
          activeOpacity={0.9}
        >
          {item.premium && (
            <View style={styles.premiumBadge}>
              <Icon name="star" size={10} color="#1A1A1A" />
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
          )}

          <Image source={{ uri: item.urlImage }} style={styles.itemImage} />

          <View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <View
                style={[
                  styles.itemHourContainer,
                  { backgroundColor: getTypeColor(item.type) },
                ]}
              >
                <Icon name="clock-o" size={12} color="#FFFFFF" />
                <Text style={styles.itemHour}>{item.hour}</Text>
              </View>

              <View
                style={[
                  styles.itemStatus,
                  { backgroundColor: getStatusColor(item.status) + '20' },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.itemTitle}>{item.title}</Text>

            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.itemMeta}>
              <View style={styles.itemLocation}>
                <Icon name="map-marker" size={12} color="#888888" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>

              <View style={styles.typeDurationContainer}>
                <View
                  style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(item.type) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: getTypeColor(item.type) },
                    ]}
                  >
                    {item.type}
                  </Text>
                </View>

                <Text style={styles.itemDuration}>{item.duration}</Text>
              </View>
            </View>

            {item.tags && (
              <View style={styles.tagsContainer}>
                {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    ),
    [fadeAnim, getTypeColor, getStatusColor, openEventPreview],
  );

  const renderFilters = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Filtrer par catégorie</Text>
      <FlatList
        horizontal
        data={FILTER_OPTIONS}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterListContent}
        renderItem={({ item: filter }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === filter.id && { backgroundColor: filter.color },
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Icon
              name={filter.icon}
              size={14}
              color={activeFilter === filter.id ? '#FFFFFF' : filter.color}
            />
            <Text
              style={[
                styles.filterChipText,
                activeFilter === filter.id && styles.filterChipTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.moreFiltersButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Icon name="sliders" size={16} color="#4A6FA5" />
        <Text style={styles.moreFiltersText}>Plus de filtres</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon
        name="calendar-times-o"
        size={64}
        color="#DDDDDD"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>Aucun événement trouvé</Text>
      <Text style={styles.emptySubtitle}>
        {activeFilter !== 'all'
          ? 'Essayez avec un autre filtre ou revenez à "Tous"'
          : 'Aucun événement prévu pour cette date'}
      </Text>
      {activeFilter !== 'all' && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={styles.viewAllButtonText}>Voir tous les événements</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFutureEventSection = ({ item: section }) => (
    <View key={section.date} style={styles.futureSection}>
      <View style={styles.futureDateHeader}>
        <Text style={styles.futureDateText}>
          {new Date(section.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
      </View>

      <FlatList
        data={section.data}
        keyExtractor={item => item.id}
        renderItem={renderEventItem}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );

  const renderEventPreviewModal = () => {
    if (!selectedEvent) return null;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPreviewModalVisible}
        onRequestClose={closeEventPreview}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: modalAnim }]}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: modalAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Détails de l'événement</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closeEventPreview}
              >
                <Icon name="times" size={20} color="#666666" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={[selectedEvent]}
              keyExtractor={() => 'modal-content'}
              renderItem={() => (
                <View style={styles.modalContent}>
                  <Image
                    source={{ uri: selectedEvent.urlImage }}
                    style={styles.modalImage}
                  />

                  <View style={styles.modalTimeStatusContainer}>
                    <View
                      style={[
                        styles.itemHourContainer,
                        styles.modalHourContainer,
                        { backgroundColor: getTypeColor(selectedEvent.type) },
                      ]}
                    >
                      <Icon name="clock-o" size={14} color="#FFFFFF" />
                      <Text style={styles.itemHour}>{selectedEvent.hour}</Text>
                    </View>

                    <View
                      style={[
                        styles.itemStatus,
                        styles.modalStatus,
                        {
                          backgroundColor:
                            getStatusColor(selectedEvent.status) + '20',
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          {
                            backgroundColor: getStatusColor(
                              selectedEvent.status,
                            ),
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(selectedEvent.status) },
                        ]}
                      >
                        {selectedEvent.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalEventTitle}>
                    {selectedEvent.title}
                  </Text>

                  <Text style={styles.modalEventDescription}>
                    {selectedEvent.description}
                  </Text>

                  <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                      <Icon
                        name="map-marker"
                        size={18}
                        color="#4A6FA5"
                        style={styles.infoIcon}
                      />
                      <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Localisation</Text>
                        <Text style={styles.infoText}>
                          {selectedEvent.location}
                        </Text>
                        <Text style={styles.infoSubtext}>
                          {selectedEvent.address}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoRow}>
                      <Icon
                        name="user"
                        size={18}
                        color="#4A6FA5"
                        style={styles.infoIcon}
                      />
                      <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Organisateur</Text>
                        <Text style={styles.infoText}>
                          {selectedEvent.organizer}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoRow}>
                      <Icon
                        name="users"
                        size={18}
                        color="#4A6FA5"
                        style={styles.infoIcon}
                      />
                      <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Participants</Text>
                        <Text style={styles.infoText}>
                          {selectedEvent.participants} personnes
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoRow}>
                      <Icon
                        name="money"
                        size={18}
                        color="#4A6FA5"
                        style={styles.infoIcon}
                      />
                      <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Participation</Text>
                        <Text style={styles.infoText}>
                          {selectedEvent.price}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                    <View style={styles.modalTagsSection}>
                      <Text style={styles.modalTagsTitle}>Mots-clés</Text>
                      <View style={styles.modalTagsContainer}>
                        {selectedEvent.tags.map((tag, index) => (
                          <View key={index} style={styles.modalTag}>
                            <Text style={styles.modalTagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Icon name="share-alt" size={16} color="#4A6FA5" />
                      <Text style={styles.secondaryActionText}>Partager</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryAction}>
                      <Icon name="calendar-check-o" size={16} color="#FFFFFF" />
                      <Text style={styles.primaryActionText}>Réserver</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  };

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtres avancés</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsFilterModalVisible(false)}
            >
              <Icon name="times" size={20} color="#666666" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={[1]}
            keyExtractor={() => 'filter-content'}
            renderItem={() => (
              <View style={styles.filterModalContent}>
                <Text style={styles.filterTypeTitle}>Type d'événement</Text>

                <View style={styles.typeOptionsContainer}>
                  {TYPE_OPTIONS.map(type => {
                    const isSelected = selectedFilters.types.includes(type.id);
                    return (
                      <TouchableOpacity
                        key={type.id}
                        style={[
                          styles.filterChip,
                          isSelected && { backgroundColor: type.color },
                        ]}
                        onPress={() => {
                          setSelectedFilters(prev => ({
                            ...prev,
                            types: isSelected
                              ? prev.types.filter(t => t !== type.id)
                              : [...prev.types, type.id],
                          }));
                        }}
                      >
                        <Text
                          style={[
                            styles.filterChipText,
                            isSelected && styles.filterChipTextActive,
                          ]}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.filterModalActions}>
                  <TouchableOpacity
                    style={styles.resetFilterButton}
                    onPress={() => {
                      setSelectedFilters({
                        types: [],
                        categories: [],
                        priceRange: { min: 0, max: 50000 },
                      });
                    }}
                  >
                    <Text style={styles.resetFilterText}>Réinitialiser</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.applyFilterButton}
                    onPress={() => setIsFilterModalVisible(false)}
                  >
                    <Text style={styles.applyFilterText}>Appliquer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );

  // Données pour la FlatList principale
  const getListData = () => {
    const data = [];

    // Section en-tête
    data.push({
      type: 'header',
      id: 'section-header',
      text:
        selectedDate === today
          ? "Événements d'aujourd'hui"
          : `Événements du ${new Date(selectedDate).toLocaleDateString(
              'fr-FR',
              {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            )}`,
    });

    // Événements actuels
    if (currentEvents.length > 0) {
      currentEvents.forEach((event, index) => {
        data.push({
          type: 'event',
          id: event.id,
          event,
          isLast: index === currentEvents.length - 1,
        });
      });
    } else {
      data.push({
        type: 'empty',
        id: 'empty-state',
      });
    }

    // Événements futurs
    if (currentEvents.length > 0 && futureEvents.length > 0) {
      data.push({
        type: 'future-header',
        id: 'future-header',
        text: 'Prochains événements',
      });

      futureEvents.forEach(section => {
        data.push({
          type: 'future-section',
          id: `future-section-${section.date}`,
          section,
        });
      });
    }

    return data;
  };

  const renderListItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionText}>{item.text}</Text>
          </View>
        );

      case 'event':
        return (
          <View key={item.id}>
            {renderEventItem({ item: item.event })}
            {!item.isLast && <View style={styles.separator} />}
          </View>
        );

      case 'empty':
        return renderEmptyState();

      case 'future-header':
        return (
          <View style={styles.futureHeader}>
            <Text style={styles.futureHeaderText}>{item.text}</Text>
          </View>
        );

      case 'future-section':
        return renderFutureEventSection({ item: item.section });

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <HeaderLogement userName="Voyageur" title="Événements" showBack={false} />

      <View style={{ flex: 1 }}>
        {/* Calendrier */}
        <CalendarProvider
          date={selectedDate}
          onDateChanged={date => {
            console.log('Date sélectionnée:', date);
            setSelectedDate(date);
          }}
          showTodayButton
          todayButtonStyle={styles.todayButton}
          todayTextStyle={styles.todayButtonText}
          disabledOpacity={0.3}
        >
          <View style={styles.calendarWrapper}>
            {/* Header personnalisé du calendrier */}
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarHeaderTitle}>
                Calendrier des événements
              </Text>
              <Text style={styles.calendarHeaderSubtitle}>
                Sélectionnez une date pour voir les événements
              </Text>
            </View>

            <ExpandableCalendar
              firstDay={1}
              minDate={minLimitDate}
              maxDate={maxLimitDate}
              markedDates={getMarkedDates()}
              theme={calendarTheme}
              initialPosition={calendarOpen ? 'open' : 'closed'}
              onCalendarToggled={handleCalendarStateChange}
              hideKnob={false}
              closeOnDayPress={false}
              onDayPress={day => {
                console.log('Jour sélectionné:', day.dateString);
                setSelectedDate(day.dateString);
              }}
              style={styles.calendar}
              pastScrollRange={12}
              futureScrollRange={12}
              allowSelectionOutOfRange={false}
              disableMonthChange={false}
              animateScroll={true}
            />
          </View>

          {/* Filtres rapides */}
          {renderFilters()}

          {/* Liste des événements avec FlatList */}
          <FlatList
            ref={flatListRef}
            data={getListData()}
            keyExtractor={item => item.id}
            renderItem={renderListItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#4A6FA5']}
                tintColor="#4A6FA5"
              />
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={styles.listFooter} />}
          />
        </CalendarProvider>
      </View>

      {/* Modals */}
      {renderEventPreviewModal()}
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default Evenements;
