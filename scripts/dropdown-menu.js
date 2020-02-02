$(document).ready(function() {
    $('.js-example-basic-single').select2();
});


function resetDropdownWidth() {
    $(".select2").css("width", "100%");
}


window.addEventListener("resize", resetDropdownWidth);
