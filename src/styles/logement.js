// styles/logement.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.7;

// --- PALETTE DE COULEURS HARMONISÉE ---
export const Colors = {
  primary: '#4F46E5', // Indigo vif (Action)
  primaryLight: '#EEF2FF', // Indigo très clair
  secondary: '#7C3AED', // Violet
  success: '#10B981', // Vert
  error: '#EF4444', // Rouge
  errorLight: '#FEE2E2', // Rouge clair
  warning: '#F59E0B', // Orange
  background: '#F9FAFB', // Arrière-plan global
  backgroundLight: '#F3F4F6', // Fond plus clair
  white: '#FFFFFF', // Blanc pur
  black: '#000000', // Noir
  textDark: '#1E293B', // Texte foncé
  textSecondary: '#64748B', // Texte secondaire
  textLight: '#94A3B8', // Texte léger
  placeholder: '#A1A1AA', // Placeholders
  border: '#E2E8F0', // Bordures normales
  borderLight: '#F1F5F9', // Bordures légères
  star: '#FFD700', // Or pour étoiles
  starEmpty: '#D3D3D3', // Gris pour étoiles vides
};

// --- TYPOGRAPHIE ---
export const Typography = {
  h1: { fontSize: 28, fontWeight: '900', lineHeight: 34, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '800', lineHeight: 30, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '700', lineHeight: 26, letterSpacing: -0.2 },
  h4: { fontSize: 18, fontWeight: '700', lineHeight: 24, letterSpacing: -0.1 },
  titleLarge: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  title: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  bodySmall: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  caption: { fontSize: 11, fontWeight: '400', lineHeight: 14 },
  buttonLarge: { fontSize: 16, fontWeight: '700', lineHeight: 20 },
  button: { fontSize: 14, fontWeight: '600', lineHeight: 18 },
  input: { fontSize: 16, fontWeight: '400', lineHeight: 20 },
};

// --- BORDS ARRONDIS ---
export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  round: 999,
  card: 16,
  modal: 20,
  button: {
    sm: 20,
    md: 24,
    lg: 28,
    round: 999,
  },
  input: {
    sm: 8,
    md: 12,
    lg: 16,
  },
};

// --- OMBRES ET EFFETS ---
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  xlarge: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  card: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  button: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inner: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 0,
  },
};

// --- ESPACEMENTS ---
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  screen: {
    horizontal: 20,
    vertical: 16,
  },
  section: {
    vertical: 24,
  },
  card: {
    padding: 16,
    margin: 12,
  },
};

