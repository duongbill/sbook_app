import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return <AppNavigator />;
  // return (
  //   <NavigationContainer>
  //     <AuthStack />
  //   </NavigationContainer>
  // );
}
