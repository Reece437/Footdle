import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  searchBar: {
    /*position: 'absolute',
    top: '40%',
    left: 25,*/
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
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  playerCardDark: {
  	backgroundColor: '#424242'
  },
  clue: {
  	marginTop: 10,
  	marginHorizontal: 4,
  	width: 60,
  	height: 60,
  	borderRadius: 50,
  	elevation: 20,
  	alignItems: 'center',
  	justifyContent: 'center'
  }
});
