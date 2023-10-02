

require('dotenv').config();
require('./database.cjs');
//shout out to Josh that help me with this piece of code 
const Character = require('../models/character.cjs');

(async function () {
  await Character.deleteMany({});
  const characters = await Character.create([
    { 
      name: "Goku", 
    picture: "goku.png",
    comment: "I want be the strongest saiyan" 
  },
    
    { 
      name: "Vegeta", 
    picture: "vegeta.jpg", 
    comment: "Go to code You insect" 
  },
    { 
      name: "Piccolo", 
    picture: "piccolo.jpg",
    comment: "Goku why are you so stupid " 
  },
    { 
      name: "Gohan", 
    picture: "gohan.jpg", 
    comment: "I like to study, fighting is for my dad" 
  },
    { 
      name: "Trunks", 
    picture: "trunks.jpg",
     comment: "I came from the future and you all die coding" 
    },
    { 
      name: "Goten", 
      picture: "goten.jpg",
     comment: "I want my mom" 
    },
    { 
      name: "Krillin",
     picture: "krillin.jpg", 
    comment: "How many times does Frieza is going to kill me " 
  },
  { 
    name: "Frieza", 
    picture: "frieza.jpg", 
    comment: "kill all Saiyans " 
  },
   { 
      name: "Majin Buu", 
      picture: "majin-buu.jpg", 
      comment: "I'll turn you into a piece of chocolate" 
    },
   
    { 
      name: "Jiren",
      picture:"jiren.jpg",
      comment:"My wish is to be the strongest creature in the universe"

      },
  ]);

  console.log(characters);

  process.exit();
})();


