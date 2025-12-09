import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const Colors = {
  // Teintes ajustées pour une esthétique moderne
  primary: '#4F46E5', // Bleu Vif (Accent)
  primaryDark: '#1E293B', // Couleur sombre pour les titres
  textSecondary: '#64748B', // Gris ardoise pour les textes secondaires
  backgroundLight: '#F9FAFB',
  white: '#FFFFFF',
  placeholder: '#A1A1AA', // Gris plus doux pour le placeholder
};

const StylesHeaderLogement = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.backgroundLight,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 25, // Augmenté pour l'espace sous la barre flottante
    backgroundColor: Colors.backgroundLight,
  },

  // --- 1. Top Row ---
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25, // Augmenté pour la séparation
    paddingTop: 15, // Plus d'espace en haut
  },
  greetingText: {
    fontSize: 15, // Légèrement augmenté
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  mainTitle: {
    fontSize: 26, // Augmenté pour l'impact
    fontWeight: '800', // Plus gras
    color: Colors.primaryDark, // Couleur sombre élégante
  },
  notificationButton: {
    padding: 5,
    // Ajouter un fond pour que le bouton ressorte subtilement
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  // --- 2. Floating Search Bar ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingVertical: 12, // Augmenté pour la hauteur
    paddingHorizontal: 18, // Augmenté pour le padding intérieur

    // OMBRE AMÉLIORÉE (plus douce et plus diffuse)
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1, // Subtil
    shadowRadius: 15, // Diffus
    elevation: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 12, // Plus d'espace
    color: Colors.primary, // Couleur de l'accentuation sur l'icône
  },
  searchPlaceholder: {
    fontSize: 16,
    color: Colors.placeholder,
    fontWeight: '600',
  },

  separator: {
    width: 1,
    height: 28, // Augmenté pour correspondre à la nouvelle hauteur
    backgroundColor: '#E5E7EB',
    marginHorizontal: 15,
  },

  filterButton: {
    padding: 5,
    // Style du bouton de filtre pour le rendre visible et cliquable
    backgroundColor: '#F1F5F9', // Couleur d'arrière-plan très claire
    borderRadius: 20,
  },
});

export default StylesHeaderLogement;
