import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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



