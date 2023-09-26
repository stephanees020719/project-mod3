require('dotenv').config();
require('./database.cjs');

const characters = [
    { name: "Goku", picture: "goku.jpg" },
    { name: "Vegeta", picture: "vegeta.jpg" },
    { name: "Piccolo", picture: "piccolo.jpg" },
    { name: "Gohan", picture: "gohan.jpg" },
    { name: "Trunks", picture: "trunks.jpg" },
    { name: "Goten", picture: "goten.jpg" },
    { name: "Krillin", picture: "krillin.jpg" },
    { name: "Yamcha", picture: "yamcha.jpg" },
    { name: "Tien", picture: "tien.jpg" },
    { name: "Chiaotzu", picture: "chiaotzu.jpg" },
    { name: "Bulma", picture: "bulma.jpg" },
    { name: "Chi-Chi", picture: "chi-chi.jpg" },
    { name: "Master Roshi", picture: "master-roshi.jpg" },
    { name: "Android 18", picture: "android-18.jpg" },
    { name: "Frieza", picture: "frieza.jpg" },
    { name: "Cell", picture: "cell.jpg" },
    { name: "Majin Buu", picture: "majin-buu.jpg" },
    { name: "Beerus", picture: "beerus.jpg" },
    { name: "Whis", picture: "whis.jpg" },
    { name: "Jiren", picture: "jiren.jpg" }
];


console.log(characters);