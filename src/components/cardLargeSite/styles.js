import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const stylesAlt = StyleSheet.create({
    container: {
        width: width * 0.8,
        height: 320,
        borderRadius: 16,
        overflow: 'hidden',
        marginHorizontal: 8,
    },
    imageBackground: {
        flex: 1,
    },
    image: {
        borderRadius: 16,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    mainInfo: {
        marginTop: 'auto',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    location: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        fontWeight: '500',
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: 12,
        padding: 12,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    priceBox: {},
    priceLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '500',
        marginBottom: 2,
    },
    price: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    perDay: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    typeBox: {
        backgroundColor: 'rgba(74, 111, 165, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    type: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    hoverEffect: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
    },
});

export default stylesAlt;