import { useState, useEffect } from "react";
import {
  Text,
  View,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { styles } from "../styles/WelcomeScreenStyles";
import { auth, db } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Styles
  const theme = useColorScheme();
  const containerStyle = theme == "dark" ? styles.darkBackground : null;
  const textInputStyle = theme == "dark" ? styles.textInputDark : null;
  const placeholderTextColor = theme == "dark" ? "#ffffff96" : null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        AsyncStorage.setItem('signedIn', JSON.stringify(true));
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        //userCredentials.user.sendVerificationEmail();
        return db.collection("users").doc(userCredentials.user.uid).set({
          first: 0,
          second: 0,
          third: 0,
          fourth: 0,
          fith: 0,
          sixth: 0,
          seventh: 0,
          eighth: 0,
          fails: 0,
          totalGames: 0,
          streak: 0,
          bestStreak: 0,
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.textInput, textInputStyle]}
        value={email}
        placeholder="Email"
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setEmail(text)}
        keyboardType={"email-address"}
      />
      <TextInput
        style={[styles.textInput, textInputStyle, { marginTop: 5 }]}
        value={password}
        placeholder="Password"
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button]} onPress={handleSignIn}>
        <Text style={{ color: theme == "dark" ? "black" : "white" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.register,
          { backgroundColor: theme == "dark" ? "black" : null },
        ]}
        onPress={handleSignUp}
      >
        <Text style={{ color: theme == "dark" ? "white" : "black" }}>
          Register
        </Text>
      </TouchableOpacity>
      <StatusBar
        barStyle={theme == "dark" ? "light-content" : "dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
    </KeyboardAvoidingView>
  );
}
