import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { ActivityIndicator, View } from "react-native";
import CustomerTabNavigator from "./CustomerTabNavigator";
import BookDetailScreen from "../screens/book/BookDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DiscoveryCardChild from "../components/DiscoveryCardChild";
import InforAuthorScreen from "../screens/author/InfoAuthorScreen";
import GachaScreen from "../screens/gacha/GachaScreen";

const Stack = createStackNavigator();

const Root = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTab" component={CustomerTabNavigator} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
          <Stack.Screen
            name="DiscoveryCardChild"
            component={DiscoveryCardChild}
          />
          <Stack.Screen name="InfoAuthorScreen" component={InforAuthorScreen} />
          <Stack.Screen name="GachaScreen" component={GachaScreen} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Root;
