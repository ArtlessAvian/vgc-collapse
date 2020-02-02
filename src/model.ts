namespace Model
{
    export var pokemon_sorted : string[];
    export var moves_sorted : string[];
    export var moves_to_pokemon : Object;
    export var pokemon_to_moves : Object;

    export var promises : Array<Promise<void>> = [];
    promises.push(fetch("./data/moves/data_pokemon_to_moves.json")
        .then(response => response.json())
        .then(function(json) {
            pokemon_to_moves = json; pokemon_sorted = Object.keys(json).sort();
        }));
    promises.push(fetch("./data/moves/data_moves_to_pokemon.json")
        .then(response => response.json())
        .then(function(json) {
            moves_to_pokemon = json; moves_sorted = Object.keys(json).sort();
        }));
}