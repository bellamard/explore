import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Logements from '../screens/logement';
import Evenements from '../screens/evenements';
import Publie from '../screens/publie';
import Sites from '../screens/Sites';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const DashRoutes = () => {
  // Configuration simple de la tab bar
  const tabBarStyle = {
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 45,
    margingHorizontal: 0,
    borderRadius: 50,
    height: Platform.select({ ios: 85, android: 70 }),
    paddingBottom: Platform.select({ android: 10 }),
    paddingTop: 10,
    position: 'absolute',
    paddingHorizontal: 10,
  };

  // Style pour l'onglet central (Publie)
  const centralTabBarStyle = {
    ...tabBarStyle,

    paddingHorizontal: 10,
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const isPublieTab = route.name === 'Publie';

        return {
          // Pas d'en-tête
          headerShown: false,

          // Style de la tab bar
          tabBarStyle: isPublieTab ? centralTabBarStyle : tabBarStyle,

          // Couleurs
          tabBarActiveTintColor: '#4A6FA5',
          tabBarInactiveTintColor: '#8E8E93',

          // Labels
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginBottom: Platform.select({ android: 5 }),
          },

          // Icônes
          tabBarIcon: ({ focused, color }) => {
            // Configuration des icônes
            let iconName;
            let iconSize = 22;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Logements':
                iconName = 'bed';
                break;
              case 'Evenements':
                iconName = 'calendar';
                break;
              case 'Publie':
                iconName = 'plus';
                iconSize = 28;
                break;
              case 'Sites':
                iconName = 'map-marker';
                break;
              default:
                iconName = 'circle';
            }

            // Onglet central spécial
            if (isPublieTab) {
              return (
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: focused ? '#4A6FA5' : '#6C757D',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: -20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                  }}
                >
                  <Icon name={iconName} size={iconSize} color="#FFFFFF" />
                </View>
              );
            }

            // Onglets normaux
            return (
              <View style={{ alignItems: 'center' }}>
                <Icon name={iconName} size={iconSize} color={color} />
                {focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: color,
                      marginTop: 4,
                    }}
                  />
                )}
              </View>
            );
          },
        };
      }}
      // Style du contenu
      sceneContainerStyle={{
        backgroundColor: '#F8F9FA',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Logements" component={Logements} />
      <Tab.Screen
        name="Publie"
        component={Publie}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 15,
            marginBottom: 5,
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 10,
            height: 70,
          },
        }}
      />
      <Tab.Screen name="Evenements" component={Evenements} />

      <Tab.Screen name="Sites" component={Sites} />
    </Tab.Navigator>
  );
};

export default DashRoutes;
