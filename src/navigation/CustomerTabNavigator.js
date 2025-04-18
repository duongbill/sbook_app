import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from '../screens/user/CustomerScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import SettingStackNavigator from './SettingStackNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MyBookScreen from '../screens/user/MyBookScreen';

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Customer';

  if (routeName === 'Mode') {
    return 'none';
  }
  return 'flex';
}

export default function CustomerTabNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Trang Chủ':
              iconName = 'home-outline';
              break;
            case 'Cài đặt':
              iconName = 'settings-outline';
              break;
            case 'Sách của tôi':
              iconName = 'book-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          marginLeft: 18,
          marginRight: 18,
          marginBottom: 14,
          elevation: 5,
          backgroundColor: theme.colors.bottomTabColor,
          borderRadius: 20,
          height: 65,
          paddingBottom: 10,
          borderTopWidth: 0, // bỏ viền
          display: getTabBarVisibility(route),
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 6,
          paddingBottom: 6,
        },
      })}
    >
      <Tab.Screen name="Trang Chủ" component={CustomerScreen} />
      <Tab.Screen name="Sách của tôi" component={MyBookScreen} />
      <Tab.Screen name="Cài đặt" component={SettingStackNavigator}/>
    </Tab.Navigator>
  );
}
