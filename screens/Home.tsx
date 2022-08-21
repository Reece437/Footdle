import {
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from "react-native";
import { auth, db } from "../firebase";
import { styles } from "../styles/HomeStyles";
import React, { useState, useEffect } from "react";
import {
  SearchBar,
  AllPlayerCards,
  GiveClues,
} from "../components/HomeComponents";

export default function Home({ navigation }) {
  const [dbData, setDbData] = useState();
  const [footdle, setFootdle] = useState();

  const theme = useColorScheme();

  useEffect(() => {
    const unsubscribe = db
      .collection("players")
      .doc("Players")
      .onSnapshot((doc) => {
        setDbData(doc.data().Players);
        if (dbData == undefined) {
        	setFootdle(generateFootdle(doc.data().Players))
        }
      });
    return unsubscribe;
  }, []);

  // Styles
  const darkTheme = theme == "dark" ? styles.containerDark : null;

  const getDatabaseData = (): void => {
    db.collection("players")
      .doc("Players")
      .get()
      .then((doc) => {
        setDbData(doc.data().Players);
      });
  };

  const generateFootdle = (doc) => {
    let player;
    while (true) {
      player = doc[randInt(0, doc.length)];

      // Needed for development
      if (player.dob != "") {
        console.log('Generated footdle: ', player)
        return player;
      }
    }
  };

  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

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
      if (doc[i].dob == "") {
        continue;
      }
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
    return searchedPlayers;
  };

  const SearchArea = () => {
    const [searchText, setSearchText] = useState("");
    const [searchPlayers, setSearchPlayers] = useState();
    const [clues, setClues] = useState([]);
    const [guesses, setGuesses] = useState(1);

    useEffect(() => {
      setSearchPlayers(sortPlayerData(searchText));
    }, [searchText]);

    const buttonPress = (playerInfo) => {
      let x = clues;
      x.unshift(<GiveClues footdle={footdle} playerInfo={playerInfo} key={guesses} />);
      setClues(x);
      setSearchText("");
      setGuesses(guesses + 1);
    };

    return (
      <>
        <SearchBar
          value={searchText}
          placeholder={`Guess ${guesses} of 8`}
          onTextChange={(text) => setSearchText(text)}
        >
          <AllPlayerCards
            searchText={searchText}
            doc={searchPlayers}
            onPress={buttonPress}
          />
        </SearchBar>
        <ScrollView
          containerStyle={{ flex: 1 }}
          style={{ flexGrow: 0.5, position: "relative", top: "20%" }}
        >
          <View style={{ flexDirection: "column" }}>{clues}</View>
        </ScrollView>
      </>
    );
  };

  return (
    <View style={[darkTheme, styles.container]}>
      <SearchArea />
    </View>
  );
}
