import {
  View,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/HomeStyles";
import { toTitleCase } from "../screens/Home";

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
  const { onPress, playerInfo, searchText } = props;
  let ButtonText = (
    <Text>
      {playerInfo.name.split(searchText)[0]}
      <Text style={{ fontWeight: "bold" }}>{searchText.toTitleCase()}</Text>
      {playerInfo.name.split(searchText)[1]}
    </Text>
  );
  return (
    <TouchableOpacity style={styles.playerCard} onPress={onPress}>
      <ButtonText />
    </TouchableOpacity>
  );
};

export const AllPlayerCards = (props: {
  doc: object[];
  searchText: string;
}) => {};
