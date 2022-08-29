const firebase = require('./firebase');
const prompt = require('prompt-sync')({sigint: true});

const db = firebase.db;

const input = text => {
	console.log(text);
	var x = prompt('> ');
	return x;
}

const checkName = (name, Players) => {
	for (let i = 0; i < Players.length; i++) {
		if (name == Players[i].name) {
			console.log("This player already exists as:\n", Players[i]);
			return false;
		}
	}
	return true;
}

db.collection('players').doc('Players').get().then(async(doc) => {
	let Players = doc.data().Players;
	while (true) {
		while (true) {
			var name = input('Enter the player name').toUpperCase();
			if (checkName(name, Players)) break;
		}
		var league = input("Enter the player league").toLowerCase();
		var club = input("Enter the player club").toLowerCase();
		var nation = input("Enter the player nation").toLowerCase();
		var position = input("Enter the player position").toUpperCase();
		var dob = input("Enter player dob in format YYYY/MM/DD");
		
		Players.push({
			name: name,
			league: league,
			club: club,
			nation: nation,
			position: position,
			dob: dob
		})
		console.log(Players[Players.length - 1])
		await db.collection('players').doc('Players').set({Players});
		console.log('Saved data');
	}
})