/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainRoutes from './src/routes/MainRoutes';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
  return (
    <SafeAreaProvider      
    >
    <NavigationContainer>
       <StatusBar hidden={true} />
       <MainRoutes />
    </NavigationContainer>
    </SafeAreaProvider>);
};
      
export default App;