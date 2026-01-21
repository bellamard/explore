import React, { useEffect, useState, useCallback } from 'react';
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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../styles/logement';
import StylesPublie from '../styles/publie';
import * as ImagePicker from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';

const typesPublication = [
  { id: 1, typeName: 'Logements', icone: 'bed' },
  { id: 2, typeName: 'Événements', icone: 'calendar' },
  { id: 3, typeName: 'Sites', icone: 'map-marker' },
];

const cardPublication = ({ type }) => (
  <TouchableOpacity>
    <Icon name={type.icone} size={24} color="#4A6FA5" />
    <Text>{type.typeName}</Text>
  </TouchableOpacity>
);

const imageView = ({ item, onDeleteImage }) => {
  return (
    <View>
      <TouchableOpacity
        style={StylesPublie.removeIconContainer}
        onPress={() => onDeleteImage(item.id)}
      >
        <Icon
          name="close-circle"
          size={20}
          color="#FF3B30"
          style={StylesPublie.removeIcon}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.uri }} style={StylesPublie.image} />
    </View>
  );
};

const cardBilleterie = ({ type, onBill }) => (
  <TouchableOpacity
    style={StylesPublie.billeterieCard}
    onPress={() => {
      onBill(type.typeName);
    }}
  >
    <Text>{type.typeName}</Text>
  </TouchableOpacity>
);

const Publie = ({ params }) => {
  const [listImages, setListImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dataPublie, setDataPublie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [namePage, setNamePage] = useState('');
  const [typeLogementList, setTypeLogementList] = useState([]);
  const [typeSite, setTypeSite] = useState([]);
  const [typeBilleterie, setTypeBilleterie] = useState([]);

  useEffect(() => {
    // Initial data fetch or setup can be done here
    setTypeLogementList(['Appartement', 'Maison', 'Studio']);
    setTypeSite(['Parc', 'Monument', 'Musée']);
    setTypeBilleterie(['Gratuit', 'Payant', 'reservé']);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const onDeleteImage = useCallback(
    id => {
      setListImages(listImages.filter(image => image.id !== id));
    },
    [listImages],
  );

  const getViewGalerie = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission refusée pour accéder à la galerie');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      includeBase64: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setListImages(prev => [...prev, ...selectedImages]);
    }
  };

  const homepage = () => {
    <View>
      <View>
        <TextInput
          placeholder="Titre de la publication"
          style={StylesPublie.input}
        />
        <View>
          <Text style={StylesPublie.sectionTitle}>Type de publication</Text>
          <FlatList
            data={typesPublication}
            renderItem={({ item }) => cardPublication({ type: item })}
            keyExtractor={item => item.id}
            horizontal
          />
          <View style={StylesPublie.divider} />
          <View>
            <TextInput
              placeholder="Description"
              style={StylesPublie.textArea}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <View>
              <TouchableOpacity
                style={StylesPublie.addButton}
                onPress={() => getViewGalerie()}
              >
                <Icon name="plus" size={16} color={Colors.primaryLight} />
              </TouchableOpacity>
              <FlatList
                data={listImages}
                renderItem={({ item }) => imageView({ item, onDeleteImage })}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.primary]}
                    tintColor={Colors.primaryLight}
                  />
                }
                contentContainerStyle={StylesPublie.imageListContainer}
              />
            </View>
          </View>
        </View>
      </View>
    </View>;
  };

  const typepage = () => {
    if (selectedType == 'Logements') {
      return (
        <View>
          <View>
            <Text>Type de Logements</Text>
            <SelectDropdown
              data={typeLogementList}
              onSelect={selectedItem => {
                setDataPublie({ ...dataPublie, typeLogement: selectedItem });
              }}
              defaultButtonText="Sélectionnez un type de logement"
              buttonStyle={StylesPublie.dropdownBtn}
              buttonTextStyle={StylesPublie.dropdownBtnText}
            />
            <View>
              <TextInput
                placeholder="Nombre de Pièces"
                style={StylesPublie.input}
                keyboardType="numeric"
                onChangeText={text =>
                  setDataPublie({ ...dataPublie, nombreChambres: text })
                }
              />
            </View>
          </View>
          <View style={StylesPublie.divider} />
          <View>
            <Text>Type de Séjour</Text>
            <SelectDropdown
              data={['Nuit', 'Semaine', 'Mois']}
              onSelect={selectedItem => {
                setDataPublie({ ...dataPublie, typeSejour: selectedItem });
              }}
              defaultButtonText="Sejour"
              buttonStyle={StylesPublie.dropdownBtn}
              buttonTextStyle={StylesPublie.dropdownBtnText}
            />
            <TextInput
              placeholder="Prix"
              style={StylesPublie.input}
              keyboardType="numeric"
              onChangeText={text =>
                setDataPublie({ ...dataPublie, prixNuit: text })
              }
            />
          </View>
          <View style={StylesPublie.divider} />
          <View>
            <Text>Adresse du Logement</Text>
            <TextInput
              placeholder="Numéro et Rue"
              style={StylesPublie.input}
              onChangeText={text =>
                setDataPublie({
                  ...dataPublie,
                  adresse: { ...dataPublie.adresse, avenue: text },
                })
              }
            />
            <TextInput
              placeholder="Commune"
              style={StylesPublie.input}
              onChangeText={text =>
                setDataPublie({
                  ...dataPublie,
                  adresse: { ...dataPublie.adresse, commune: text },
                })
              }
            />
            <TextInput
              placeholder="Ville"
              style={StylesPublie.input}
              onChangeText={text =>
                setDataPublie({
                  ...dataPublie,
                  adresse: { ...dataPublie.adresse, ville: text },
                })
              }
            />
            <TextInput
              placeholder="Province"
              style={StylesPublie.input}
              onChangeText={text =>
                setDataPublie({
                  ...dataPublie,
                  adresse: { ...dataPublie.adresse, province: text },
                })
              }
            />
          </View>
          <View style={StylesPublie.divider} />
          <FlatList
            data={typeBilleterie}
            renderItem={({ item }) => (
              <cardBilleterie
                type={item}
                onBill={type => {
                  setDataPublie({ ...dataPublie, typeBilleterie: type });
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={StylesPublie.billeterieListContainer}
          />
        </View>
      );
    }
    if (selectedType == 'Événements') {
      return (
        <View>
          <Text>Page Événements</Text>
        </View>
      );
    }
    if (selectedType == 'Sites') {
      return (
        <View>
          <Text>Page Sites</Text>
        </View>
      );
    }
  };

  const billeteriepage = () => {};

  const apercuspage = () => {};

  const gestionPage = () => {
    switch (pagination.page) {
      case 1:
        return homepage();
      case 2:
        return typepage();
      case 3:
        return billeteriepage();
      case 4:
        return apercuspage();
      default:
        return homepage();
    }
  };

  return (
    <SafeAreaView style={StylesPublie.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View>
        <View style={StylesPublie.header}>
          <Text style={StylesPublie.headerText}>Créer une publication</Text>
        </View>
        <View style={StylesPublie.content}>
          {gestionPage()}
          <TouchableOpacity
            style={StylesPublie.pageIndicator}
            onPress={() => {
              console.log(namePage);
            }}
          >
            <Text>{namePage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Publie;
