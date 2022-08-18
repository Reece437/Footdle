import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./screens/Welcome_Screen";
import Home from './screens/Home';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          component={WelcomeScreen}
          name="WelcomeScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
