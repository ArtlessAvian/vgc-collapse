namespace Model
{
    export var pokemon_sorted : string[];
    export var moves_sorted : string[];
    export var abilities_sorted : string[];
    export var items_sorted : string[];

    export var names_sorted : string[];

    export var pokemon_to_abilities : Object;
    export var abilities_to_pokemon : Object;
    export var pokemon_to_moves : Object;
    export var moves_to_pokemon : Object;

    export var display_to_names : Object;

    export var promises : Array<Promise<void>> = [];
    
    promises.push(fetch("./data/abilities/data_pokemon_to_abilities.json")
        .then(response => response.json())
        .then(function(json) {
            pokemon_to_abilities = json;
        }));
    promises.push(fetch("./data/abilities/data_abilities_to_pokemon.json")
        .then(response => response.json())
        .then(function(json) {
            abilities_to_pokemon = json; abilities_sorted = Object.keys(json).sort();
        }));

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

    promises.push(fetch("./data/items/data_items.json")
        .then(response => response.json())
        .then(function(json) {
            items_sorted = json["items"]
                // .filter(item => !item.endsWith("Ball")) // why not lmao
                .sort();
        }));
    
    promises.push(fetch("./data/names/data_display_to_names.json")
        .then(response => response.json())
        .then(function(json) {
            display_to_names = json; names_sorted = Object.keys(json).sort();
        }));
}