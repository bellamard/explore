import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  Dimensions,
  Platform,
  RefreshControl,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../styles/logement';
import StylesPublie from '../styles/publie';
import * as ImagePicker from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UtilityStyles } from '../styles/logement';

const { width } = Dimensions.get('window');

const typesPublication = [
  { id: 1, typeName: 'Logements', icone: 'bed', color: '#4F46E5' },
  { id: 2, typeName: 'Événements', icone: 'calendar', color: '#10B981' },
  { id: 3, typeName: 'Sites', icone: 'map-marker', color: '#8B5CF6' },
];

// --- Composant PublicationCard ---
const PublicationCard = ({ type, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      StylesPublie.publicationCard,
      isSelected && StylesPublie.publicationCardSelected,
      isSelected && {
        borderColor: type.color,
        backgroundColor: `${type.color}10`,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[
        StylesPublie.publicationIcon,
        { backgroundColor: `${type.color}15` },
      ]}
    >
      <Icon name={type.icone} size={24} color={type.color} />
    </View>
    <Text
      style={[
        StylesPublie.publicationCardText,
        isSelected && { color: type.color, fontWeight: '600' },
      ]}
    >
      {type.typeName}
    </Text>
  </TouchableOpacity>
);

// --- Composant ImageView ---
const ImageView = ({ item, index, onDeleteImage }) => {
  return (
    <View style={StylesPublie.imageContainer}>
      <TouchableOpacity
        style={StylesPublie.removeIconContainer}
        onPress={() => onDeleteImage(item.id || index)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcon name="close" size={16} color="#FFFFFF" />
      </TouchableOpacity>
      <Image source={{ uri: item.uri || item }} style={StylesPublie.image} />
    </View>
  );
};

// --- Composant BilleterieCard ---
const BilleterieCard = ({ type, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      StylesPublie.billeterieCard,
      isSelected && StylesPublie.billeterieCardSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        StylesPublie.billeterieCardText,
        isSelected && StylesPublie.billeterieCardTextSelected,
      ]}
    >
      {type}
    </Text>
  </TouchableOpacity>
);

// --- Composant TypeCard ---
const TypeCard = ({ type, isSelected, onPress }) => (
  <TouchableOpacity
    style={[StylesPublie.typeCard, isSelected && StylesPublie.typeCardSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        StylesPublie.typeCardText,
        isSelected && StylesPublie.typeCardTextSelected,
      ]}
    >
      {type}
    </Text>
  </TouchableOpacity>
);

// --- Composant StepIndicator ---
const StepIndicator = ({ steps, currentStep }) => (
  <View style={StylesPublie.stepContainer}>
    {steps.map((step, index) => (
      <React.Fragment key={step.id}>
        <View style={StylesPublie.stepItem}>
          <View
            style={[
              StylesPublie.stepCircle,
              currentStep >= step.id && StylesPublie.stepCircleActive,
            ]}
          >
            <Text
              style={[
                StylesPublie.stepNumber,
                currentStep >= step.id && StylesPublie.stepNumberActive,
              ]}
            >
              {step.id}
            </Text>
          </View>
          <Text
            style={[
              StylesPublie.stepLabel,
              currentStep >= step.id && StylesPublie.stepLabelActive,
            ]}
          >
            {step.label}
          </Text>
        </View>
        {index < steps.length - 1 && (
          <View
            style={[
              StylesPublie.stepLine,
              currentStep > step.id && StylesPublie.stepLineActive,
            ]}
          />
        )}
      </React.Fragment>
    ))}
  </View>
);

const Publie = () => {
  const [listImages, setListImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dataPublie, setDataPublie] = useState({
    titre: '',
    description: '',
    typeLogement: '',
    typeEvenement: '',
    typeSite: '',
    typeBilleterie: '',
    typePayement: '',
    nombreChambres: '',
    nombreParticipants: '',
    prix: '',
    dateStart: null,
    dateEnd: null,
    adresse: {
      avenue: '',
      commune: '',
      ville: '',
      province: '',
    },
    lieu: {
      avenue: '',
      commune: '',
      ville: '',
      province: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showDateStart, setShowDateStart] = useState(false);
  const [showDateEnd, setShowDateEnd] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [detectedCard, setDetectedCard] = useState(null);
  const [detectedOperator, setDetectedOperator] = useState(null);

  const steps = [
    { id: 1, label: 'Général' },
    { id: 2, label: 'Détails' },
    { id: 3, label: 'Billeterie' },
    { id: 4, label: 'Aperçu' },
  ];

  const typeLogementList = [
    'Appartement',
    'Maison',
    'Studio',
    'Villa',
    'Chambre',
  ];
  const typeSite = [
    'Parc',
    'Monument',
    'Musée',
    'Site historique',
    'Site naturel',
  ];
  const typeBilleterieList = ['Gratuit', 'Payant'];
  const typeEvenementList = [
    'Concert',
    'Exposition',
    'Festival',
    'Conférence',
    'Atelier',
    'Spectacle',
    'Excursion',
    'Séminaire',
  ];
  const typePayementList = ['Carte Bancaire', 'Mobile Money', 'Espèces'];

  useEffect(() => {
    if (dataPublie.numeroCarte) {
      const cardType = detecterTypeCarte(dataPublie.numeroCarte);
      setDetectedCard(cardType);
    }
  }, [dataPublie.numeroCarte]);

  useEffect(() => {
    if (dataPublie.numeroMobileMoney) {
      const operator = detectRDCOperator(dataPublie.numeroMobileMoney);
      setDetectedOperator(operator);
    }
  }, [dataPublie.numeroMobileMoney]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const onDeleteImage = useCallback(id => {
    setListImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getViewGalerie = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
        selectionLimit: 10 - listImages.length,
      });

      if (result.assets && result.assets.length > 0) {
        const newImages = result.assets.map((asset, index) => ({
          id: Date.now() + index,
          uri: asset.uri,
        }));
        setListImages(prev => [...prev, ...newImages]);
      }
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'accéder à la galerie");
    }
  };

  const handleDateStartChange = (event, selectedDate) => {
    setShowDateStart(false);
    if (selectedDate) {
      setDateStart(selectedDate);
      setDataPublie(prev => ({ ...prev, dateStart: selectedDate }));
    }
  };

  const handleDateEndChange = (event, selectedDate) => {
    setShowDateEnd(false);
    if (selectedDate) {
      setDateEnd(selectedDate);
      setDataPublie(prev => ({ ...prev, dateEnd: selectedDate }));
    }
  };

  const formatDate = date => {
    if (!date) return 'Non défini';
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // --- Page 1: Général ---
  const renderHomepage = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={StylesPublie.sectionTitle}>Informations générales</Text>

      <View style={StylesPublie.inputGroup}>
        <Text style={StylesPublie.label}>Titre de la publication</Text>
        <TextInput
          placeholder="Donnez un titre attractif"
          style={StylesPublie.input}
          value={dataPublie.titre}
          onChangeText={text =>
            setDataPublie(prev => ({ ...prev, titre: text }))
          }
        />
      </View>

      <View style={StylesPublie.inputGroup}>
        <Text style={StylesPublie.label}>Description</Text>
        <TextInput
          placeholder="Décrivez votre publication..."
          style={StylesPublie.textArea}
          multiline
          numberOfLines={4}
          maxLength={500}
          value={dataPublie.description}
          onChangeText={text =>
            setDataPublie(prev => ({ ...prev, description: text }))
          }
        />
        <Text style={StylesPublie.charCount}>
          {dataPublie.description.length}/500 caractères
        </Text>
      </View>

      <View style={StylesPublie.inputGroup}>
        <Text style={StylesPublie.label}>Type de publication</Text>
        <FlatList
          data={typesPublication}
          renderItem={({ item }) => (
            <PublicationCard
              type={item}
              isSelected={selectedType === item.typeName}
              onPress={() => setSelectedType(item.typeName)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={StylesPublie.typeListContainer}
        />
      </View>

      <View style={StylesPublie.inputGroup}>
        <Text style={StylesPublie.label}>Photos</Text>
        <Text style={StylesPublie.subLabel}>
          Ajoutez jusqu'à 10 photos (minimum 1)
        </Text>

        <TouchableOpacity
          style={StylesPublie.addPhotoButton}
          onPress={getViewGalerie}
        >
          <MaterialIcon
            name="add-photo-alternate"
            size={28}
            color={Colors.primary}
          />
          <Text style={StylesPublie.addPhotoText}>Ajouter des photos</Text>
        </TouchableOpacity>

        {listImages.length > 0 && (
          <FlatList
            data={listImages}
            renderItem={({ item, index }) => (
              <ImageView
                item={item}
                index={index}
                onDeleteImage={onDeleteImage}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={StylesPublie.imageListContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary]}
                tintColor={Colors.primary}
              />
            }
          />
        )}
      </View>
    </ScrollView>
  );

  // --- Page 2: Détails ---
  const renderTypepage = () => {
    if (!selectedType) {
      return (
        <View style={StylesPublie.emptyState}>
          <MaterialIcon name="info" size={48} color={Colors.textLight} />
          <Text style={StylesPublie.emptyStateText}>
            Veuillez d'abord sélectionner un type de publication
          </Text>
        </View>
      );
    }

    if (selectedType === 'Logements') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={StylesPublie.sectionTitle}>Détails du logement</Text>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Type de logement</Text>
            <SelectDropdown
              data={typeLogementList}
              onSelect={selectedItem => {
                setDataPublie(prev => ({
                  ...prev,
                  typeLogement: selectedItem,
                }));
              }}
              defaultButtonText="Sélectionnez un type"
              buttonStyle={StylesPublie.dropdownBtn}
              buttonTextStyle={StylesPublie.dropdownBtnText}
              dropdownStyle={StylesPublie.dropdownStyle}
              rowStyle={StylesPublie.dropdownRow}
              rowTextStyle={StylesPublie.dropdownRowText}
            />
          </View>

          <View
            style={[
              UtilityStyles.flexRow,
              UtilityStyles.justifyBetween,
              UtilityStyles.mbLg,
            ]}
          >
            <View style={[UtilityStyles.flex, UtilityStyles.mrMd]}>
              <Text style={StylesPublie.label}>Nombre de pièces</Text>
              <TextInput
                placeholder="Ex: 3"
                style={StylesPublie.input}
                keyboardType="numeric"
                value={dataPublie.nombreChambres}
                onChangeText={text =>
                  setDataPublie(prev => ({ ...prev, nombreChambres: text }))
                }
              />
            </View>
            <View style={[UtilityStyles.flex]}>
              <Text style={StylesPublie.label}>Prix</Text>
              <TextInput
                placeholder="Ex: 50"
                style={StylesPublie.input}
                keyboardType="numeric"
                value={dataPublie.prix}
                onChangeText={text =>
                  setDataPublie(prev => ({ ...prev, prix: text }))
                }
              />
            </View>
          </View>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Adresse</Text>
            <TextInput
              placeholder="Numéro et rue"
              style={StylesPublie.input}
              value={dataPublie.adresse.avenue}
              onChangeText={text =>
                setDataPublie(prev => ({
                  ...prev,
                  adresse: { ...prev.adresse, avenue: text },
                }))
              }
            />
            <View
              style={[
                UtilityStyles.flexRow,
                UtilityStyles.gapMd,
                UtilityStyles.mtSm,
              ]}
            >
              <View style={UtilityStyles.flex}>
                <TextInput
                  placeholder="Commune"
                  style={StylesPublie.input}
                  value={dataPublie.adresse.commune}
                  onChangeText={text =>
                    setDataPublie(prev => ({
                      ...prev,
                      adresse: { ...prev.adresse, commune: text },
                    }))
                  }
                />
              </View>
              <View style={UtilityStyles.flex}>
                <TextInput
                  placeholder="Ville"
                  style={StylesPublie.input}
                  value={dataPublie.adresse.ville}
                  onChangeText={text =>
                    setDataPublie(prev => ({
                      ...prev,
                      adresse: { ...prev.adresse, ville: text },
                    }))
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }

    if (selectedType === 'Événements') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={StylesPublie.sectionTitle}>Détails de l'événement</Text>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Type d'événement</Text>
            <FlatList
              data={typeEvenementList}
              renderItem={({ item }) => (
                <TypeCard
                  type={item}
                  isSelected={dataPublie.typeEvenement === item}
                  onPress={() =>
                    setDataPublie(prev => ({ ...prev, typeEvenement: item }))
                  }
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              columnWrapperStyle={StylesPublie.typeGrid}
            />
          </View>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Dates</Text>
            <View style={[UtilityStyles.flexRow, UtilityStyles.gapMd]}>
              <TouchableOpacity
                style={[StylesPublie.dateButton, UtilityStyles.flex]}
                onPress={() => setShowDateStart(true)}
              >
                <MaterialIcon
                  name="calendar-today"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={StylesPublie.dateButtonText}>
                  {dataPublie.dateStart
                    ? formatDate(dataPublie.dateStart)
                    : 'Début'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[StylesPublie.dateButton, UtilityStyles.flex]}
                onPress={() => setShowDateEnd(true)}
              >
                <MaterialIcon
                  name="calendar-today"
                  size={20}
                  color={Colors.primary}
                />
                <Text style={StylesPublie.dateButtonText}>
                  {dataPublie.dateEnd ? formatDate(dataPublie.dateEnd) : 'Fin'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Lieu</Text>
            <TextInput
              placeholder="Nom du lieu"
              style={StylesPublie.input}
              value={dataPublie.lieu.avenue}
              onChangeText={text =>
                setDataPublie(prev => ({
                  ...prev,
                  lieu: { ...prev.lieu, avenue: text },
                }))
              }
            />
            <TextInput
              placeholder="Adresse complète"
              style={[StylesPublie.input, UtilityStyles.mtSm]}
              value={dataPublie.lieu.commune}
              onChangeText={text =>
                setDataPublie(prev => ({
                  ...prev,
                  lieu: { ...prev.lieu, commune: text },
                }))
              }
            />
          </View>
        </ScrollView>
      );
    }

    if (selectedType === 'Sites') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={StylesPublie.sectionTitle}>Détails du site</Text>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Type de site</Text>
            <FlatList
              data={typeSite}
              renderItem={({ item }) => (
                <TypeCard
                  type={item}
                  isSelected={dataPublie.typeSite === item}
                  onPress={() =>
                    setDataPublie(prev => ({ ...prev, typeSite: item }))
                  }
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={StylesPublie.typeListContainer}
            />
          </View>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Capacité</Text>
            <TextInput
              placeholder="Nombre maximum de participants"
              style={StylesPublie.input}
              keyboardType="numeric"
              value={dataPublie.nombreParticipants}
              onChangeText={text =>
                setDataPublie(prev => ({ ...prev, nombreParticipants: text }))
              }
            />
          </View>

          <View style={StylesPublie.inputGroup}>
            <Text style={StylesPublie.label}>Lieu</Text>
            <TextInput
              placeholder="Nom du site"
              style={StylesPublie.input}
              value={dataPublie.lieu.avenue}
              onChangeText={text =>
                setDataPublie(prev => ({
                  ...prev,
                  lieu: { ...prev.lieu, avenue: text },
                }))
              }
            />
            <TextInput
              placeholder="Adresse complète"
              style={[StylesPublie.input, UtilityStyles.mtSm]}
              value={dataPublie.lieu.commune}
              onChangeText={text =>
                setDataPublie(prev => ({
                  ...prev,
                  lieu: { ...prev.lieu, commune: text },
                }))
              }
            />
          </View>
        </ScrollView>
      );
    }

    return null;
  };

  // --- Page 3: Billeterie ---
  const renderBilleteriepage = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={StylesPublie.sectionTitle}>Options de billeterie</Text>

      <View style={StylesPublie.inputGroup}>
        <Text style={StylesPublie.label}>Type de billetterie</Text>
        <FlatList
          data={typeBilleterieList}
          renderItem={({ item }) => (
            <BilleterieCard
              type={item}
              isSelected={dataPublie.typeBilleterie === item}
              onPress={() =>
                setDataPublie(prev => ({ ...prev, typeBilleterie: item }))
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={StylesPublie.billeterieListContainer}
        />
      </View>

      {dataPublie.typeBilleterie === 'Payant' && (
        <View style={StylesPublie.inputGroup}>
          <Text style={StylesPublie.label}>Mode de paiement</Text>
          <FlatList
            data={typePayementList}
            renderItem={({ item }) => (
              <TypeCard
                type={item}
                isSelected={dataPublie.typePayement === item}
                onPress={() =>
                  setDataPublie(prev => ({ ...prev, typePayement: item }))
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={StylesPublie.typeListContainer}
          />

          {dataPublie.typePayement === 'Carte Bancaire' && (
            <View style={[UtilityStyles.mtLg]}>
              <Text style={StylesPublie.label}>Numéro de carte</Text>
              <View style={StylesPublie.inputWithIcon}>
                <TextInput
                  placeholder="1234 5678 9012 3456"
                  style={[StylesPublie.input, UtilityStyles.flex]}
                  keyboardType="numeric"
                  maxLength={19}
                  value={dataPublie.numeroCarte}
                  onChangeText={text =>
                    setDataPublie(prev => ({
                      ...prev,
                      numeroCarte: text
                        .replace(/\s/g, '')
                        .replace(/(.{4})/g, '$1 ')
                        .trim(),
                    }))
                  }
                />
                {detectedCard && (
                  <View style={StylesPublie.detectedCard}>{detectedCard}</View>
                )}
              </View>
            </View>
          )}

          {dataPublie.typePayement === 'Mobile Money' && (
            <View style={[UtilityStyles.mtLg]}>
              <Text style={StylesPublie.label}>Numéro Mobile Money</Text>
              <View style={StylesPublie.inputWithIcon}>
                <TextInput
                  placeholder="+243 XX XXX XXXX"
                  style={[StylesPublie.input, UtilityStyles.flex]}
                  keyboardType="phone-pad"
                  value={dataPublie.numeroMobileMoney}
                  onChangeText={text =>
                    setDataPublie(prev => ({
                      ...prev,
                      numeroMobileMoney: text,
                    }))
                  }
                />
                {detectedOperator && (
                  <View style={StylesPublie.detectedOperator}>
                    {detectedOperator}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      )}

      {dataPublie.typeBilleterie === 'Gratuit' && (
        <View style={StylesPublie.infoBox}>
          <MaterialIcon name="check-circle" size={24} color={Colors.success} />
          <Text style={StylesPublie.infoText}>
            Cet événement sera gratuit pour tous les participants
          </Text>
        </View>
      )}
    </ScrollView>
  );

  // --- Page 4: Aperçu ---
  const renderApercuspage = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={StylesPublie.sectionTitle}>Aperçu de la publication</Text>

      <View style={StylesPublie.previewCard}>
        {listImages.length > 0 && (
          <Image
            source={{ uri: listImages[0].uri || listImages[0] }}
            style={StylesPublie.previewImage}
          />
        )}

        <View style={StylesPublie.previewContent}>
          <Text style={StylesPublie.previewTitle}>
            {dataPublie.titre || 'Titre de la publication'}
          </Text>
          <Text style={StylesPublie.previewDescription}>
            {dataPublie.description || 'Description de la publication'}
          </Text>

          <View style={StylesPublie.previewDetails}>
            <View style={StylesPublie.detailRow}>
              <MaterialIcon
                name="category"
                size={18}
                color={Colors.textSecondary}
              />
              <Text style={StylesPublie.detailText}>
                {selectedType || 'Type non défini'}
              </Text>
            </View>

            {dataPublie.typeLogement && (
              <View style={StylesPublie.detailRow}>
                <Icon name="home" size={18} color={Colors.textSecondary} />
                <Text style={StylesPublie.detailText}>
                  {dataPublie.typeLogement}
                </Text>
              </View>
            )}

            {dataPublie.prix && (
              <View style={StylesPublie.detailRow}>
                <MaterialIcon
                  name="attach-money"
                  size={18}
                  color={Colors.textSecondary}
                />
                <Text style={StylesPublie.detailText}>{dataPublie.prix} €</Text>
              </View>
            )}

            {dataPublie.dateStart && (
              <View style={StylesPublie.detailRow}>
                <MaterialIcon
                  name="calendar-today"
                  size={18}
                  color={Colors.textSecondary}
                />
                <Text style={StylesPublie.detailText}>
                  {formatDate(dataPublie.dateStart)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={StylesPublie.summarySection}>
        <Text style={StylesPublie.summaryTitle}>Résumé</Text>
        <View style={StylesPublie.summaryItem}>
          <Text style={StylesPublie.summaryLabel}>Photos:</Text>
          <Text style={StylesPublie.summaryValue}>
            {listImages.length} photo(s)
          </Text>
        </View>
        <View style={StylesPublie.summaryItem}>
          <Text style={StylesPublie.summaryLabel}>Billeterie:</Text>
          <Text style={StylesPublie.summaryValue}>
            {dataPublie.typeBilleterie || 'Non défini'}
          </Text>
        </View>
        <View style={StylesPublie.summaryItem}>
          <Text style={StylesPublie.summaryLabel}>Paiement:</Text>
          <Text style={StylesPublie.summaryValue}>
            {dataPublie.typePayement || 'Non défini'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  // --- Gestion des pages ---
  const renderCurrentPage = () => {
    switch (currentStep) {
      case 1:
        return renderHomepage();
      case 2:
        return renderTypepage();
      case 3:
        return renderBilleteriepage();
      case 4:
        return renderApercuspage();
      default:
        return renderHomepage();
    }
  };

  const detecterTypeCarte = numeroCarte => {
    const numeroPropre = numeroCarte?.replace(/[\s-]/g, '') || '';

    if (!/^\d+$/.test(numeroPropre)) {
      return null;
    }

    const motifsCartes = [
      { type: 'VISA', motif: /^4[0-9]{12}(?:[0-9]{3})?$/ },
      { type: 'MASTERCARD', motif: /^5[1-5][0-9]{14}$/ },
      { type: 'AMEX', motif: /^3[47][0-9]{13}$/ },
    ];

    for (const carte of motifsCartes) {
      if (carte.motif.test(numeroPropre)) {
        return (
          <View style={StylesPublie.cardTypeBadge}>
            <Icon
              name={`cc-${carte.type.toLowerCase()}`}
              size={20}
              color={Colors.textDark}
            />
            <Text style={StylesPublie.cardTypeText}>{carte.type}</Text>
          </View>
        );
      }
    }

    return null;
  };

  const detectRDCOperator = phoneNumber => {
    if (!phoneNumber) return null;

    const number = phoneNumber.replace(/\D/g, '');
    let prefix = number;

    if (number.startsWith('243')) {
      prefix = number.substring(3);
    }
    if (prefix.startsWith('0')) {
      prefix = prefix.substring(1);
    }

    const operators = {
      voda: {
        name: 'M-Pesa',
        color: '#E60000',
        icon: 'mobile',
        prefixes: ['80', '81', '82', '83'],
      },
      orange: {
        name: 'Orange Money',
        color: '#FF6600',
        icon: 'mobile',
        prefixes: ['84', '85', '89'],
      },
      airtel: {
        name: 'Airtel Money',
        color: '#FF0000',
        icon: 'mobile',
        prefixes: ['97', '98', '99'],
      },
      africell: {
        name: 'Africell Money',
        color: '#00AEEF',
        icon: 'mobile',
        prefixes: ['90'],
      },
    };

    const twoDigitPrefix = prefix.substring(0, 2);

    for (const key in operators) {
      if (operators[key].prefixes.includes(twoDigitPrefix)) {
        return (
          <View style={StylesPublie.operatorBadge}>
            <Icon name="mobile" size={20} color={operators[key].color} />
            <Text
              style={[
                StylesPublie.operatorText,
                { color: operators[key].color },
              ]}
            >
              {operators[key].name}
            </Text>
          </View>
        );
      }
    }

    return null;
  };

  const handlePublish = () => {
    // Validation et logique de publication
    Alert.alert('Publication', 'Voulez-vous publier cette annonce ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Publier',
        style: 'default',
        onPress: () => {
          setLoading(true);
          // Logique de publication
          setTimeout(() => {
            setLoading(false);
            Alert.alert('Succès', 'Publication créée avec succès !');
          }, 1500);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={StylesPublie.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={UtilityStyles.flex}
      >
        <View style={StylesPublie.header}>
          <TouchableOpacity
            style={StylesPublie.backButton}
            onPress={handlePreviousStep}
            disabled={currentStep === 1}
          >
            <MaterialIcon
              name="arrow-back"
              size={24}
              color={currentStep === 1 ? Colors.textLight : Colors.textDark}
            />
          </TouchableOpacity>

          <View style={UtilityStyles.flex}>
            <Text style={StylesPublie.headerTitle}>Créer une publication</Text>
            <Text style={StylesPublie.headerSubtitle}>
              Étape {currentStep} sur {steps.length}
            </Text>
          </View>

          <TouchableOpacity
            style={StylesPublie.closeButton}
            onPress={() =>
              Alert.alert('Annuler', 'Voulez-vous annuler la création ?')
            }
          >
            <MaterialIcon name="close" size={24} color={Colors.textDark} />
          </TouchableOpacity>
        </View>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <ScrollView
          style={StylesPublie.content}
          showsVerticalScrollIndicator={false}
        >
          {renderCurrentPage()}
        </ScrollView>

        <View style={StylesPublie.footer}>
          {currentStep === 4 ? (
            <TouchableOpacity
              style={[
                StylesPublie.publishButton,
                loading && StylesPublie.buttonDisabled,
              ]}
              onPress={handlePublish}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcon name="publish" size={20} color="#FFFFFF" />
                  <Text style={StylesPublie.publishButtonText}>Publier</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={StylesPublie.nextButton}
              onPress={handleNextStep}
            >
              <Text style={StylesPublie.nextButtonText}>Continuer</Text>
              <MaterialIcon name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      {showDateStart && (
        <View>
          <DateTimePicker
            value={dateStart}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateStartChange}
            minimumDate={new Date()}
          />
          <DateTimePicker
            value={dateStart}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateStartChange}
            minimumDate={new Date()}
          />
        </View>
      )}

      {showDateEnd && (
        <View>
          <DateTimePicker
            value={dateEnd}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateEndChange}
            minimumDate={dateStart || new Date()}
          />
          <DateTimePicker
            value={dateEnd}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateEndChange}
            minimumDate={dateStart || new Date()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Publie;
