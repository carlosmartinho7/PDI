import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import EventDetailsScreen from './screens/EventDetails';
import ProfileScreen from './screens/ProfileScreen';
import MyComents from './screens/MyComents';
import MeusEventos from './screens/MeusEventos';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  EventDetails: {  eventId: string };
  UserProfile: undefined;
  MeusComentarios:undefined;
  MeusEventos:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="UserProfile" component={ProfileScreen} />
        <Stack.Screen name="MeusComentarios" component={MyComents} />
        <Stack.Screen name="MeusEventos" component={MeusEventos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 