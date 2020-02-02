var main;
Promise.all(Model.promises)
    .then(function () {
    main = new Collapser();
    $('document').ready(function () {
        console.log("Dom Ready!");
        $("#back-1").click(function () { main.backstep(); });
        $("#forward-1").click(function () { main.step(); });
        $("#forward-5").click(function () { main.fiveStep(); });
        $("select").on("select2:selecting", function (event) {
            var pokemon = event.params.args.data.text;
            var cardNum = parseInt((this.id).charAt((this.id).length - 1));
            main.set(cardNum * 6 - 6, pokemon);
        });
    });
    function updateCard(cardNum, matrix) {
        console.log(cardNum);
        console.log(matrix);
    }
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0]);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[5]);
    console.log("Main Ready!");
});
