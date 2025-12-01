import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const colors = {
  // Couleurs principales
  primary: '#f7c447',
  primaryLight: '#5abdd4',
  primaryLighter: '#003944',
  primaryBorder: '#094456',

  // Couleurs de base
  background: '#fef7f0',
  white: '#ffffff',
  black: '#0e3e54',

  // Couleurs de texte
  text: '#333333',
  textLight: '#666666',
  textLighter: '#999999',

  // Couleurs sémantiques
  success: '#27AE60',
  successLight: 'rgba(39, 174, 96, 0.1)',
  warning: '#E74C3C',
  warningLight: 'rgba(231, 76, 60, 0.1)',
  info: '#3498DB',
  infoLight: 'rgba(52, 152, 219, 0.1)',
  error: '#ff4757',
  errorLight: 'rgba(255, 71, 87, 0.1)',

  // Couleurs secondaires
  secondary: '#35966d',
  accent: '#0a6b64',
};

const Styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle: 'italic',
    color: colors.primary,
    textShadowColor: colors.primaryBorder, // Utilisation de textShadow pour une meilleure compatibilité
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    elevation: 5,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  bottomTitle: {
    fontSize: 14,
    fontWeight: '600', // Un peu plus lisible que 'light'
    color: colors.white, // Couleur plus visible sur l'image de fond
    textShadowColor: colors.black,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%', // Pour s'assurer que le centrage fonctionne
    alignItems: 'center',
    paddingBottom: 20, // Espace par rapport au bas
  },
});
export default Styles;
