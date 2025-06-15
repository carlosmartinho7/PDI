import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import EventDetailsScreen from './screens/EventDetails';
import ProfileScreen from './screens/ProfileScreen';
import MyComents from './screens/MyComents';
import ComentariosEventoScreen from './screens/ComentariosEventos';
import MeusEventos from './screens/MeusEventos';
import MinhasAvaliacoesScreen from './screens/MinhasAvaliacoes';
import ForgotPasswordScreen from './screens/ForgotPassword';
import RegisterScreen from './screens/RegisterScreen';
import FavoritosCalendario from './screens/FavoritosCalendario';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="UserProfile" component={ProfileScreen} />
        <Stack.Screen name="MeusComentarios" component={MyComents} />
        <Stack.Screen name="ComentariosEventos" component={ComentariosEventoScreen} />
        <Stack.Screen name="MeusEventos" component={MeusEventos} />
        <Stack.Screen name="MinhasAvaliacoes" component={MinhasAvaliacoesScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="FavoritosCalendario" component={FavoritosCalendario} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
