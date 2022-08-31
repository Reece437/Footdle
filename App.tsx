import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./screens/Home.tsx";
import WelcomeScreen from "./screens/Welcome_Screen.tsx";
import { TailwindProvider } from "tailwindcss-react-native";
import * as SplashScreen from "expo-splash-screen";
import { auth } from "./firebase";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from './screens/Settings';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <Drawer.Navigator screenOptions={{
  	drawerStyle: {
  		backgroundColor: '#121212'
  	},
  	swipeEdgeWidth: 60
  }}>
    <Drawer.Screen
      component={Home}
      name="Footdle"
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      component={Settings}
      name="Settings"
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [signedIn, setSignedIn] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(true);
      } else setSignedIn(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const setScreen = async () => {
      if (signedIn !== undefined) {
        await SplashScreen.hideAsync();
      }
    };
    setScreen();
  }, [signedIn]);

  if (signedIn == undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator initialRouteName={signedIn ? "Home" : "WelcomeScreen"}>
          <Stack.Screen
            component={HomeScreen}
            name="HomeScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={WelcomeScreen}
            name="WelcomeScreen"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
