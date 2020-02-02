var Dropdown;
(function (Dropdown) {
    function createPokemonNameDropdown(pokemon, i) {
        var dropdown = document.getElementById("dropdown-" + i + "-0");
        var image = document.getElementById("img-" + i);
        var types = document.getElementById("types-" + i);
        var typeTxt = "";
        var txt;
        if (pokemon.length === 1) {
            txt = "<option value='" + pokemon[0] + "' disabled selected hidden>" + pokemon[0] + "</option>";
            $(image).attr("src", Model.pokemon_to_image[pokemon[0]]);
            var typesArr = Model.pokemon_to_types[pokemon[0]];
            var type = void 0;
            for (var _i = 0, typesArr_1 = typesArr; _i < typesArr_1.length; _i++) {
                type = typesArr_1[_i];
                typeTxt += "<div class='type " + type + "'>" + type + "</div>";
            }
            if (typesArr.length === 1) {
                typeTxt += "<div class='type empty'></div>";
            }
        }
        else {
            $(image).attr("src", "whosthat.png");
            txt = "<option value='' disabled selected hidden>-----</option>";
            var p = void 0;
            for (var _a = 0, pokemon_1 = pokemon; _a < pokemon_1.length; _a++) {
                p = pokemon_1[_a];
                txt += "<option>" + p + "</option>";
            }
            typeTxt += "<div class='type empty'></div><div class='type empty'></div>";
        }
        dropdown.innerHTML = txt;
        types.innerHTML = typeTxt;
    }
    Dropdown.createPokemonNameDropdown = createPokemonNameDropdown;
    function createPokemonAbilityDropdown(abilities, i) {
        var dropdown = document.getElementById("dropdown-" + i + "-1");
        var txt;
        if (abilities.length === 1) {
            txt = "<option value='" + abilities[0] + "' disabled selected hidden>" + abilities[0] + "</option>";
        }
        else {
            txt = "<option value='' disabled selected hidden>-----</option>";
            var a = void 0;
            for (var _i = 0, abilities_1 = abilities; _i < abilities_1.length; _i++) {
                a = abilities_1[_i];
                txt += "<option>" + a + "</option>";
            }
        }
        dropdown.innerHTML = txt;
    }
    Dropdown.createPokemonAbilityDropdown = createPokemonAbilityDropdown;
    function createPokemonMoveDropdown(moves, i, j) {
        var dropdown = document.getElementById("dropdown-" + i + "-" + j);
        var txt;
        if (moves.length === 1) {
            txt = "<option value='" + moves[0] + "' disabled selected hidden>" + moves[0] + "</option>";
        }
        else {
            txt = "<option value='' disabled selected hidden>-----</option>";
            var m = void 0;
            for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
                m = moves_1[_i];
                txt += "<option>" + m + "</option>";
            }
        }
        dropdown.innerHTML = txt;
    }
    Dropdown.createPokemonMoveDropdown = createPokemonMoveDropdown;
    function createPokemonItemDropdown(items, i) {
        var dropdown = document.getElementById("dropdown-" + i + "-6");
        var txt;
        if (items.length === 1) {
            txt = "<option value='" + items[0] + "' disabled selected hidden>" + items[0] + "</option>";
        }
        else {
            txt = "<option value='' disabled selected hidden>-----</option>";
            var i_1;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                i_1 = items_1[_i];
                txt += "<option>" + i_1 + "</option>";
            }
        }
        dropdown.innerHTML = txt;
    }
    Dropdown.createPokemonItemDropdown = createPokemonItemDropdown;
})(Dropdown || (Dropdown = {}));
