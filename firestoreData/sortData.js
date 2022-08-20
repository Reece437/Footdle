var firebase = require('./firebase');
const db = firebase.db

db.collection('players').doc("Players").get().then(doc => {
	let Players = doc.data().Players;
	console.log(Players.length);
	for (let i = 0; i < Players.length; i++) {
		Players[i].name = Players[i].name.toUpperCase()
	}
	db.collection('players').doc('Players').set({Players});
	console.log('Finished');
})