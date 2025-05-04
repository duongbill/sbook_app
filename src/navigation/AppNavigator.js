import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import CustomerTabNavigator from './CustomerTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import BookDetailScreen from '../screens/book/BookDetailScreen';
import ModeScreen from '../screens/user/ModeScreen';

const RootStack = createStackNavigator();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <RootStack.Screen name="Auth" component={AuthStack} />
        ) : (
          <RootStack.Screen name="Customer" component={CustomerTabNavigator} />
        )}

        {/* Màn hình dùng chung toàn app */}
        <RootStack.Screen name="BookDetail" component={BookDetailScreen} options={{tabBarStyle: { display: 'none' }}}/>
        <RootStack.Screen name="Mode" component={ModeScreen} options={{tabBarStyle: { display: 'none' }}}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
