var Model;
(function (Model) {
    Model.promises = [];
    Model.promises.push(fetch("./data/abilities/data_pokemon_to_abilities.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.pokemon_to_abilities = json;
    }));
    Model.promises.push(fetch("./data/abilities/data_abilities_to_pokemon.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.abilities_to_pokemon = json;
        Model.abilities_sorted = Object.keys(json).sort();
    }));
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
    Model.promises.push(fetch("./data/items/data_pokemon_to_items.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.pokemon_to_items = json;
    }));
    Model.promises.push(fetch("./data/items/data_items_to_pokemon.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.items_to_pokemon = json;
        Model.items_sorted = Object.keys(json).sort();
    }));
    Model.promises.push(fetch("./data/names/data_display_to_names.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.display_to_names = json;
    }));
    Model.promises.push(fetch("./data/sprite_url/data_item_names_to_sprite_url.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.items_to_image = json;
    }));
    Model.promises.push(fetch("./data/sprite_url/data_pkmn_names_to_sprite_url.json")
        .then(function (response) { return response.json(); })
        .then(function (json) {
        Model.pokemon_to_image = json;
    }));
})(Model || (Model = {}));
