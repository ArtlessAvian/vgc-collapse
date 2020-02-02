namespace Dropdown
{
    export function createPokemonNameDropdown(pokemon : Array<string>, i : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-0");
        let txt : string;

        if (pokemon.length === 1) {
            let image = document.getElementById("img-" + i);
            txt = "<option value='" + pokemon[0] + "' disabled selected hidden>" + pokemon[0] + "</option>";
            $(image).attr("src", Model.pokemon_to_image[pokemon[0]]);

        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let p : string;
            for (p of pokemon)
            {
                txt += "<option>" + p + "</option>";
            }
        }
        dropdown.innerHTML = txt;

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
