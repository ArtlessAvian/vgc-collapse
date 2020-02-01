var LearnSets = require('./pokemon-showdown-master/data/learnsets.js');

const JsonFile = JSON.stringify(LearnSets.BattleLearnsets);

const fs = require('fs');

fs.writeFile("data_learnsets.txt", JsonFile, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});