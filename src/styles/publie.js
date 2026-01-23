// styles/publie.js
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Typography, Shadows, BorderRadius, Spacing } from './logement';

const { width, height } = Dimensions.get('window');

// --- STYLES COMPOSANT PUBLIE ---
export const StylesPublie = StyleSheet.create({
  // --- Layout de Base ---
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? Spacing.md : Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    ...Shadows.small,
  },
  headerTitle: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.textDark,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  // --- Indicateur d'Étapes ---
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  stepItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
    ...Shadows.small,
  },
  stepNumber: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textLight,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: Colors.white,
  },
  stepLabel: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textLight,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: Colors.textDark,
    fontWeight: '600',
  },
  stepLine: {
    width: 10,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs,
    marginBottom: 12,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },

  // --- Contenu Principal ---
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  // --- Sections et Groupes ---
  sectionTitle: {
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.textDark,
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight,
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  subLabel: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textLight,
    marginBottom: Spacing.md,
  },

  // --- Inputs ---
  input: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.primary,
    ...Shadows.small,
  },
  textArea: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: Spacing.xs,
  },

  // --- Dropdown ---
  dropdownBtn: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
  },
  dropdownBtnText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  dropdownStyle: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginTop: 2,
    ...Shadows.medium,
  },
  dropdownRow: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    height: 44,
  },
  dropdownRowText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    textAlign: 'left',
  },

  // --- Cartes de Sélection ---
  publicationCard: {
    width: 100,
    height: 100,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    ...Shadows.small,
  },
  publicationCardSelected: {
    borderWidth: 2,
    ...Shadows.medium,
  },
  publicationIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  publicationCardText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textDark,
    fontWeight: '600',
    textAlign: 'center',
  },

  // --- Gestion des Images ---
  addPhotoButton: {
    height: 120,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primaryTransparent || 'rgba(79, 70, 229, 0.1)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  addPhotoText: {
    fontSize: Typography.body.fontSize,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.md,
  },
  removeIconContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...Shadows.small,
  },
  imageListContainer: {
    paddingVertical: Spacing.sm,
  },

  // --- Listes de Types ---
  typeListContainer: {
    paddingVertical: Spacing.sm,
  },
  typeCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  typeCardSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  typeCardText: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textDark,
    fontWeight: '500',
  },
  typeCardTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  typeGrid: {
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  // --- Billeterie ---
  billeterieListContainer: {
    paddingVertical: Spacing.sm,
  },
  billeterieCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    marginRight: Spacing.md,
    ...Shadows.small,
  },
  billeterieCardSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadows.medium,
  },
  billeterieCardText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    fontWeight: '600',
  },
  billeterieCardTextSelected: {
    color: Colors.white,
  },

  // --- Dates ---
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  dateButtonText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    flex: 1,
    marginLeft: Spacing.sm,
  },

  // --- Input avec Icône ---
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },

  // --- Détection Carte/Opérateur ---
  cardTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  cardTypeText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textDark,
    fontWeight: '600',
    marginLeft: 4,
  },
  operatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  operatorText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
    marginLeft: 4,
  },

  // --- Box d'Information ---
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight || '#D1FAE5',
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
  },
  infoText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    flex: 1,
    marginLeft: Spacing.md,
  },

  // --- Prévisualisation ---
  previewCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
    marginBottom: Spacing.xl,
  },
  previewImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.borderLight,
  },
  previewContent: {
    padding: Spacing.lg,
  },
  previewTitle: {
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  previewDescription: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  previewDetails: {
    marginTop: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },

  // --- Résumé ---
  summarySection: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  summaryTitle: {
    fontSize: Typography.titleLarge?.fontSize || 16,
    fontWeight: Typography.titleLarge?.fontWeight || '600',
    color: Colors.textDark,
    marginBottom: Spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  summaryLabel: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: Typography.body.fontSize,
    color: Colors.textDark,
    fontWeight: '600',
  },

  // --- Footer ---
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    ...Shadows.medium,
    marginBottom: Spacing.xxl,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    ...Shadows.button,
  },
  nextButtonText: {
    fontSize: Typography.buttonLarge?.fontSize || 16,
    fontWeight: Typography.buttonLarge?.fontWeight || '700',
    color: Colors.white,
    marginRight: Spacing.sm,
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    ...Shadows.button,
  },
  publishButtonText: {
    fontSize: Typography.buttonLarge?.fontSize || 16,
    fontWeight: Typography.buttonLarge?.fontWeight || '700',
    color: Colors.white,
    marginRight: Spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },

  // --- États ---
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: Typography.bodyLarge?.fontSize || 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.lg,
    maxWidth: '80%',
  },

  // --- Divider ---
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
});

// --- STYLES UTILITAIRES SPÉCIFIQUES ---
export const PublieUtilityStyles = StyleSheet.create({
  // Layout
  formContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  formSection: {
    marginBottom: Spacing.xl,
  },

  // Validation
  errorText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  successText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.success,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  warningText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.warning,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },

  // Badges
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  badgePrimary: {
    backgroundColor: Colors.primaryLight,
  },
  badgeSuccess: {
    backgroundColor: Colors.successLight || '#D1FAE5',
  },
  badgeWarning: {
    backgroundColor: Colors.warningLight || '#FEF3C7',
  },
  badgeError: {
    backgroundColor: Colors.errorLight || '#FEE2E2',
  },

  // Loaders
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loaderText: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },

  // Price Display
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: Typography.h3.fontSize,
    color: Colors.primary,
    fontWeight: '700',
  },
  priceCurrency: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  pricePeriod: {
    fontSize: Typography.bodySmall.fontSize,
    color: Colors.textLight,
    marginLeft: 4,
  },

  // Required Indicator
  required: {
    color: Colors.error,
    marginLeft: 2,
  },
});

// --- EXPORT PRINCIPAL ---
export default StylesPublie;
