var main;
Promise.all(Model.promises)
    .then(function () {
    main = new Collapser();
    $('document').ready(function () {
        console.log("Dom Ready!");
        $("#back-1").click(function () {
            main.backstep();
        });
        $("#forward-1").click(function () { main.step(); updateEverything(); });
        $("#forward-5").click(function () { main.fiveStep(); updateEverything(); });
        $("select").on("select2:selecting", function (event) {
            var text = event.params.args.data.text;
            var idLen = (this.id).length;
            if (idLen > 15) {
                var cardNum = parseInt((this.id).charAt(idLen - 3));
                var attNum = parseInt((this.id).charAt(idLen - 1));
                main.set(cardNum * 6 - 6 + attNum + 1, text);
            }
            else {
                var cardNum = parseInt((this.id).charAt(idLen - 1));
                main.set(cardNum * 6 - 6, text);
            }
        });
    });
    function updateEverything() {
        for (var i = 1; i <= 6; i++) {
            this.updateCard(i);
        }
    }
    function updateCard(cardNum, matrix) {
        console.log(cardNum);
        console.log(matrix);
    }
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0]);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[5]);
    console.log("Main Ready!");
});
