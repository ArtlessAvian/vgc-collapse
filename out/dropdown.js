var Dropdown;
(function (Dropdown) {
    function createPokemonNameDropdown(pokemon) {
        console.log("It worked");
        console.log(pokemon);
    }
    Dropdown.createPokemonNameDropdown = createPokemonNameDropdown;
    function createPokemonMoveDropdown() {
        console.log("Move");
    }
    Dropdown.createPokemonMoveDropdown = createPokemonMoveDropdown;
})(Dropdown || (Dropdown = {}));
