let main : Collapser;

Promise.all(Model.promises)
.then(function() {
    main = new Collapser();

    $('document').ready(function() { 
        console.log("Dom Ready!")
        
        $("#back-1").click(function()
        {
            main.backstep()
        });
        $("#forward-1").click(function() {main.step(); updateEverything();});
        $("#forward-5").click(function() {main.fiveStep(); updateEverything();});
        // $("select/").select(function(event) {})
        $("select").on("select2:selecting", function(event) {
            // console.log(event, this);
            let text = event.params.args.data.text;
            let idLen = (this.id).length;
            if (idLen > 15)
            {
                let cardNum = parseInt((this.id).charAt(idLen-3));
                let attNum = parseInt((this.id).charAt(idLen-1));
                main.set(cardNum * 6 - 6 + attNum + 1, text);
            } else
            {
                let cardNum = parseInt((this.id).charAt(idLen-1));
                main.set(cardNum * 6 - 6, text);
            }
        }); //main.update
    });

    // console.log(main.pos.matrix)
    function updateEverything()
    {
        for (let i = 1; i <= 6; i++)
        {
            this.updateCard(i)
        }
    }

    function updateCard(cardNum : number, matrix : string[][]) {
        console.log(cardNum);
        console.log(matrix);

        // 0 is pokemon name
        // 1 is ability
        // [2-5] are moves (2, 3, 4, 5)
        // matrix[]
    }

    Dropdown.createPokemonNameDropdown(main.pos.matrix[0]);
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[5]);

    console.log("Main Ready!");
})
