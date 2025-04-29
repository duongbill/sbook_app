import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import SearchStack from './SearchStack';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SearchTab" component={SearchStack} />
        </Stack.Navigator>
    );
}
