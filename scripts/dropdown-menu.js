$(document).ready(function()
{
    $('.js-example-basic-single').select2();
});

function resetDropdownWidth()
{
    $(".select2").css("width", "100%");
}

function createMoveDropDowns()
{
     for (let i=0; i < 6; i++)
     {
        let moveTable = document.getElementById("move-table-" + i);
        let txt = "";

        for (let j=2; j < 6; j++)
        {
            txt += 
                '<tr>' +
                    '<td>' +
                        '<select id="dropdown-' + i + '-' + j + '" class="js-example-basic-single" name="pokemon-move">' +
                            '<option>Move 1</option>' +
                        '</select>' +
                    '</td>' +
                '</tr>';
        }
        moveTable.innerHTML += txt;
    }
}

window.addEventListener("resize", resetDropdownWidth);
createMoveDropDowns();