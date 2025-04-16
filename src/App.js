import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
  );
  // return (
  //   <NavigationContainer>
  //     <AuthStack />
  //   </NavigationContainer>
  // );
}
