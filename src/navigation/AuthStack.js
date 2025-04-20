import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import AdminTabNavigator from './AdminTabNavigator';
import CustomerTabNavigator from './CustomerTabNavigator';
import ModeScreen from '../screens/user/ModeScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AdminTab" component={AdminTabNavigator} />
      <Stack.Screen name="CustomerTab" component={CustomerTabNavigator} />
      <Stack.Screen name="Mode" component={ModeScreen} options={{tabBarStyle: { display: 'none' }}}/>

    </Stack.Navigator>
  );
}
