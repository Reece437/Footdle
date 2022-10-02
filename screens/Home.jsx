import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StatusBar,
  Animated,
} from "react-native";
import { auth, db } from "../firebase.js";
import { styles } from "../styles/HomeStyles";
import { useState, useEffect, useRef } from "react";
import {
  SearchBar,
  AllPlayerCards,
  GiveClues,
  PlayAgain,
  Stats,
  FootdleText
} from "../components/HomeComponents";
import {useColorScheme} from 'nativewind';


export default function Home({ navigation }) {
  const [dbData, setDbData] = useState();
  const [footdle, setFootdle] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchPlayers, setSearchPlayers] = useState();
  const [clues, setClues] = useState([]);
  const [guesses, setGuesses] = useState(1);
  const [editable, setEditable] = useState(true);
  const [visible, setVisible] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  const overlayAnimation = useRef(new Animated.Value(0.5)).current;

  const {colorScheme} = useColorScheme();
  
  useEffect(() => {
  	playAgain ? setTimeout(() => setVisible(true), 1000) : null;
  }, [playAgain])
  
  useEffect(() => {
    const unsubscribe = db
      .collection("players")
      .doc("Players")
      .onSnapshot((doc) => {
        setDbData(doc.data().Players);
        if (dbData == undefined) {
          setFootdle(generateFootdle(doc.data().Players));
        }
      });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setSearchPlayers(sortPlayerData(searchText));
  }, [searchText, dbData]);


  const generateFootdle = (doc) => {
    let player;
    while (true) {
      player = doc[randInt(0, doc.length)];

      // Needed for development
      if (player.dob != "") {
        console.log("Generated footdle: ", player);
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

  const buttonPress = (playerInfo) => {
    setEditable(false);
    let x = clues;
    x.unshift(
      <GiveClues
        footdle={footdle}
        playerInfo={playerInfo}
        key={guesses}
        AnimationFinishedCallback={() => AnimationFinishedCallback(playerInfo)}
      />
    );
    setClues(x);
    setSearchText("");
  };

  const AnimationFinishedCallback = (playerInfo) => {
    console.log("called function");
    let result = checkGameEnd(footdle, playerInfo, guesses + 1);
    if (typeof(result) == "boolean") {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .get()
        .then((doc) => {
          endGame(result, guesses, doc.data());
        });
    } else {
      setEditable(true);
      setGuesses(guesses + 1);
    }
  };

  const endGame = (result, guesses, userData) => {
    setEditable(false);
    userData.totalGames += 1;
    if (result) {
      switch (guesses) {
        case 1:
          userData.first += 1;
          break;
        case 2:
          userData.second += 1;
          break;
        case 3:
          userData.third += 1;
          break;
        case 4:
          userData.fourth += 1;
          break;
        case 5:
          userData.fith += 1;
          break;
        case 6:
          userData.sixth += 1;
          break;
        case 7:
          userData.seventh += 1;
          break;
        case 8:
          userData.eighth += 1;
          break;
      }
      userData.streak += 1;
      if (userData.streak > userData.bestStreak) {
        userData.bestStreak = userData.streak;
      }
    } else {
      (userData.fails += 1), (userData.streak = 0);
    }
    db.collection("users").doc(auth.currentUser?.uid).set(userData);
    setPlayAgain(true);
  };

  const checkGameEnd = (
    footdle,
    playerInfo,
    guesses
  ) => {
    if (footdle.name == playerInfo.name) {
      return true;
    } else if (guesses > 8) {
      return false;
    } else {
      return null;
    }
  };

  const restartGame = () => {
    setFootdle(generateFootdle(dbData));
    setSearchText("");
    setGuesses(1);
    setVisible(false);
    setClues([]);
    setEditable(true);
    setSearchPlayers();
    setPlayAgain(false);
    overlayAnimation.value = new Animated.Value(0);
  };

  return (
    <View className="flex-1 justify-center items-center pb-[10px] dark:bg-[#121212]">
      {playAgain ? <FootdleText footdle={footdle} /> : null}
      <SearchBar
        value={searchText}
        placeholder={`Guess ${guesses} of 8`}
        onTextChange={(text) => setSearchText(text)}
        editable={editable}
      >
        <AllPlayerCards
          searchText={searchText}
          doc={searchPlayers}
          onPress={buttonPress}
        />
      </SearchBar>
      <ScrollView
        containerStyle={{ flex: 1 }}
        fadingEdgeLength={100}
        style={{
          width: "100%",
          flexGrow: 0.6,
          marginVertical: 10,
          position: "relative",
          top: searchPlayers == undefined ? "25%" : "-5%",
        }}
      >
        <View style={{ flexDirection: "column" }}>{clues}</View>
      </ScrollView>
      {playAgain ? (
        <PlayAgain
          onPress={restartGame}
          style={{ position: "absolute", marginTop: 30, top: 15, right: 15 }}
        />
      ) : null}
      <Stats
        visible={visible}
        handleBackdropPress={() => {
          console.log("backdrop pressed");
          setVisible(!visible);
          console.log("visible: ", visible);
        }}
        playAgain={restartGame}
      />
      <StatusBar
        barStyle={colorScheme == "dark" ? "light-content" : "dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
    </View>
  );
}
