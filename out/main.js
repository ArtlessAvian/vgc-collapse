var main;
Promise.all(Model.promises)
    .then(function () {
    main = new Collapser();
    $('document').ready(function () {
        console.log("Dom Ready!");
        $("#forward-1").click(function () { main.step(); });
        $("#forward-5").click(function () { main.fiveStep(); });
        $(".select2").on("select2:selecting", function (event) {
            console.log(event);
        });
    });
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0]);
    console.log("Main Ready!");
});
