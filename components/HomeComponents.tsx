import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  useColorScheme,
} from "react-native";
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
    .join(" ");
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
        editable={editable}
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

const Clue = ({ footdle, playerInfo, category }) => {
  const theme = useColorScheme();
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
      <View
        style={[
          styles.clue,
          {
            backgroundColor: backgroundColor,
            marginLeft: category == "NAT" ? 14 : null,
          },
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
      </View>
      <Text
        style={{
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

  return (
    <Overlay
      overlayStyle={[styles.overlay, darkOverlay]}
      backdropStyle={{ opacity: 1 }}
      isVisible={props.visible}
      onBackdropPress={props.handleBackdropPress}
    ></Overlay>
  );
};
