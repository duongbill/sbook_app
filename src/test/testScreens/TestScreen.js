import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '../../context/ThemeContext';

import SearchStack from '../../navigation/SearchStack';
import HomeStack from '../../navigation/HomeStack';
import BottomNav from '../../components/BottomNav';
import MyWalletScreen from '../../screens/payment/MyWalletScreen';
import BottomTabs from '../../navigation/BottomTabs';

export default function TestScreen() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <BottomTabs />
            </NavigationContainer>
        </ThemeProvider>
    );
}
