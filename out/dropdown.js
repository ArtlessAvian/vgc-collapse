var Dropdown;
(function (Dropdown) {
    function createPokemonNameDropdown(pokemon) {
        console.log("It worked!");
        for (var i = 0; i < 6; i++) {
            var dropdown = document.getElementById("dropdown-" + i + "-0");
            var txt = "<option value='' disabled selected hidden>-----</option>";
            var p = void 0;
            for (var _i = 0, pokemon_1 = pokemon; _i < pokemon_1.length; _i++) {
                p = pokemon_1[_i];
                txt += "<option>" + p + "</option>";
            }
            dropdown.innerHTML = txt;
        }
    }
    Dropdown.createPokemonNameDropdown = createPokemonNameDropdown;
    function createPokemonAbilityDropdown(abilities, i) {
        var dropdown = document.getElementById("dropdown-" + i + "-1");
        var txt = "<option value='' disabled selected hidden>-----</option>";
        var a;
        for (var _i = 0, abilities_1 = abilities; _i < abilities_1.length; _i++) {
            a = abilities_1[_i];
            txt += "<option>" + a + "</option>";
        }
        dropdown.innerHTML = txt;
    }
    Dropdown.createPokemonAbilityDropdown = createPokemonAbilityDropdown;
    function createPokemonMoveDropdown(moves, i, j) {
        console.log("Move");
        var dropdown = document.getElementById("dropdown-" + i + "-" + j);
        var txt = "<option value='' disabled selected hidden>-----</option>";
        var m;
        for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
            m = moves_1[_i];
            txt += "<option>" + m + "</option>";
        }
        dropdown.innerHTML = txt;
    }
    Dropdown.createPokemonMoveDropdown = createPokemonMoveDropdown;
})(Dropdown || (Dropdown = {}));
