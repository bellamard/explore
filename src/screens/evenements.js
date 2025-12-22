import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import HeaderLogement from '../components/headerLogement';
import styles from '../styles/evenement';

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
const Evenements = ({ params }) => {
  const [username, setUsername] = useState('Voyageur');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // État de la Modale
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); // État de la Modale de Recherche
  const maxYear = new Date().getFullYear() + 2;
  const maxLimitDate = `${maxYear}-01-01`;
  const minYear = new Date().getFullYear();
  const minLimitDate = `${minYear}-01-01`;
  const [markedDates, setMarkedDates] = useState({});

  const handleLongPress = day => {
    const dateString = day.dateString;

    // On crée une copie de l'état actuel
    let updatedMarkedDates = { ...markedDates };

    if (updatedMarkedDates[dateString]) {
      // Si la date existe déjà, on la supprime (décocher)
      delete updatedMarkedDates[dateString];
    } else {
      // Sinon, on l'ajoute avec son style
      updatedMarkedDates[dateString] = {
        selected: true,
        selectedColor: '#FF5733',
        selectedTextColor: 'white',
      };
    }

    // Mise à jour de l'état
    setMarkedDates(updatedMarkedDates);
  };

  return (
    <View>
      <HeaderLogement
        userName={username}
        onFilterPress={() => setIsModalVisible(true)}
        onSearchPress={() => {
          console.log('Opening search modal');
          setIsSearchModalVisible(true);
        }}
        searchQuery={searchQuery} // Afficher la recherche
      />
      <Calendar
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={minLimitDate}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxLimitDate}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={handleLongPress}
        markedDates={markedDates}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={true}
        // Disable right arrow. Default = false
        disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => {
          /*Return JSX*/
          const month = LocaleConfig.locales['fr'].monthNames[date.getMonth()];
          const year = date.getFullYear();

          return (
            <View style={styles.headerContainer}>
              <Text style={styles.monthText}>{month}</Text>
              <Text style={styles.yearText}>{year}</Text>
            </View>
          );
        }}
        theme={{
          // On retire les styles par défaut qui pourraient gêner
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between', // Aligne le titre et les flèches
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
              alignItems: 'center',
            },
          },
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      <Text style={styles.infoText}>
        Appuyez longuement sur une date pour la sélectionner ou la
        désélectionner.
      </Text>
    </View>
  );
};

export default Evenements;
