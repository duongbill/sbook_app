import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../screens/user/SettingScreen";
import ModeScreen from "../screens/user/ModeScreen";
import InfoScreen from "../screens/settings/InfoScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import LanguageScreen from "../screens/settings/LanguageScreen";
import SecurityPolicyScreen from "../screens/settings/SecurityPolicyScreen";

const Stack = createNativeStackNavigator();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen
        name="Mode"
        component={ModeScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="SecurityPolicy"
        component={SecurityPolicyScreen}
        options={{ tabBarStyle: { display: "none" } }}
      />
    </Stack.Navigator>
  );
};

export default SettingStackNavigator;
