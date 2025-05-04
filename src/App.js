// import React from 'react';
// import AppNavigator from './navigation/AppNavigator';
// import AuthStack from './navigation/AuthStack';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './screens/home/HomeScreen';

// export default function App() {
//   return <HomeScreen />;
//   // return (
//   //   <NavigationContainer>
//   //     <AuthStack />
//   //   </NavigationContainer>
//   // );
// }

import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./context/ThemeContext";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import DiscoveryScreen from "./screens/discovery/DiscoveryScreen";
import DiscoveryCardChild from "./components/DiscoveryCardChild";
import GachaScreen from "./screens/gacha/GachaScreen";
import SettingStackNavigator from "./navigation/SettingStackNavigator";
import InfoAuthorScreen from "./screens/author/InfoAuthorScreen";
import SearchStack from "./navigation/SearchStack";
// import BookmarkScreen from './screens/BookmarkScreen';
// import ProfileScreen from './screens/ProfileScreen';

// Custom BottomNav
import BottomNav from "./components/BottomNav";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={styles.screen}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen
                name="DiscoveryScreen"
                component={DiscoveryScreen}
              />
              <Stack.Screen
                name="DiscoveryCardChild"
                component={DiscoveryCardChild}
              />
              <Stack.Screen name="GachaScreen" component={GachaScreen} />
              <Stack.Screen
                name="SettingScreen"
                component={SettingStackNavigator}
              />
              <Stack.Screen
                name="InfoAuthorScreen"
                component={InfoAuthorScreen}
              />
              <Stack.Screen name="SearchStack" component={SearchStack} />
              {/* <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
            </Stack.Navigator>
          </View>
          <BottomNav />
        </View>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});
