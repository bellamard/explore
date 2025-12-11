import { StyleSheet } from 'react-native';

const Colors = {
  background: '#F9FAFB',
  textDark: '#1E293B',
  textSecondary: '#64748B',
};

const StylesLogement = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // --- Section Types de Logement ---
  typeSection: {
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  typeListContainer: {
    paddingHorizontal: 20, // Padding pour que les cartes commencent au bon endroit
  },

  // --- Section Résultats ---
  resultSection: {
    flex: 1, // Prend l'espace restant
    paddingHorizontal: 10,
  },
  resultCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20, // Espace en bas de la liste
    paddingHorizontal: 0,
  },

  // --- Feedback (Chargement/Erreur/Vide) ---
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  feedbackText: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  //
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // La modale apparaît par le bas
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan sombre transparent
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '80%', // Limite la hauteur
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#4F46E5', // Couleur d'action principale
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButtonText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
  },

  // Style pour les types rapides
  typeListContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  //
});

export default StylesLogement;
