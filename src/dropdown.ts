namespace Dropdown
{
    export function createPokemonNameDropdown(pokemon : Array<string>, i : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-0");
        let image = document.getElementById("img-" + i);
        let types = document.getElementById("types-" + i);
        let typeTxt = "";
        let txt : string;
        
        if (pokemon.length === 1) {
            txt = "<option value='" + pokemon[0] + "' disabled selected hidden>" + pokemon[0] + "</option>";
            $(image).attr("src", Model.pokemon_to_image[pokemon[0]]);
            let typesArr = Model.pokemon_to_types[pokemon[0]];
            let type : string;

            for (type of typesArr)
            {
                typeTxt += "<div class='type " + type + "'>" + type + "</div>";
            }

            if (typesArr.length === 1) {
                typeTxt += "<div class='type empty'></div>";
            }

        } else
        {
            $(image).attr("src", "whosthat.png");
            txt = "<option value='' disabled selected hidden>-----</option>";
            let p : string;
            for (p of pokemon)
            {
                txt += "<option>" + p + "</option>";
            }
            typeTxt += "<div class='type empty'></div><div class='type empty'></div>";
        }
        dropdown.innerHTML = txt;
        types.innerHTML = typeTxt;
    }

    export function createPokemonAbilityDropdown(abilities : Array<string>, i : number,)
    {
            // Iterate through each possible pokemon move
            let dropdown = document.getElementById("dropdown-" + i + "-1");
            let txt : string;

            if (abilities.length === 1) {
                txt = "<option value='" + abilities[0] + "' disabled selected hidden>" + abilities[0] + "</option>";
            } else
            {
                txt = "<option value='' disabled selected hidden>-----</option>";
                let a : string;
                for (a of abilities)
                {
                    txt += "<option>" + a + "</option>";
                }
            }
            dropdown.innerHTML = txt;
    }
    
    export function createPokemonMoveDropdown(moves : Array<string>, i : number, j : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-" + j);
        let txt : string;
        if (moves.length === 1) {
            txt = "<option value='" + moves[0] + "' disabled selected hidden>" + moves[0] + "</option>";
        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let m : string;
            for (m of moves)
            {
                txt += "<option>" + m + "</option>";
            }    
        }
        dropdown.innerHTML = txt;        
    }

    export function createPokemonItemDropdown(items : Array<string>, i : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-6");
        let txt : string;
        if (items.length === 1) {
            txt = "<option value='" + items[0] + "' disabled selected hidden>" + items[0] + "</option>";
        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let i : string;
            for (i of items)
            {
                txt += "<option>" + i + "</option>";
            }    
        }
        dropdown.innerHTML = txt;        
    }
}
