
var user_info; //user information struct => key:  id, pw, name, workplace,img
$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[1].classList.add("nav-item-active");
    });

    findUser();

    initializeTimeTableHeader();
    initializeTimeTable();
});

function findUser() {
    global_params = window.location.href.split('?')[1];

    id = global_params.split('uid=')[1];

    firebase.database().ref("userpool").child(id).once("value", function (snap) {
        user_info = snap.val();
        console.log("user_info: ")
        console.log(user_info); //user_info.id
    });

}

function initializeTimeTable() {
    console.log("intialize");
    var timeTable = document.getElementById('timetable');
    var numTimeAxis = timeAxis.length
    var numDayofWeek = 7

    for (var i = 0; i < 2 * numTimeAxis; i++) {
        var newRow = timeTable.insertRow(i + 1);
        newRow.className = "smtimetable-row";
        var newCell = newRow.insertCell(0);

        if (i % 2 == 0) {
            newCell.innerHTML = timeAxis[i / 2];
            newCell.className = "smtimetable-axis-entry";
        }

        for (var j = 0; j < numDayofWeek; j++) {
            newCell = newRow.insertCell(j + 1);

            if (i % 2 == 0) {
                newCell.className = "smtimetable-hour-entry";
            } else {
                newCell.className = "smtimetable-half-entry";
            }

            // TODO: firebase의 user 시간표 정보와 대조해서 coloring
            // TODO: remove dummy data
            if ((3 <= i && i <= 6) && j == 1) { //화 9:30-11:30
                newCell.classList.add("smtimetable-submit-slot");
            }
            if ((10 <= i && i <= 15) && j == 4) { //금 13:00-16:00
                newCell.classList.add("smtimetable-view-slot");
            }
            if ((10 <= i && i <= 15) && j == 5) { //토 13:00-16:00
                newCell.classList.add("smtimetable-view-drag-slot");
            }
        }
    }
}

function initializeTimeTableHeader() {
    var timeTableHeader = document.getElementById('timetable-header');
    var newRow = timeTableHeader.insertRow(0);
    var newCell = newRow.insertCell(0);

    // TODO: current dates
    var dates = ['4/1', '4/2', '4/3', '4/4', '4/5', '4/6', '4/7'];

    for (var i = 0; i < 7; i++) {
        newCell = newRow.insertCell(i + 1);
        newCell.className = "smtimetable-header";
        newCell.innerHTML = dates[i] + "<br/><span class='smtimetable-header-dates'>" + days[i] + "</span>";
    }
}

console.log(window.location.href);
