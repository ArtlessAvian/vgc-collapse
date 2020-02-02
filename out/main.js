var main;
Promise.all(Model.promises)
    .then(function () {
    main = new Collapser();
    $('document').ready(function () {
        console.log("Dom Ready!");
        $("#back-5").click(function () { for (var i = 0; i < 3 && main.backstep() >= 0; i++)
            ; updateEverything(); });
        $("#back-1").click(function () { main.backstep(); updateEverything(); });
        $("#forward-1").click(function () { main.step(); updateEverything(); });
        $("#forward-5").click(function () { for (var i = 0; i < 3 && main.step() >= 0; i++)
            ; updateEverything(); });
        $("#print").click(function () { alert(main.pos.toString()); });
        $("select").on("select2:selecting", function (event) {
            var text = event.params.args.data.text;
            var idLen = (this.id).length;
            var cardNum = parseInt((this.id).charAt(idLen - 3));
            var offset = parseInt((this.id).charAt(idLen - 1));
            main.set(cardNum * PokemonSuperposition.pokemonSize + offset, text);
            updateEverything();
        });
    });
    updateEverything();
    console.log("Main Ready!");
});
function updateCard(cardNum) {
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0 + cardNum * PokemonSuperposition.pokemonSize], cardNum);
    Dropdown.createPokemonAbilityDropdown(main.pos.matrix[1 + cardNum * PokemonSuperposition.pokemonSize], cardNum);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[2 + cardNum * PokemonSuperposition.pokemonSize], cardNum, 2);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[3 + cardNum * PokemonSuperposition.pokemonSize], cardNum, 3);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[4 + cardNum * PokemonSuperposition.pokemonSize], cardNum, 4);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[5 + cardNum * PokemonSuperposition.pokemonSize], cardNum, 5);
    Dropdown.createPokemonItemDropdown(main.pos.matrix[6 + cardNum * PokemonSuperposition.pokemonSize], cardNum);
}
function updateEverything() {
    for (var i = 0; i <= 5; i++) {
        updateCard(i);
    }
}
