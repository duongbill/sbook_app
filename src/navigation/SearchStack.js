import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/discorver/SearchScreen';
import FilterScreen from '../screens/discorver/FilterScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
    return (
        <Stack.Navigator
            initialRouteName="Search"
            screenOptions={{
                headerShown: false, // Bỏ header nếu không muốn hiện
            }}
        >
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>
    );
}
