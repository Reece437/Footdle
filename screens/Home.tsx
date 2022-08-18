import {
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { auth, db } from "../firebase";
import { styles } from "../styles/HomeStyles";
import React, { useState, useEffect } from "react";
import { SearchBar } from "../components/HomeComponents";

export default function Home({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const theme = useColorScheme();

  useEffect(() => {
    getDatabaseData();
  }, [searchText]);

  // Styles
  const darkTheme = theme == "dark" ? styles.containerDark : null;

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  const getDatabaseData = (): void => {
    db.collection("players")
      .doc("Players")
      .get()
      .then((doc) => {
        sortPlayerData(doc.data().Players);
      });
  }

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const sortPlayerData = (doc) => {
    if (searchText.length < 2) {
      return;
    }
    let searchedPlayers = [];
    var player;
    for (let i = 0; i < doc.length; i++) {
      player = doc[i].name.toLowerCase();
      try {
        if (
          player.split(" ")[0].substring(0, searchText.length) == searchText.toLowerCase() ||
          player.split(" ")[1].substring(0, searchText.length) == searchText.toLowerCase() ||
          player.substring(0, searchText.length) == searchText.toLowerCase()
        ) {
          searchedPlayers.push(doc[i]);
        }
      } catch (err) {
        if (player.substring(0, searchText.length) == searchText) {
          searchedPlayers.push(doc[i]);
        }
      }
    }
    console.log(searchedPlayers);
    return searchedPlayers;
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace("WelcomeScreen");
    });
  };

  return (
    <View style={[styles.container, darkTheme]}>
      <SearchBar
        value={searchText}
        placeholder={"Search"}
        onTextChange={(text) => setSearchText(text)}
      />
    </View>
  );
}
