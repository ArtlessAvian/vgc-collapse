var Dropdown;
(function (Dropdown) {
    function createPokemonNameDropdown(pokemon) {
        console.log("It worked!");
        console.log(pokemon);
        for (var i = 1; i <= 6; i++) {
            var dropdown = document.getElementById("dropdown-name-" + i);
            var txt = "<option value='' disabled selected hidden>Choose Pok&eacute;mon</option>";
            var p = void 0;
            for (var _i = 0, pokemon_1 = pokemon; _i < pokemon_1.length; _i++) {
                p = pokemon_1[_i];
                txt += "<option>" + p + "</option>";
            }
            dropdown.innerHTML = txt;
        }
    }
    Dropdown.createPokemonNameDropdown = createPokemonNameDropdown;
    function createPokemonMoveDropdown() {
        console.log("Move");
    }
    Dropdown.createPokemonMoveDropdown = createPokemonMoveDropdown;
})(Dropdown || (Dropdown = {}));
