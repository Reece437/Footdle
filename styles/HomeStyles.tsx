import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  searchBar: {
    width: 270,
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
    width: '100%',
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
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    width: 300,
    height: 500,
    backgroundColor: "white",
    borderRadius: 10
  },
  overlayDark: {
    backgroundColor: "#424242",
  },
  
  playAgainBtn: {
  	position: 'absolute',
  	marginTop: 30,
  	top: 15,
  	right: 15,
  	backgroundColor: '#2f9db8',
  	borderWidth: 2,
  	borderColor: 'black',
  	borderRadius: 20
  },
  statsText: {
  	paddingHorizontal: 5,
  	textAlign: 'center'
  },
  data: {
  	fontWeight: 'bold',
  	fontSize: 25
  },
  guessStatBar: {
  	height: 25,
  	backgroundColor: '#2f9db8',
  	borderTopRightRadius: 10,
  	borderBottomRightRadius: 10,
  	marginBottom: 5,
    justifyContent: 'center'
  }
});
