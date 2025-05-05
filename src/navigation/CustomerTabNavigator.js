import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/home/HomeScreen';
import LibraryScreen from '../screens/book/LibraryScreen';
import SettingScreen from '../screens/user/SettingScreen';
import DiscoveryScreen from '../screens/discovery/DiscoveryScreen';
import SearchStack from './SearchStack';
import SettingStackNavigator from './SettingStackNavigator';
import HomeStack from './HomeStack';

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
            case 'Khám Phá':
              iconName = 'compass-outline'; // biểu tượng khám phá
              break;
            case 'Tìm Kiếm':
              iconName = 'search-outline'; // biểu tượng tìm kiếm
              break;
            default:
              iconName = 'ellipse-outline'; // fallback icon
          }
          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginLeft: 18,
          marginRight: 18,
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
      <Tab.Screen name="Trang Chủ" component={HomeStack} />
      <Tab.Screen name="Sách của tôi" component={LibraryScreen} />
      <Tab.Screen name="Khám Phá" component={DiscoveryScreen} />
      <Tab.Screen name="Tìm Kiếm" component={SearchStack} />
      <Tab.Screen name="Cài đặt" component={SettingStackNavigator} />
    </Tab.Navigator>
  );
}
