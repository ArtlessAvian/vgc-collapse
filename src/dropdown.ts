namespace Dropdown
{
    export function createPokemonNameDropdown<T>(pokemon : Array<T>)
    {
        console.log("It worked!");

        // Iterate through each pokemon card's dropdown id
        for (let i=0; i < 6; i++)
        {
            // Iterate through each possible pokemon name
            let dropdown = document.getElementById("dropdown-" + i + "-0");
            let txt = "<option value='' disabled selected hidden>-----</option>";
            let p : T;
            for (p of pokemon)
            {
                txt += "<option>" + p + "</option>";
            }
            dropdown.innerHTML = txt;
            // dropdown.selectedIndex = -1;
        }
    }

    export function createPokemonAbilityDropdown<T>(abilities : Array<T>, i : number,)
    {
            // Iterate through each possible pokemon move
            let dropdown = document.getElementById("dropdown-" + i + "-1");
            let txt = "<option value='' disabled selected hidden>-----</option>";
            let a : T;
            for (a of abilities)
            {
                txt += "<option>" + a + "</option>";
            }
            dropdown.innerHTML = txt;
    }
    
    export function createPokemonMoveDropdown<T>(moves : Array<T>, i : number, j : number)
    {
        console.log("Move");

        // Iterate through each pokemon card's id
        // for (let i=0; i < 6; i++)
        // {
        // for (let j=2; j < 6; j++)
        // {
            // Iterate through each possible pokemon move
        let dropdown = document.getElementById("dropdown-" + i + "-" + j);
        let txt = "<option value='' disabled selected hidden>-----</option>";
        let m : T;
        for (m of moves)
        {
            txt += "<option>" + m + "</option>";
        }
        dropdown.innerHTML = txt;
        // }
        // }
        
    }
}
