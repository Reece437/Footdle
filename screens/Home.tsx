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
  const [dbData, setDbData] = useState();
  const [guesses, setGuesses] = useState(1);
  const theme = useColorScheme();

  useEffect(() => {
    getDatabaseData();
  }, []);

  // Styles
  const darkTheme = theme == "dark" ? styles.containerDark : null;

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  const getDatabaseData = (): void => {
    db.collection("players")
      .doc("Players")
      .get()
      .then((doc) => {
        setDbData(doc.data().Players);
      });
  };

  export function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  const sortPlayerData = (searchText) => {
    let doc = dbData;
    if (searchText.length < 2) {
      return;
    }
    let text = searchText;
    while (text.slice(-1) == " ") {
      text = text.slice(0, -1);
    }
    let searchedPlayers = [];
    var player;
    for (let i = 0; i < doc.length; i++) {
      player = doc[i].name.toLowerCase();
      try {
        if (
          player.split(" ")[0].substring(0, searchText.length) ==
            text.toLowerCase() ||
          player.split(" ")[1].substring(0, searchText.length) ==
            text.toLowerCase() ||
          player.substring(0, searchText.length) == text.toLowerCase()
        ) {
          searchedPlayers.push(doc[i]);
        }
      } catch (err) {
        if (player.substring(0, text.length) == searchText) {
          searchedPlayers.push(doc[i]);
        }
      }
    }
    console.log(searchedPlayers);
    return searchedPlayers;
  };

  const SearchArea = () => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
      sortPlayerData(searchText);
    }, [searchText]);

    return (
      <>
        <SearchBar
          value={searchText}
          placeholder={`Guess ${guesses} of 8`}
          onTextChange={(text) => setSearchText(text)}
        />
      </>
    );
  };

  return (
    <View style={[styles.container, darkTheme]}>
      <SearchArea />
    </View>
  );
}
