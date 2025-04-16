import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../screens/user/SettingScreen";
import ModeScreen from "../screens/user/ModeScreen";

const Stack = createNativeStackNavigator();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Mode" component={ModeScreen} options={{tabBarStyle: { display: 'none' }}}/>
    </Stack.Navigator>
  );
}

export default SettingStackNavigator;