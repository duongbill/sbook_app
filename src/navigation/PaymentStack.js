import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyWalletScreen from '../screens/payment/MyWalletScreen';
import DepositScreen from '../screens/payment/DepositScreen';
import TransactionHistoryScreen from '../screens/payment/TransactionHistoryScreen';

const Stack = createNativeStackNavigator();

export default function PaymentStack() {
    return (
        <Stack.Navigator
            initialRouteName="MainPayment"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainPayment" component={MyWalletScreen} />
            <Stack.Screen name="deposit" component={DepositScreen} />
            <Stack.Screen name="history" component={TransactionHistoryScreen} />
        </Stack.Navigator>
    );
}
