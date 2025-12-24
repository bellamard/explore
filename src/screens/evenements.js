import React, { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import HeaderLogement from '../components/headerLogement';
import styles, { calendarTheme } from '../styles/evenement';
import { colors } from '../styles';

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
const ITEMS = [
  {
    title: '2025-12-23',
    data: [
      {
        hour: '12pm',
        duration: '1h',
        title: 'Déjeuner de Noël',
        urlImage: 'https://picsum.photos/seed/picsum/200/300',
      },
    ],
  },
  {
    title: '2025-12-25',
    data: [
      {
        hour: '9am',
        duration: '2h',
        title: 'Ouverture des cadeaux',
        urlImage: 'https://picsum.photos/seed/picsum/200/300',
      },
      {
        hour: '2pm',
        duration: '3h',
        title: 'Repas de famille',
        urlImage: 'https://picsum.photos/seed/picsum/200/300',
      },
    ],
  },
  {
    title: '2025-12-28',
    data: [
      {
        hour: '10am',
        duration: '1h',
        title: 'Brunch',
        urlImage: 'https://picsum.photos/seed/picsum/200/300',
      },
    ],
  },
];

const Evenements = ({ params }) => {
  const [username, setUsername] = useState('Voyageur');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la Modale
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); // État de la Modale de Recherche
  const maxYear = new Date().getFullYear() + 2;
  const maxLimitDate = `${maxYear}-01-01`;
  const minYear = new Date().getFullYear();
  const minLimitDate = `${minYear}-01-01`;
  const today = new Date().toISOString().split('T')[0];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <Image source={{ uri: item.urlImage }} style={styles.itemImage} />
        <Text style={styles.itemHour}>{item.hour}</Text>
      </View>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDuration}>{item.duration}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderLogement
        userName={username}
        onFilterPress={() => setIsModalVisible(true)}
        onSearchPress={() => {
          console.log('Opening search modal');
          setIsSearchModalVisible(true);
        }}
        searchQuery={searchQuery} // Afficher la recherche
      />
      <CalendarProvider
        date={today}
        // Cette fonction se déclenche quand on change de date
        onDateChanged={date => console.log('Date sélectionnée:', date)}
        showTodayButton
      >
        <ExpandableCalendar
          firstDay={1}
          minDate={minLimitDate}
          maxDate={maxLimitDate}
          markedDates={{
            [today]: { selected: true, selectedColor: '#00adf5' },
          }}
          theme={calendarTheme}
        />

        {/* La liste des tâches qui prend le reste de l'espace */}
        <AgendaList
          sections={ITEMS}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      </CalendarProvider>
    </View>
  );
};

export default Evenements;
