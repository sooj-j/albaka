
var user_info; //user information struct => key:  id, pw, name, workplace,img
var user_id;
var timeArray;
var timeTable = document.getElementById('timetable');
var tab_id="tab1";

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
    user_id = global_params.split('uid=')[1];
    console.log("user_id: ", user_id);

    firebase.database().ref("userpool").child(user_id).once("value", function (snap) {
        user_info = snap.val();
        console.log("user_info: ")
        console.log(user_info); //user_info.id
    });
}

function initializeTimeTable() {
    console.log("intialize");
    var numRows = timeTable.rows.length;
    for(var i=0;i<numRows-1;i++) {
      timeTable.deleteRow(1);
    }

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
        }
    }
    readFromDatabase();
}

function readFromDatabase(){
  var tabValue;
  var dbDIR = '/userpool/'+user_id+'/nextweek/';
  var colorValue;
  if (tab_id == "submitted"){
    dbDIR = dbDIR + 'submitted/';
    colorValue = "timetable-submit-slot";
    console.log("dbDIR: ", dbDIR);
  }
  else{
    dbDIR = dbDIR + 'tab/'+tab_id+'/';
    colorValue = "timetable-tab-slot";
    console.log("dbDIR: ", dbDIR);
  }
  firebase.database().ref(dbDIR).once('value', function(snapshot) {
    tabValue = snapshot.val();
    console.log(tabValue);
    if (tabValue == null) {
       console.log("Empty this week");
    }
    else{
      var keyList = Object.keys(tabValue);
      console.log("keyList: ", keyList);
      //console.log("timetable: ", timeTable.rows[1].cells[1]); //월 8시
      for(var j=0; j<keyList.length; j++) {
        var myKey = keyList[j];
        console.log(tabValue[myKey]);
        if (tabValue[myKey]=="null"){
          console.log("Empty day: ", myKey);
        }
        else {
          for (var l=0; l<tabValue[myKey].length; l++){
            var start=tabValue[myKey][l][0];
            var end=tabValue[myKey][l][1];
            // console.log("day: ", myKey, ", start: ", start, ", end: ", end);
            for (var i=start; i<=end; i++){
              var row = i+1;
              var day = j+1;
              //console.log(timeTable.rows[row].cells[day]);
              timeTable.rows[row].cells[day].classList.add(colorValue);
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

function tabsubmit() {
  tab_id = "submitted";
  initializeTimeTable();
}

function tab1() {
  tab_id = "tab1";
  initializeTimeTable();
}

function tab2() {
  tab_id = "tab2";
  initializeTimeTable();
}

function tabAdd() {
  tab_id = "tab3";
  var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/';
  firebase.database().ref(dbDIR).set({
      0: "null",
      1: "null",
      2: "null",
      3: "null",
      4: "null",
      5: "null",
      6: "null"
  });
  initializeTimeTable();
}

console.log(window.location.href);
