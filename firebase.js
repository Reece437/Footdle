import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC5oqghKIvwlOn7wI3KttyUWKZbOUo9B68",
  authDomain: "footdle-70671.firebaseapp.com",
  projectId: "footdle-70671",
  storageBucket: "footdle-70671.appspot.com",
  messagingSenderId: "710001145005",
  appId: "1:710001145005:web:628fb1aee611dbdd8e4224"
};


let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}
const auth = firebase.auth()
const db = firebase.firestore();

export { auth, db }