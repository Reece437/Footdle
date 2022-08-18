import { View, TextInput, useColorScheme } from "react-native";
import { styles } from "../styles/HomeStyles";

interface SearchBarProps {
  value: string;
  onTextChange?: () => void;
  placeholder: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const theme = useColorScheme();
  const darkTheme = theme == 'dark' ? styles.searchBarDark : null;
  const placeholderTextColor = theme == 'dark' ? '#ffffff96' : null;
  
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

export const PlayerCard = () => {
	
}