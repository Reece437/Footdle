const db = require("./firebase").db;
const prompt = require("prompt-sync")({ sigint: true });

const input = (text) => {
  console.log(text);
  let x = prompt("> ");
  return x;
};

db.collection("players")
  .doc("Players")
  .get()
  .then(async (doc) => {
    let Players = doc.data().Players;
    for (let i = 0; i < Players.length; i++) {
      if (Players[i].dob == "") {
        Players[i].dob = input(`Enter ${JSON.stringify(Players[i])}'s dob`);
        console.log(Players[i]);
        await db.collection("players").doc("Players").set({ Players });
        console.log("Saved data");
      }
    }
    process.exit();
  });
