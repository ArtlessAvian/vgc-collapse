// Convert objects to JSON. These files will be parsed further in a Python 
// script.

var Learnsets = require('../pokemon-showdown-master/data/learnsets.js');
var Pokedex = require('../pokemon-showdown-master/data/pokedex.js');
var FormatsData = require('../pokemon-showdown-master/data/formats-data.js');

const LearnsetsJson = JSON.stringify(Learnsets.BattleLearnsets);
const PokedexJson = JSON.stringify(Pokedex.BattlePokedex);
const FormatsDataJson = JSON.stringify(FormatsData.BattleFormatsData);

const fs = require('fs');

fs.writeFile("../data/data_learnsets.txt", LearnsetsJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("'Learnsets' was saved!");
});

fs.writeFile("../data/data_pokedex.txt", PokedexJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("'Pokedex' was saved!");
});

fs.writeFile("../data/data_formats.txt", FormatsDataJson, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("'Formats' was saved!");
});