// --- STYLES UTILITAIRES ---
export const UtilityStyles = StyleSheet.create({
  // Flex Utilities
  flex: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  flexWrap: { flexWrap: 'wrap' },
  flexNoWrap: { flexWrap: 'nowrap' },

  // Alignment
  itemsCenter: { alignItems: 'center' },
  itemsStart: { alignItems: 'flex-start' },
  itemsEnd: { alignItems: 'flex-end' },
  itemsStretch: { alignItems: 'stretch' },
  justifyCenter: { justifyContent: 'center' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },

  // Spacing
  gapXs: { gap: Spacing.xs },
  gapSm: { gap: Spacing.sm },
  gapMd: { gap: Spacing.md },
  gapLg: { gap: Spacing.lg },
  gapXl: { gap: Spacing.xl },

  // Margins
  mXs: { margin: Spacing.xs },
  mSm: { margin: Spacing.sm },
  mMd: { margin: Spacing.md },
  mLg: { margin: Spacing.lg },
  mXl: { margin: Spacing.xl },

  mtXs: { marginTop: Spacing.xs },
  mtSm: { marginTop: Spacing.sm },
  mtMd: { marginTop: Spacing.md },
  mtLg: { marginTop: Spacing.lg },
  mtXl: { marginTop: Spacing.xl },

  mbXs: { marginBottom: Spacing.xs },
  mbSm: { marginBottom: Spacing.sm },
  mbMd: { marginBottom: Spacing.md },
  mbLg: { marginBottom: Spacing.lg },
  mbXl: { marginBottom: Spacing.xl },

  mlXs: { marginLeft: Spacing.xs },
  mlSm: { marginLeft: Spacing.sm },
  mlMd: { marginLeft: Spacing.md },
  mlLg: { marginLeft: Spacing.lg },
  mlXl: { marginLeft: Spacing.xl },

  mrXs: { marginRight: Spacing.xs },
  mrSm: { marginRight: Spacing.sm },
  mrMd: { marginRight: Spacing.md },
  mrLg: { marginRight: Spacing.lg },
  mrXl: { marginRight: Spacing.xl },

  mxXs: { marginHorizontal: Spacing.xs },
  mxSm: { marginHorizontal: Spacing.sm },
  mxMd: { marginHorizontal: Spacing.md },
  mxLg: { marginHorizontal: Spacing.lg },
  mxXl: { marginHorizontal: Spacing.xl },

  myXs: { marginVertical: Spacing.xs },
  mySm: { marginVertical: Spacing.sm },
  myMd: { marginVertical: Spacing.md },
  myLg: { marginVertical: Spacing.lg },
  myXl: { marginVertical: Spacing.xl },

  // Paddings
  pXs: { padding: Spacing.xs },
  pSm: { padding: Spacing.sm },
  pMd: { padding: Spacing.md },
  pLg: { padding: Spacing.lg },
  pXl: { padding: Spacing.xl },

  ptXs: { paddingTop: Spacing.xs },
  ptSm: { paddingTop: Spacing.sm },
  ptMd: { paddingTop: Spacing.md },
  ptLg: { paddingTop: Spacing.lg },
  ptXl: { paddingTop: Spacing.xl },

  pbXs: { paddingBottom: Spacing.xs },
  pbSm: { paddingBottom: Spacing.sm },
  pbMd: { paddingBottom: Spacing.md },
  pbLg: { paddingBottom: Spacing.lg },
  pbXl: { paddingBottom: Spacing.xl },

  plXs: { paddingLeft: Spacing.xs },
  plSm: { paddingLeft: Spacing.sm },
  plMd: { paddingLeft: Spacing.md },
  plLg: { paddingLeft: Spacing.lg },
  plXl: { paddingLeft: Spacing.xl },

  prXs: { paddingRight: Spacing.xs },
  prSm: { paddingRight: Spacing.sm },
  prMd: { paddingRight: Spacing.md },
  prLg: { paddingRight: Spacing.lg },
  prXl: { paddingRight: Spacing.xl },

  pxXs: { paddingHorizontal: Spacing.xs },
  pxSm: { paddingHorizontal: Spacing.sm },
  pxMd: { paddingHorizontal: Spacing.md },
  pxLg: { paddingHorizontal: Spacing.lg },
  pxXl: { paddingHorizontal: Spacing.xl },

  pyXs: { paddingVertical: Spacing.xs },
  pySm: { paddingVertical: Spacing.sm },
  pyMd: { paddingVertical: Spacing.md },
  pyLg: { paddingVertical: Spacing.lg },
  pyXl: { paddingVertical: Spacing.xl },

  // Text Alignment
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  textJustify: { textAlign: 'justify' },

  // Text Styles
  textXs: { ...Typography.caption },
  textSm: { ...Typography.bodySmall },
  textMd: { ...Typography.body },
  textLg: { ...Typography.bodyLarge },
  textXl: { ...Typography.h4 },
  text2Xl: { ...Typography.h3 },
  text3Xl: { ...Typography.h2 },
  text4Xl: { ...Typography.h1 },

  textLight: { color: Colors.textLight },
  textSecondary: { color: Colors.textSecondary },
  textPrimary: { color: Colors.textPrimary },
  textDark: { color: Colors.textDark },
  textWhite: { color: Colors.white },
  textPrimaryColor: { color: Colors.primary },
  textSuccess: { color: Colors.success },
  textError: { color: Colors.error },
  textWarning: { color: Colors.warning },
  textInfo: { color: Colors.info },

  fontWeightNormal: { fontWeight: '400' },
  fontWeightMedium: { fontWeight: '500' },
  fontWeightSemibold: { fontWeight: '600' },
  fontWeightBold: { fontWeight: '700' },
  fontWeightBlack: { fontWeight: '900' },

  // Borders
  border: { borderWidth: 1, borderColor: Colors.border },
  borderLight: { borderWidth: 1, borderColor: Colors.borderLight },
  borderDark: { borderWidth: 1, borderColor: Colors.borderDark },
  borderPrimary: { borderWidth: 1, borderColor: Colors.primary },
  borderError: { borderWidth: 1, borderColor: Colors.error },

  borderTop: { borderTopWidth: 1, borderTopColor: Colors.borderLight },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: Colors.borderLight },
  borderRight: { borderRightWidth: 1, borderRightColor: Colors.borderLight },

  // Border Radius
  roundedXs: { borderRadius: BorderRadius.xs },
  roundedSm: { borderRadius: BorderRadius.sm },
  roundedMd: { borderRadius: BorderRadius.md },
  roundedLg: { borderRadius: BorderRadius.lg },
  roundedXl: { borderRadius: BorderRadius.xl },
  rounded2Xl: { borderRadius: BorderRadius['2xl'] },
  rounded3Xl: { borderRadius: BorderRadius['3xl'] },
  roundedFull: { borderRadius: BorderRadius.round },

  // Backgrounds
  bgTransparent: { backgroundColor: 'transparent' },
  bgWhite: { backgroundColor: Colors.white },
  bgSurface: { backgroundColor: Colors.surface },
  bgBackground: { backgroundColor: Colors.background },
  bgPrimary: { backgroundColor: Colors.primary },
  bgPrimaryLight: { backgroundColor: Colors.primaryLight },
  bgSecondary: { backgroundColor: Colors.secondary },
  bgSuccess: { backgroundColor: Colors.success },
  bgError: { backgroundColor: Colors.error },
  bgWarning: { backgroundColor: Colors.warning },
  bgInfo: { backgroundColor: Colors.info },

  // Shadows
  shadowNone: { ...Shadows.none },
  shadowSubtle: { ...Shadows.subtle },
  shadowSmall: { ...Shadows.small },
  shadowMedium: { ...Shadows.medium },
  shadowLarge: { ...Shadows.large },
  shadowXlarge: { ...Shadows.xlarge },
  shadowCard: { ...Shadows.card },
  shadowButton: { ...Shadows.button },

  // Dimensions
  wFull: { width: '100%' },
  hFull: { height: '100%' },
  wScreen: { width: width },
  hScreen: { height: height },

  // Positioning
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  top0: { top: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },
  inset0: { top: 0, bottom: 0, left: 0, right: 0 },

  // Opacity
  opacity0: { opacity: 0 },
  opacity25: { opacity: 0.25 },
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },
  opacity100: { opacity: 1 },

  // Z-Index
  z0: { zIndex: 0 },
  z10: { zIndex: 10 },
  z20: { zIndex: 20 },
  z30: { zIndex: 30 },
  z40: { zIndex: 40 },
  z50: { zIndex: 50 },
  zAuto: { zIndex: 'auto' },
});

