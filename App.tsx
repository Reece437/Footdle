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

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [signedIn, setSignedIn] = useState()
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //AsyncStorage.setItem('signedIn', JSON.stringify(true));
        setSignedIn(true);
      } else setSignedIn(false);
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
  	const setScreen = async() => {
  		if (signedIn !== undefined) {
  			await SplashScreen.hideAsync();
  		}
  	}
  	setScreen();
  }, [signedIn])
  
  if (signedIn == undefined) {
  	return null;
  }
  
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator initialRouteName={signedIn ? "Home" : "WelcomeScreen"}>
          <Stack.Screen
            component={Home}
            name="Home"
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
