import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Launch from '../screens/launch';
import DashRoutes from './DashRoutes';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Launch"
        component={Launch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dash"
        component={DashRoutes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default MainRoutes;
