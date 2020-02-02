var Model;
(function (Model) {
    Model.promises = [];
    Model.promises.push(fetch("./data/moves/data_pokemon_to_moves.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.pokemon_to_moves = json;
        Model.pokemon_sorted = Object.keys(json).sort();
    }));
    Model.promises.push(fetch("./data/moves/data_moves_to_pokemon.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.moves_to_pokemon = json;
        Model.moves_sorted = Object.keys(json).sort();
    }));
})(Model || (Model = {}));
