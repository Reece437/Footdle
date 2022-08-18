import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  textInput: {
  	backgroundColor: 'white',
  	width: '70%',
  	height: 40,
  	borderWidth: 1,
  	borderColor: 'black',
  	borderRadius: 10,
  	paddingVertical: 5,
  	paddingHorizontal: 5,
  	fontSize: 16,
  },
  textInputDark: {
  	borderColor: 'white',
  	color: 'white',
  	backgroundColor: 'black'
  },
  button: {
  	width: '40%',
  	height: 50,
  	borderRadius: 50,
  	backgroundColor: '#0d39ff',
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginTop: 10
  },
  register: {
  	backgroundColor: 'white',
  	borderColor: "#0d39ff",
  	borderWidth: 2
  }
});
