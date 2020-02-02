let main : Collapser;

Promise.all(Model.promises)
.then(function() {
    main = new Collapser();

    $('document').ready(function() { 
        console.log("Dom Ready!")
        
        $("#back-1").click(function() {main.backstep()});
        $("#forward-1").click(function() {main.step()});
        $("#forward-5").click(function() {main.fiveStep()});
        // $("select/").select(function(event) {})
        $("select").on("select2:selecting", function(event) {
            // console.log(event, this);
            let pokemon = event.params.args.data.text;
            let cardNum = (this.id).charAt((this.id).length-1);
            // console.log(pokemon);
            // console.log(cardNum);
        }); //main.update
    });


    Dropdown.createPokemonNameDropdown(main.pos.matrix[0])

    console.log("Main Ready!");
})
