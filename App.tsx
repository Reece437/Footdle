import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./screens/Home.tsx";
import WelcomeScreen from "./screens/Welcome_Screen.tsx";
import { TailwindProvider } from "tailwindcss-react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="WelcomeScreen">
      <TailwindProvider>
        <Stack.Navigator>
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
      </TailwindProvider>
    </NavigationContainer>
  );
}
