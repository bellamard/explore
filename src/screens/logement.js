import React from 'react';
import { Text, View, FlatList } from 'react-native';
import HeaderLogement from '../components/headerLogement';
import StylesLogement from '../styles/logement';
import { useEffect, useState } from 'react';

const Logements = ({ params }) => {
  const [username, setUsername] = useState('');
  const [dataLogement, setDataLogement] = useState([]);
  const [type, setType] = useState([]);
  const [loaging, setLoaging] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');

  const onNotificationPress = () => {};
  const onFilterPress = () => {};
  const onSearchPress = () => {};

  const Research = ({ data }) => {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          contentContainerStyle={StylesLogement.categoryCard}
        />
      </View>
    );
  };

  const GestionType = () => {};

  return (
    <View>
      <HeaderLogement
        userName={username}
        onFilterPress={onFilterPress}
        onNotificationPress={onNotificationPress}
        onSearchPress={onSearchPress}
      />
    </View>
  );
};

export default Logements;
