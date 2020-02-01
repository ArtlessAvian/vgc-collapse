var Learnsets = require('../pokemon-showdown-master/data/learnsets.js');
var Pokedex = require('../pokemon-showdown-master/data/pokedex.js');


const LearnsetsJson = JSON.stringify(Learnsets.BattleLearnsets);
const PokedexJson = JSON.stringify(Pokedex.BattlePokedex);

const fs = require('fs');

fs.writeFile("../data/data_learnsets.txt", LearnsetsJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

fs.writeFile("../data/data_pokedex.txt", PokedexJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});