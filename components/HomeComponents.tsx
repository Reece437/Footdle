import {
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Text,
  Image
} from "react-native";
import { styles } from "../styles/HomeStyles";

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
    <TextInput
      onChangeText={props.onTextChange}
      style={[styles.searchBar, darkTheme]}
      placeholder={props.placeholder}
      placeholderTextColor={placeholderTextColor}
      value={props.value}
    />
  );
};

interface PlayerCardProps {
  onPress: () => void;
  playerInfo: object[];
  searchText: string;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const theme = useColorScheme();
  const containerStyle = theme == 'dark' ? styles.playerCardDark : null;
  let { onPress, playerInfo, searchText } = props;
  while (searchText.slice(-1) == " ") {
    searchText = searchText.slice(0, -1);
  }
  try {
    playerInfo.name.split(searchText.toUpperCase())[1];
  } catch (err) {
    return <></>;
  }
  let afterSearchText = playerInfo.name
    .split(searchText.toUpperCase())
    .slice(1)
    .join(searchText.toUpperCase());
  let ButtonText = () => (
    <Text style={{ color: theme == 'dark' ? "white" : null }}>
      {playerInfo.name.split(searchText.toUpperCase())[0]}
      <Text style={{ fontWeight: "bold" }}>{searchText.toUpperCase()}</Text>
      {afterSearchText}
    </Text>
  );
  return (
    <TouchableOpacity style={[styles.playerCard, containerStyle]} onPress={onPress}>
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
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
    >
      {cards}
    </ScrollView>
  );
};

const Clue = (props) => {
	return (
		<View style={styles.clue}>
			<Text>Hi</Text>
		</View>
	);
}

export const GiveClues = (props) => {
  return (
	<Clue />
  ); 
};
