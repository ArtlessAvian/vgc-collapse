namespace Dropdown
{
    export function createPokemonNameDropdown<T>(pokemon : Array<T>, i : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-0");
        let txt : string;

        if (pokemon.length === 1) {
            txt = "<option value='" + pokemon[0] + "' disabled selected hidden>" + pokemon[0] + "</option>";
        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let p : T;
            for (p of pokemon)
            {
                txt += "<option>" + p + "</option>";
            }
        }
        dropdown.innerHTML = txt;

    }

    export function createPokemonAbilityDropdown<T>(abilities : Array<T>, i : number,)
    {
            // Iterate through each possible pokemon move
            let dropdown = document.getElementById("dropdown-" + i + "-1");
            let txt : string;

            if (abilities.length === 1) {
                txt = "<option value='" + abilities[0] + "' disabled selected hidden>" + abilities[0] + "</option>";
            } else
            {
                txt = "<option value='' disabled selected hidden>-----</option>";
                let a : T;
                for (a of abilities)
                {
                    txt += "<option>" + a + "</option>";
                }
            }
            dropdown.innerHTML = txt;
    }
    
    export function createPokemonMoveDropdown<T>(moves : Array<T>, i : number, j : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-" + j);
        let txt : string;
        if (moves.length === 1) {
            txt = "<option value='" + moves[0] + "' disabled selected hidden>" + moves[0] + "</option>";
        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let m : T;
            for (m of moves)
            {
                txt += "<option>" + m + "</option>";
            }    
        }
        dropdown.innerHTML = txt;        
    }

    export function createPokemonItemDropdown<T>(items : Array<T>, i : number)
    {
        let dropdown = document.getElementById("dropdown-" + i + "-6");
        let txt : string;
        if (items.length === 1) {
            txt = "<option value='" + items[0] + "' disabled selected hidden>" + items[0] + "</option>";
        } else
        {
            txt = "<option value='' disabled selected hidden>-----</option>";
            let i : T;
            for (i of items)
            {
                txt += "<option>" + i + "</option>";
            }    
        }
        dropdown.innerHTML = txt;        
    }
}
