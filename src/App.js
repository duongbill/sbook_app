import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import TestScreen from './test/testScreens/TestScreen';

export default function App() {
  return (
    <TestScreen />
  );
  // return (
  //   <NavigationContainer>
  //     <AuthStack />
  //   </NavigationContainer>
  // );
}