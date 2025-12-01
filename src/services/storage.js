import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
export const setItem = async (value, object) => {
    try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(object, jsonValue);
    console.log('Données utilisateur stockées avec succès.');
  } catch (e) {
    console.error("Erreur lors de l'enregistrement :", e);
  }
    
};
export const getItem = async(object) => {
    try {
    const jsonValue = await AsyncStorage.getItem(object);
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.error("Erreur lors de la lecture :", e);
    return null;
  }
}
export const removeItem = async(object) => {
    try {
    await AsyncStorage.removeItem(object);
    console.log('Clé utilisateur supprimée.');
  } catch(e) {
    console.error("Erreur lors de la suppression :", e);
  }
}

export const saveAuthToken = async (userIdentifier, token) => {
  try {
    await Keychain.setGenericPassword(userIdentifier, token);
    console.log('Token d’authentification stocké avec succès.');
    return true;
  } catch (error) {
    console.error("Échec de l'enregistrement du token :", error);
    return false;
  }
}

export const getAuthToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      console.log('Token récupéré.');
      return credentials.password; 
    } else {
      console.log('Aucun token trouvé.');
      return null;
    }
  } catch (error) {
    console.error("Échec de la récupération du token :", error);
    return null;
  }
}

export const deleteAuthToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token supprimé pour la déconnexion.');
    return true;
  } catch (error) {
    console.error("Échec de la suppression du token :", error);
    return false;
  }
}

