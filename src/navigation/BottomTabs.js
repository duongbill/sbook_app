import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import HomeStack from './HomeStack';
import SettingStackNavigator from './SettingStackNavigator';
import MyWalletScreen from '../screens/payment/MyWalletScreen';
import PaymentStack from './PaymentStack';
// import FindScreen from '../screens/find/FindScreen';
// import BookmarkScreen from '../screens/bookmark/BookmarkScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: '#E1DBCA',
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: 15,
                    marginHorizontal: 10,
                    padding: 10,
                    paddingTop: 5,
                    height: 65,
                    fontCorlor: 'black',
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    let IconLib;

                    switch (route.name) {
                        case 'HomeStack':
                            iconName = 'home';
                            IconLib = AntDesign;
                            break;
                        case 'Find':
                            iconName = 'search';
                            IconLib = Ionicons;
                            break;
                        case 'Bookmark':
                            iconName = 'bookmark-outline';
                            IconLib = Ionicons;
                            break;
                        case 'setting':
                            iconName = 'person-outline';
                            IconLib = Ionicons;
                            break;
                        default:
                            break;
                    }

                    return <IconLib name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: -4,
                },
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: 'Trang chủ' }} />
            <Tab.Screen name="Find" component={HomeStack} options={{ tabBarLabel: 'Khám phá' }} />
            <Tab.Screen name="Bookmark" component={PaymentStack} options={{ tabBarLabel: 'Sách của tôi' }} />
            <Tab.Screen name="setting" component={SettingStackNavigator} options={{ tabBarLabel: 'Tôi' }} />
        </Tab.Navigator>
    );
}
