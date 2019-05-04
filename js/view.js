
var user_info; //user information struct => key:  id, pw, name, workplace,img
var timeArray;
var timeTable = document.getElementById('timetable');

$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[0].classList.add("nav-item-active");
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

    var numTimeAxis = timeAxis.length
    var numDayofWeek = 7

    for (var i = 0; i < 2 * numTimeAxis; i++) {
        var newRow = timeTable.insertRow(i + 1);
        newRow.className = "timetable-row";
        var newCell = newRow.insertCell(0);

        if (i % 2 == 0) {
            newCell.innerHTML = timeAxis[i / 2];
            newCell.className = "timetable-axis-entry";
        }

        for (var j = 0; j < numDayofWeek; j++) {
            newCell = newRow.insertCell(j + 1);

            if (i % 2 == 0) {
                newCell.className = "timetable-hour-entry";
            } else {
                newCell.className = "timetable-half-entry";
            }

            // TODO: firebase의 user 시간표 정보와 대조해서 coloring
            // TODO: remove dummy datareadFromDatabase();
            // if ((3 <= i && i <= 6) && j == 1) {
            //     newCell.classList.add("timetable-submit-slot");
            // }
            // if ((10 <= i && i <= 15) && j == 4) {
            //     newCell.classList.add("timetable-view-slot");
            // }
            // if ((10 <= i && i <= 15) && j == 5) {
            //     newCell.classList.add("timetable-view-drag-slot");
            // }
        }
    }
    readFromDatabase();

}


function readFromDatabase(){
  var thisweekValue;
  firebase.database().ref('/userpool/test1/thisweek/').once('value', function(snapshot) {
    thisweekValue = snapshot.val();
    //timeArray = Array(thisweekValue);
    console.log(thisweekValue);
    if (thisweekValue == null) {
       console.log("Empty this week");
    }
    else{
      var keyList = Object.keys(thisweekValue);
      // console.log("keyList: ", keyList);
      // console.log("timetable: ", timeTable.rows[1].cells[1]); //월 8시
      for(var j=0; j<keyList.length; j++) {
        var myKey = keyList[j];
        if (thisweekValue[myKey]=="null"){
          console.log("Empty day: ", myKey);
        }
        else {
          for (var l=0; l<thisweekValue[myKey].length; l++){
            var start=thisweekValue[myKey][l][0];
            var end=thisweekValue[myKey][l][1];
            // console.log("day: ", myKey, ", start: ", start, ", end: ", end);
            for (var i=start; i<=end; i++){
              var row = i+1;
              var day = j+1;
              //console.log(timeTable.rows[row].cells[day]);
              timeTable.rows[row].cells[day].classList.add("timetable-view-slot");
            }
          }
        }
      }
    }
  });
}

function initializeTimeTableHeader() {
    var timeTableHeader = document.getElementById('timetable-header');
    var newRow = timeTableHeader.insertRow(0);
    var newCell = newRow.insertCell(0);

    // TODO: current dates
    var dates = ['4/1', '4/2', '4/3', '4/4', '4/5', '4/6', '4/7'];

    for (var i = 0; i < 7; i++) {
        newCell = newRow.insertCell(i + 1);
        newCell.className = "timetable-header";
        newCell.innerHTML = dates[i] + "<br/><span class='timetable-header-dates'>" + days[i] + "</span>";
    }
}

console.log(window.location.href);
