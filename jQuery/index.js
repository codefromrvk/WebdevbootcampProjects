// $(document).ready(function () {
//     $("h1").css("color", "blue")
// });
$("h1").click(function () {
    $("h1").css("color", "orange");
    //document.querySelector("h1").style.color = "orange";
    //both will work the same way

});

//without jQuery
for (i = 0; i < 5; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        document.querySelector("h1").style.color = 'red';

    })
}
//With jQuery
$("button").click(function () {
    $("h1").css("color", "green");
});
$(document).keypress(function (event) {
    console.log(event.key);
    $("h1").css("color", "orange");
    $("h1").text(event.key)

})