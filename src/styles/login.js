// styles/login.js
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index';

const { width, height } = Dimensions.get('window');

const StylesLogin = StyleSheet.create({
  // Overlay
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  blurContainer: {
    flex: 1,
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: height,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },

  logoGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Carte principale
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(106, 17, 203, 0.1)',
  },

  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },

  // Formulaire Email
  formContainer: {
    marginTop: 8,
  },

  inputGroup: {
    marginBottom: 28,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E8ECF4',
    paddingHorizontal: 18,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  inputError: {
    borderColor: colors.error,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: '#333',
    height: '100%',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  errorText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 6,
    marginLeft: 4,
  },

  hintText: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
    marginLeft: 4,
  },

  // Boutons
  primaryButton: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 24,
  },

  verifyButton: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#00B09B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 8,
  },

  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 19,
    paddingHorizontal: 24,
  },

  buttonIcon: {
    marginRight: 12,
  },

  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },

  verifyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  // Loading
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loadingSpinner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5,
    borderColor: '#FFF',
    borderTopColor: 'transparent',
    marginRight: 12,
  },

  // Connexion rapide
  quickLogin: {
    marginTop: 8,
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8ECF4',
  },

  separatorText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '600',
  },

  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },

  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8ECF4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // OTP Section
  otpContainer: {
    marginTop: 8,
  },

  otpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 28,
  },

  otpInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  otpInput: {
    width: 50,
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E8ECF4',
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(106, 17, 203, 0.05)',
  },

  otpInputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ scale: 1.05 }],
  },

  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  timerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  resendText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  footerText: {
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
  },

  footerLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

// Animation pour le loading spinner
const spinAnimation = {
  0: {
    transform: [{ rotate: '0deg' }],
  },
  100: {
    transform: [{ rotate: '360deg' }],
  },
};

export default StylesLogin;