// --- STYLES COMPOSANTS PRINCIPAUX ---
export const StylesLogement = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // --- Header/Search ---
  safeArea: {
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    backgroundColor: Colors.background,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 15,
  },
  greetingText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textDark,
  },
  notificationButton: {
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    ...Shadows.medium,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 12,
    color: Colors.primary,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: Colors.placeholder,
    fontWeight: '600',
  },
  separator: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
    marginHorizontal: 15,
  },
  filterButton: {
    padding: 5,
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
  },

  // --- Types de Logement ---
  typeSection: {
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  typeListContainer: {
    paddingHorizontal: 15,
  },
  typeWrapper: {
    marginRight: 10,
    paddingVertical: 5,
  },
  typeContainerInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  typeIconInactive: {
    color: Colors.textSecondary,
  },
  typeTextInactive: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  typeContainerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
  },
  typeIconActive: {
    color: Colors.white,
  },
  typeTextActive: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },

  // --- Site Card ---
  containerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
    marginHorizontal: (width - CARD_WIDTH) / 2,
    borderRadius: 16,
    ...Shadows.large,
    overflow: 'hidden',
  },
  cardsite: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  starFilled: {
    color: Colors.star,
    marginHorizontal: 1,
  },
  starEmpty: {
    color: Colors.starEmpty,
    marginHorizontal: 1,
  },
  ratingText: {
    color: Colors.textDark,
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 8,
  },
  logementName: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  priceText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  // --- Résultats et Feedback ---
  resultSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultCountText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
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

  // --- Modal de Recherche ---
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchModalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    height: '90%',
    ...Shadows.large,
  },
  searchModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  searchModalTitle: {
    ...Typography.h3,
    color: Colors.textDark,
    flex: 1,
  },
  closeButton: {
    padding: 8,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.round,
    ...Shadows.small,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  searchInputWrapper2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon2: {
    marginRight: 10,
  },
  searchTextInput: {
    flex: 1,
    ...Typography.bodyLarge,
    color: Colors.textDark,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.round,
  },
  searchActionButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    ...Shadows.medium,
  },
  searchActionText: {
    ...Typography.button,
    color: Colors.white,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    ...Typography.bodySmall,
    color: Colors.textDark,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: Colors.white,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  suggestionsTitle: {
    ...Typography.h4,
    color: Colors.textDark,
  },
  clearHistoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.errorLight,
    borderRadius: BorderRadius.sm,
  },
  clearHistoryText: {
    ...Typography.caption,
    color: Colors.error,
    fontWeight: '600',
  },
  suggestionsList: {
    flex: 1,
  },
  suggestionsListContent: {
    paddingBottom: 30,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  suggestionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    ...Typography.body,
    color: Colors.textDark,
    fontWeight: '600',
    marginBottom: 2,
  },
  suggestionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  suggestionArrow: {
    marginLeft: 10,
  },
  emptySuggestionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 15,
    opacity: 0.5,
  },
  emptyTitle: {
    ...Typography.h4,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
  suggestionsFooter: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    marginTop: 10,
  },
  suggestionsFooterText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    textAlign: 'center',
  },

  // --- Layout ---
  boxListLogement: {
    flex: 1,
    marginBottom: height * 0.13,
  }, //

  // --- Modal de Filtres (Nouveaux Styles pour l'UX) ---
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  resetButtonText: {
    color: Colors.error,
    fontSize: 15,
    fontWeight: '600',
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 10,
  },
  slider: {
    height: 40,
  },
  ratingSelectorContainer: {
    paddingVertical: 10,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  starButton: {
    padding: 5,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12, // Légèrement plus arrondi
    alignItems: 'center',
    marginTop: 25,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800', // Plus audacieux
  },
  closeButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
  },
});
