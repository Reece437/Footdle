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
    width: 310,
    height: 50,
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "white",
    elevation: 20,
  },
  searchBarDark: {
    backgroundColor: "#424242",
    color: "white",
  },
  playerCard: {
    width: 310,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  playerCardDark: {
    backgroundColor: "#424242",
  },
  clue: {
    marginTop: 5,
    marginHorizontal: 4,
    width: 60,
    height: 60,
    borderRadius: 50,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    width: 250,
    height: 400,
    backgroundColor: "white",
  },
  overlayDark: {
    backgroundColor: "#424242",
  },
  statsContainer: {
    width: "70%",
    height: "80%",
  },
});
