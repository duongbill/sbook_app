<<<<<<< HEAD
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import AuthStack from './navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
  <ThemeProvider>
    <AppNavigator />
  </ThemeProvider>
  );
  // return (
  //   <NavigationContainer>
  //     <AuthStack />
  //   </NavigationContainer>
  // );
}
=======
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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/home/HomeScreen';
// import FindScreen from './screens/FindScreen';
// import BookmarkScreen from './screens/BookmarkScreen';
// import ProfileScreen from './screens/ProfileScreen';

// Custom BottomNav
import BottomNav from './components/BottomNav';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.screen}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            {/* <Stack.Screen name="FindScreen" component={FindScreen} />
            <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
          </Stack.Navigator>
        </View>
        <BottomNav />
      </View>
    </NavigationContainer>
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

export default App;
>>>>>>> 83b65dd31e3138cebf9554b18dd6c0a777125138
