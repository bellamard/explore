import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
        fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    bestSitesSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        fontFamily: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(74, 111, 165, 0.1)',
        borderRadius: 16,
    },
    viewAllText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4A6FA5',
        marginRight: 4,
    },
    carouselContainer: {
        marginBottom: 20,
    },
    carouselContent: {
        paddingHorizontal: 20,
    },
    carouselItem: {
        width: width * 0.8,
        marginRight: 16,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    paginationDot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4A6FA5',
        marginHorizontal: 4,
    },
    provincesContainer: {
        marginBottom: 30,
    },
    provincesList: {
        paddingHorizontal: 20,
    },
    seeAll: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4A6FA5',
    },
    allSitesContainer: {
        marginBottom: 30,
    },
    allSitesList: {
        paddingHorizontal: 20,
    },
    siteItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    siteImageContainer: {
        height: 180,
        position: 'relative',
    },
    siteImage: {
        width: '100%',
        height: '100%',
    },
    siteImageGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
    },
    siteBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    siteType: {
        fontSize: 10,
        fontWeight: '600',
        color: '#4A6FA5',
        textTransform: 'uppercase',
    },
    siteRating: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 4,
    },
    siteInfo: {
        padding: 16,
    },
    siteTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    siteLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationText: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 6,
        flex: 1,
    },
    siteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sitePrice: {
        fontSize: 12,
        color: '#666666',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4A6FA5',
    },
    bookButton: {
        backgroundColor: '#4A6FA5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    bookButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomSpacer: {
        height: 100,
    },
});

export default styles;