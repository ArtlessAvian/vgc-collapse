var main;
Promise.all(Model.promises)
    .then(function () {
    main = new Collapser();
    $("#forward-1").click(function () { main.step(); });
    $("#forward-5").click(function () { main.step(); });
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0]);
    console.log("Ready!");
});
