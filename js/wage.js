$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[2].classList.add("nav-item-active");
    });
});