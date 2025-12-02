// Fichier : ../styles/login.js (Styles Inspirés de Dribbble)
import { StyleSheet, Dimensions } from 'react-native';
import Styles, { colors } from '.';
const { width } = Dimensions.get('window');

// Couleurs inspirées par l'exemple
export const COLORS = colors;

const StylesLogin = StyleSheet.create({
  // --- NOUVEAUX STYLES DE FOND ---
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Fond très clair
  },

  // --- Header ---
  header: {
    alignItems: 'center',
    paddingHorizontal: 40,
    // Positionnement plus haut pour laisser la place à la carte flottante
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 90, // Plus petit et épuré
    height: 90,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary, // Gris doux
    textAlign: 'center',
    fontWeight: '400',
  },

  // --- Carte de Connexion (Flottante) ---
  boxinputWrapper: {
    marginHorizontal: 25,
    borderRadius: 30, // Très arrondis
    backgroundColor: COLORS.background,
    // Ombre portée forte pour l'effet "flottant"
    shadowColor: COLORS.primary, // Utiliser la couleur principale pour l'ombre
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 20,
    padding: 0, // Le padding se fera dans animatedContent
    marginTop: 10, // Rapproche la carte du header
  },

  animatedContent: {
    padding: 30,
    backgroundColor: 'transparent', // Le fond blanc est déjà dans boxinputWrapper
    borderRadius: 30,
  },

  bgImage: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
  },

  // --- Champs de Saisie (Minimaliste) ---
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2, // Souligné
    borderBottomColor: COLORS.placeholder,
    marginBottom: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: COLORS.text,
    paddingLeft: 0,
  },

  // --- Bouton (Plein & Moderne) ---
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 15, // Plus arrondi
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.card,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
  },

  // --- Social & Séparateur ---
  dividerText: {
    textAlign: 'center',
    marginVertical: 30,
    color: COLORS.placeholder,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  SocialIconBox: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, // Léger fond gris pour les icônes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  // --- OTP Spécifique ---
  infoText: {
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.placeholder,
    fontSize: 14,
    lineHeight: 22,
  },
  otpInputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  otpInput: {
    width: '60%',
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 10,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary, // Ligne de la couleur principale
    height: 50,
    color: COLORS.text,
    paddingVertical: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 5,
    textDecorationLine: 'none', // Retirer le soulignement pour un look plus moderne
  },
  backButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  backButtonText: {
    color: COLORS.placeholder,
    fontSize: 14,
    textDecorationLine: 'none',
  },
  icon: {
    marginRight: 10,
    color: '#007AFF',
  },
});

export default StylesLogin;
