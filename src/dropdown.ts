namespace Dropdown
{
    export function createPokemonNameDropdown<T>(pokemon : Array<T>)
    {
        console.log("It worked!");

        // Iterate through each pokemon card's dropdown id
        for (let i=1; i <= 6; i++)
        {
            // Iterate through each possible pokemon name
            let dropdown = document.getElementById("dropdown-name-" + i);
            let txt = "<option value='' disabled selected hidden>-----</option>";
            let p : T;
            for (p of pokemon) {
                txt += "<option>" + p + "</option>";
            }
            dropdown.innerHTML = txt;
            // dropdown.selectedIndex = -1;
        }
    }
    
    export function createPokemonMoveDropdown()
    {
        console.log("Move");
    }
}
