$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[1].classList.add("nav-item-active");
    });
});