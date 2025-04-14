import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import AdminTabNavigator from './AdminTabNavigator';
import CustomerTabNavigator from './CustomerTabNavigator';

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Lấy token
        const token = await AsyncStorage.getItem('accessToken');

        // Lấy role và parse thành mảng nếu có
        const roleString = await AsyncStorage.getItem('role');
        let parsedRole = null;
        if (roleString) {
          try {
            parsedRole = JSON.parse(roleString);
          } catch (error) {
            console.error("Lỗi parse role:", error);
          }
        }

        // Cập nhật state
        setUserToken(token);
        setUserRole(parsedRole);

        // Log thông tin sau khi lấy được dữ liệu
        console.log("Token:", token, "Role:", parsedRole);
      } catch (e) {
        console.error('Error restoring token:', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
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
      {userToken == null ? (
        <AuthStack />
      ) : (Array.isArray(userRole) && userRole.includes("ADMIN")) ? (
        <AdminTabNavigator />
      ) : (
        <CustomerTabNavigator />
      )}
    </NavigationContainer>
  );
}
