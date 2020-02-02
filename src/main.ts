let main : Collapser;

Promise.all(Model.promises)
.then(function() {
    main = new Collapser();

    $('document').ready(function() { 
        console.log("Dom Ready!")
        
        $("#back-5").click(function() {for (let i = 0; i < 5 && main.backstep() >= 0; i++); updateEverything();});
        $("#back-1").click(function() {main.backstep(); updateEverything();});
        $("#forward-1").click(function() {main.step(); updateEverything();});
        $("#forward-5").click(function() {for (let i = 0; i < 5 && main.step() >= 0; i++); updateEverything();});
        // $("select/").select(function(event) {})
        $("select").on("select2:selecting", function(event) {
            // console.log(event, this);
            let text = event.params.args.data.text;
            let idLen = (this.id).length;
            let cardNum = parseInt((this.id).charAt(idLen-3));
            let offset = parseInt((this.id).charAt(idLen-1));
            main.set(cardNum * 6 + offset, text);
            updateEverything();
        }); //main.update
    });

    updateEverything();

    console.log("Main Ready!");
})

function updateCard(cardNum : number) {
    Dropdown.createPokemonNameDropdown(main.pos.matrix[0 + cardNum * 6], cardNum);
    Dropdown.createPokemonAbilityDropdown(main.pos.matrix[1 + cardNum * 6], cardNum);    
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[2 + cardNum * 6], cardNum, 2);    
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[3 + cardNum * 6], cardNum, 3);    
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[4 + cardNum * 6], cardNum, 4);    
    Dropdown.createPokemonMoveDropdown(main.pos.matrix[5 + cardNum * 6], cardNum, 5);    
}

function updateEverything()
{
    for (let i = 0; i <= 5; i++)
    {
        updateCard(i)
    }
}
