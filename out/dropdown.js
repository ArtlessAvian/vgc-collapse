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
    function createPokemonMoveDropdown(moves) {
        console.log("Move");
        for (var i = 0; i < 6; i++) {
            for (var j = 2; j < 6; j++) {
                var dropdown = document.getElementById("dropdown-" + i + "-" + j);
                var txt = "<option value='' disabled selected hidden>-----</option>";
                var m = void 0;
                for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
                    m = moves_1[_i];
                    txt += "<option>" + m + "</option>";
                }
                dropdown.innerHTML = txt;
            }
        }
    }
    Dropdown.createPokemonMoveDropdown = createPokemonMoveDropdown;
})(Dropdown || (Dropdown = {}));
