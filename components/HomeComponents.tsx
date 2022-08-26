import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  useColorScheme,
  TouchableHighlight,
  Animated,
  Easing,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import { styles } from "../styles/HomeStyles";
import { Overlay } from "react-native-elements";
import { auth, db } from "../firebase";

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("-");
}

interface SearchBarProps {
  value: string;
  onTextChange?: () => void;
  placeholder: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const theme = useColorScheme();
  const darkTheme = theme == "dark" ? styles.searchBarDark : null;
  const placeholderTextColor = theme == "dark" ? "#ffffff96" : null;

  return (
    <View style={{ position: "relative", top: "25%" }}>
      <TextInput
        editable={props.editable}
        onChangeText={props.onTextChange}
        style={[styles.searchBar, darkTheme]}
        placeholder={props.placeholder}
        placeholderTextColor={placeholderTextColor}
        value={props.value}
      />
      {props.children}
    </View>
  );
};

interface PlayerCardProps {
  onPress: () => void;
  playerInfo: object[];
  searchText: string;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const theme = useColorScheme();
  const containerStyle = theme == "dark" ? styles.playerCardDark : null;
  let { onPress, playerInfo, searchText } = props;
  while (searchText.slice(-1) == " ") {
    searchText = searchText.slice(0, -1);
  }
  try {
    playerInfo.name.split(searchText.toUpperCase())[1];
  } catch (err) {
    return null;
  }
  let afterSearchText = playerInfo.name
    .split(searchText.toUpperCase())
    .slice(1)
    .join(searchText.toUpperCase());
  let ButtonText = () => (
    <Text style={{ color: theme == "dark" ? "white" : null }}>
      {playerInfo.name.split(searchText.toUpperCase())[0]}
      <Text style={{ fontWeight: "bold" }}>{searchText.toUpperCase()}</Text>
      {afterSearchText}
    </Text>
  );
  return (
    <TouchableOpacity
      style={[styles.playerCard, containerStyle]}
      onPress={() => {
        onPress(playerInfo);
      }}
    >
      <ButtonText />
    </TouchableOpacity>
  );
};

export const AllPlayerCards = (props: {
  doc: any;
  searchText: string;
  onPress: () => void;
}) => {
  const { doc, searchText, onPress } = props;
  if (typeof doc == "undefined") {
    return <></>;
  }
  let cards = [];
  for (let i = 0; i < doc.length; i++) {
    cards.push(
      <PlayerCard
        onPress={onPress}
        searchText={searchText}
        playerInfo={doc[i]}
        key={i}
      />
    );
  }
  return (
    <ScrollView
      style={{ flexGrow: 0.5 }}
      //containerStyle={{position: 'absolute', top: '40%', left: 25}}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
    >
      {cards}
    </ScrollView>
  );
};

const Clue = ({ footdle, playerInfo, category, AnimationCallback}) => {
  const theme = useColorScheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(({finished}) => category == "NAT" ? AnimationCallback() : console.log('nothing'));
    Animated.timing(offset, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  let backgroundColor;
  switch (category) {
    case "NAT":
      backgroundColor = footdle.nation == playerInfo ? "green" : null;
      break;
    case "LGE":
      backgroundColor = footdle.league == playerInfo ? "green" : null;
      break;
    case "TEAM":
      backgroundColor = footdle.club == playerInfo ? "green" : null;
      break;
    case "POS":
      backgroundColor = footdle.position == playerInfo ? "green" : null;
      break;
    case "AGE":
      backgroundColor = getAge(footdle.dob) == playerInfo ? "green" : null;
      break;
  }

  if (backgroundColor == null) {
    backgroundColor = theme == "dark" ? "#424242" : "white";
  }

  let extraText;
  if (category == "AGE") {
    let footdleAge = getAge(footdle.dob);
    if (footdleAge > playerInfo) {
      extraText = "👆";
    } else if (footdleAge < playerInfo) {
      extraText = "👇";
    }
  }

  return (
    <View style={{ flexDirection: "column" }}>
      <Animated.View
        style={[
          styles.clue,
          {
            backgroundColor: backgroundColor,
            marginLeft: category == "NAT" ? 14 : null,
          },
          { opacity: opacity, transform: [{ translateY: offset }] },
        ]}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            color: theme == "dark" ? "white" : "black",
            textAlign: "center",
          }}
        >
          {playerInfo}
          {extraText}
        </Text>
      </Animated.View>
      <Text
        style={{
          marginLeft: category == "NAT" ? 10 : null,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {category}
      </Text>
    </View>
  );
};

export const GiveClues = (props) => {
  const theme = useColorScheme();
  const textColor = theme == "dark" ? "white" : "black";
  return (
    <>
      <Text
        style={{
          color: textColor,
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        {toTitleCase(props.playerInfo.name)}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Clue
          footdle={props.footdle}
          playerInfo={props.playerInfo.nation}
          category="NAT"
          AnimationCallback={props.AnimationFinishedCallback}
        />
        <Clue
          footdle={props.footdle}
          playerInfo={props.playerInfo.league}
          category="LGE"
        />
        <Clue
          footdle={props.footdle}
          playerInfo={props.playerInfo.club}
          category="TEAM"
        />
        <Clue
          footdle={props.footdle}
          playerInfo={props.playerInfo.position}
          category="POS"
        />
        <Clue
          footdle={props.footdle}
          playerInfo={getAge(props.playerInfo.dob)}
          category="AGE"
        />
      </View>
    </>
  );
};

export const Stats = (props) => {
  const theme = useColorScheme();
  const darkOverlay = theme == "dark" ? styles.overlayDark : null;
  const [data, setData] = useState();
  
  useEffect(() => {
  	db.collection('users').doc(auth.currentUser?.uid).get().then(doc => {
  		setData(doc.data())
  	})
  }, [])
  
  
  
  return (
    <Overlay
      overlayStyle={[styles.overlay, darkOverlay]}
      backdropStyle={{ opacity: 1 }}
      isVisible={props.visible}
      onBackdropPress={props.handleBackdropPress}
    >
      <View style={{flexDirection: 'row'}}>
    	<Text>Total{'\n'}Games: {data?.totalGames}</Text>
    	<Text>Best streak: {data?.bestStreak}</Text>
    	<Text>Streak: {data?.streak}</Text>
      </View>
    </Overlay>
  );
};



export const PlayAgain = ({ onPress }) => {
  const theme = useColorScheme();
  return (
    <TouchableHighlight
      underlayColor={"#200efca0"}
      style={[
        styles.playAgainBtn,
        { borderColor: theme == "dark" ? "white" : "black" },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          color: "white",
          padding: 5,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Play Again
      </Text>
    </TouchableHighlight>
  );
};
