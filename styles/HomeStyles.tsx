import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  searchBar: {
    width: "85%",
    height: 50,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "white",
    elevation: 20
  },
  searchBarDark: {
    backgroundColor: "#424242",
    color: 'white'
  },
});
