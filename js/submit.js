var user_info; //user information struct => key:  id, pw, name, workplace,img
var user_id;
var timeArray;
var timeTable = document.getElementById('timetable');
var tab_id = "tab1";
var cellList = [];


$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[1].classList.add("nav-item-active");
    });
    findUser().then(function () {
        initializeTimeTableHeader();
        initializeTimeTable();
    });
    cellList=[];


    //copyDatabase2cellList();
    //showcellList();


});

$(function () {
  var isMouseDown = false;
  var dragged = [];
  $(document).on('mousedown','.timetable-entry',function() {
    console.log("mousedown");
    dragged=[];
    isMouseDown = true;
    console.log(isMouseDown);
    if ((! this.classList.contains("timetable-tab-slot")) && (tab_id !="submitted")){
      dragged.push(this);
      console.log("mousedown: ", this); //cell
      $(this).toggleClass("timetable-tab-drag-slot");
      //$(this).addClass("timetable-tab-drag-slot");
      return false; // prevent text selection
    }
  });

  $(document).on('mouseover','.timetable-entry',function() {
    if (isMouseDown) {
      if ((! this.classList.contains("timetable-tab-slot"))  && (tab_id !="submitted")){
        console.log("mouseover: ", this);
        dragged.push(this);
        $(this).toggleClass("timetable-tab-drag-slot");
        //$(this).addClass("timetable-tab-drag-slot");
      }
    }
  });

  $(document).on('mouseup','.timetable-entry',function() {
    isMouseDown = false;
    console.log("mouseup");
    for(var i=0;i<dragged.length;i++) {
        $(dragged[i]).toggleClass("timetable-tab-drag-slot");
        //$(dragged[i]).addClass("timetable-tab-drag-slot");
        //$(dragged[i]).classList.remove("timetable-tab-drag-slot");
    }
    if (tab_id != "submitted" && dragged.length > 1){
      console.log(dragged);
      pushToDatabase(dragged);
      dragged=[];
      initializeTimeTable();
      readFromDatabase();
    }
  });
});

function pushToDatabase(drag) {
  console.log("pushToDatabase");
  startCell = drag[0];
  endCell = drag[drag.length-1];
  if (startCell == endCell){
    console.log("1 cell");
  }
  else {
    //day: startCell.cellIndex
    //time: time2Row($(startCell).parent())[0].cells[0].id) ~ time2Row($(endCell).parent())[0].cells[0].id)
    var day = startCell.cellIndex-1;
    s_row = time2Row(($(startCell).parent())[0].cells[0].id);
    e_row = time2Row(($(endCell).parent())[0].cells[0].id);
    add2cellList(day, s_row, e_row, drag);
    //copycellList2Database();
    var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/'+day;
    for(var i=0; i<cellList[day].length; i++) {
      firebase.database().ref(dbDIR+'/'+i).set({
        0: cellList[day][i][0],
        1: cellList[day][i][1]
      });
    }
  }
}


function findUser() {
    global_params = window.location.href.split('?')[1];
    user_id = global_params.split('uid=')[1];
    console.log("user_id: ", user_id);

    return firebase.database().ref("userpool").child(user_id).once("value", function (snap) {
        user_info = snap.val();
        console.log("user_info: ")
        console.log(user_info); //user_info.id
    });
}

function initializeTimeTable() {
    console.log("intialize");
    var numRows = timeTable.rows.length;
    for(var i=0;i<numRows-1;i++) { timeTable.deleteRow(1); }
    cellList = [];

    var numTimeAxis = timeAxis.length;
    var numDayofWeek = 7;

    for (var i = 0; i < 2 * numTimeAxis; i++) {
        var newRow = timeTable.insertRow(i + 1);
        newRow.className = "timetable-row";
        var newCell = newRow.insertCell(0);

        if (i % 2 == 0) {
            newCell.innerHTML = timeAxis[i / 2];
            newCell.className = "timetable-axis-entry";
            newCell.id = timeAxis[i / 2];
        }
        else{
            newCell.id = time30Axis[(i-1) / 2];
        }

        for (var j = 0; j < numDayofWeek; j++) {
            newCell = newRow.insertCell(j + 1);
            if (i % 2 == 0) {
              newCell.className = "timetable-entry";
              newCell.classList.add("timetable-hour-entry");
                // newCell.className = "timetable-hour-entry";
                // newCell.classList.add("timetable-entry");
            } else {
                newCell.className = "timetable-half-entry";
                newCell.classList.add("timetable-entry");
            }
        }
    };
    //showcellList();
    drawCompetitionRate();
    readFromDatabase();
}
function drawCompetitionRate() {
    console.log("draw");
    var dbDIR = '/workplace/' + user_info.workplace + '/CompetitionRate/';
    var colorValue;
    if (tab_id == "submitted") {
        //do nothing
    }
    else {
        firebase.database().ref(dbDIR).once('value', function (snapshot) {
            rates = snapshot.val();
            for (var j = 0; j < 7; j++) {
                var day_rate = rates[j].split(',');
                var day = j + 1;

                for (var i = 0; i < 38; i++) {
                    var row = i + 1;
                    if (day_rate[i] == 0) {
                        continue;
                    } else if (day_rate[i] == 1) {
                        colorValue = "timetable-rate-1";
                    } else if (day_rate[i] == 2) {
                        colorValue = "timetable-rate-2";
                    } else {
                        colorValue = "timetable-rate-3";
                    }
                    timeTable.rows[row].cells[day].classList.add(colorValue);
                }
            }
        });
    };
}

function deleteBlock(t){
  console.log("deleteBlock: ",t);
  console.log($(t).parent()[0]); // start cell
  var newDay = -1;
  var newIndex = -1;
  for(var i=0; i<cellList.length; i++) {
    for(var j=0; j<cellList[i].length; j++) {
      if(cellList[i][j][2][0] == $(t).parent()[0]){
        newDay = i;
        newIndex = j;
        console.log(cellList[i][j]);
      }
    }
  };
  cellList[newDay].splice(newIndex,1);
  //copycellList2Database();
  var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/'+newDay;
  if (cellList[newDay].length == 0){
    console.log("empty day");
    firebase.database().ref(dbDIR).update({
        0: "null"
      });
  }
  else{
    var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/'+newDay;
    for(var i=0; i<cellList[newDay].length; i++) {
      firebase.database().ref(dbDIR+'/'+i).set({
        0: cellList[newDay][i][0],
        1: cellList[newDay][i][1]
      });
    }
  }
  //initializeTimeTable();
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
    if (tabValue == null) {
       console.log("Empty this week");
    }
    else{
      var keyList = Object.keys(tabValue);
      console.log("keyList: ", keyList);
      //console.log("timetable: ", timeTable.rows[1].cells[1]); //월 8시
      for(var j=0; j<keyList.length; j++) {
        var myKey = keyList[j];
        var dayblock = [];
        console.log("in readFromDatabase, myKey: ",myKey, "tableValue[myKey]: ", tabValue[myKey]);
        if (tabValue[myKey]=="null"){
          console.log("Empty day: ", myKey);
        }
        else {
          for (var l=0; l<tabValue[myKey].length; l++){
            var cellblock = [];
            var start=tabValue[myKey][l][0];
            var end=tabValue[myKey][l][1];
            // console.log("day: ", myKey, ", start: ", start, ", end: ", end);
            for (var i=start; i<=end; i++){
              var row = i+1;
              var day = j+1;
              //console.log(timeTable.rows[row].cells[day]);
              timeTable.rows[row].cells[day].classList.add(colorValue);
              cellblock.push(timeTable.rows[row].cells[day]);
              if (i == start){
                if (start % 2 == 0){s_time = timeAxis[start/2];}
                else {s_time = time30Axis[(start-1) / 2];}
                if ((end+1) % 2 == 0){e_time = timeAxis[(end+1)/2];}
                else {e_time = time30Axis[end / 2];}
                t_time = (end+1-start)/2;
                timeTable.rows[row].cells[day].innerHTML = s_time + " ~ "+ e_time +" "+ Number(t_time)+"H"+" "+'<i class="fas fa-times" float:"right" onclick="deleteBlock(this)"></i>';
              }
            }
            if (cellblock.length >= 1){dayblock.push([start, end, cellblock]);}
          }
        }
        cellList[myKey]=dayblock;
      }
      console.log("cellList: ", cellList);
    }
  });
}

function initializeTimeTableHeader() {
    var timeTableHeader = document.getElementById('timetable-header');
    var newRow = timeTableHeader.insertRow(0);
    var newCell = newRow.insertCell(0);

    // TODO: current dates
    var dates = ['4/8', '4/9', '4/10', '4/11', '4/12', '4/13', '4/14'];

    for (var i = 0; i < 7; i++) {
        newCell = newRow.insertCell(i + 1);
        newCell.className = "timetable-header";
        newCell.innerHTML = dates[i] + "<br/><span class='timetable-header-dates'>" + days[i] + "</span>";
    }
}

function tabsubmit() {
  copycellList2Database();
  tab_id = "submitted";
  //copyDatabase2cellList();
  initializeTimeTable();
}

function tab1() {
  copycellList2Database();
  tab_id = "tab1";
  //copyDatabase2cellList();
  initializeTimeTable();
}

function tab2() {
  copycellList2Database();
  tab_id = "tab2";
  // copyDatabase2cellList();
  initializeTimeTable();
}

function tabAdd() {
  copycellList2Database();
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
  //cellList = [];
  copyDatabase2cellList();
  initializeTimeTable();
}

function submit() {
  var dbDIR = '/userpool/'+user_id+'/nextweek/submitted/';
  console.log("Init submit");
  for(var i=0; i<cellList.length; i++){
    console.log(cellList[i]);
    if (cellList[i].length == 0){
      console.log("empty day");
      firebase.database().ref(dbDIR+i).set({
          0: "null"
        });
    }
    else{
      for(var j=0; j<cellList[i].length; j++) {
        console.log("i: ",i,", j: ",j);
        firebase.database().ref(dbDIR+i+'/'+j+'/').set({
          0: cellList[i][j][0],
          1: cellList[i][j][1]
        });
      }
    }
  }
  alert("Submit Completed!");

};

console.log(window.location.href);




/* Don't remove below codes */

function showcellList() {
  var timeTable = document.getElementById('timetable');
  console.log("showcellList");
  var colorValue;
  if (tab_id == "submitted"){ colorValue = "timetable-submit-slot"; }
  else{ colorValue = "timetable-tab-slot"; }

  if (cellList.length == 0) { console.log("Empty this week"); }
  else{
    for(var j=0; j<cellList.length; j++) {
      if (cellList[j].length == 0){ console.log("Empty day: ", j); }
      else {
        for (var l=0; l<cellList[j].length; l++){
          var start=cellList[j][0];
          var end=cellList[j][1];
          for (var i=start; i<=end; i++){
            var row = i+1;
            var day = j+1;
              //console.log(timeTable.rows[row].cells[day]);
            timeTable.rows[row].cells[day].classList.add(colorValue);
            if (i == start){
              if (start % 2 == 0){s_time = timeAxis[start/2];}
              else {s_time = time30Axis[(start-1) / 2];}
              if ((end+1) % 2 == 0){e_time = timeAxis[(end+1)/2];}
              else {e_time = time30Axis[end / 2];}
              t_time = (end+1-start)/2;
              timeTable.rows[row].cells[day].innerHTML = s_time + " ~ "+ e_time +" "+ Number(t_time)+"H"+" "+'<i class="fas fa-times" float:"right" onclick="deleteBlock(this)"></i>';
            }
          }
        }
      }
    }
  }
}

function add2cellList(day, startRow, endRow, drag){
  cellList[day].push([startRow, endRow, drag]);
  cellList[day].sort(function (a, b) {
    if (a[0] > b[0]) {return 1;}
    if (a[0] < b[0]) {return -1;}
    return 0;
  });
  console.log(cellList[day]);
  var newIndex = cellList[day].findIndex(function (a) {
    return (a[0] == startRow && a[1] == endRow);
  });
  if (newIndex != cellList[day].length -1){ //not the last element
    if (cellList[day][newIndex][1] + 1 == cellList[day][newIndex+1][0]){
      cellList[day][newIndex][1] = cellList[day][newIndex+1][1]
      cellList[day][newIndex][2] = cellList[day][newIndex][2].concat(cellList[day][newIndex+1][2])
      cellList[day].splice(newIndex+1,1);
      console.log("merge1 cellList: ", cellList[day]);
    }
  }
  if (newIndex != 0){
    if (cellList[day][newIndex-1][1] + 1 == cellList[day][newIndex][0]){
      cellList[day][newIndex-1][1] = cellList[day][newIndex][1]
      cellList[day][newIndex-1][2] = cellList[day][newIndex-1][2].concat(cellList[day][newIndex][2])
      cellList[day].splice(newIndex,1);
      console.log("merge2 cellList: ", cellList[day]);
    }
  }
}

function copyDatabase2cellList(){
  console.log("start copyDatabase2cellList");
  cellList = [];
  var tabValue;
  var dbDIR = '/userpool/'+user_id+'/nextweek/';
  if (tab_id == "submitted"){
    dbDIR = dbDIR + 'submitted/';
    //colorValue = "timetable-submit-slot";
    console.log("dbDIR: ", dbDIR);
  }
  else{
    dbDIR = dbDIR + 'tab/'+tab_id+'/';
    //colorValue = "timetable-tab-slot";
    console.log("dbDIR: ", dbDIR);
  }
  firebase.database().ref(dbDIR).once('value', function(snapshot) {
    tabValue = snapshot.val();
    if (tabValue == null) { console.log("Empty this week"); }
    else{
      var keyList = Object.keys(tabValue);
      console.log("keyList: ", keyList);
      //console.log("timetable: ", timeTable.rows[1].cells[1]); //월 8시
      for(var j=0; j<keyList.length; j++) {
        var myKey = keyList[j];
        var dayblock = [];
        console.log("myKey: ",myKey, "tableValue[myKey]: ", tabValue[myKey]);
        if (tabValue[myKey] == "null" || tabValue[myKey][0] == "null"){ console.log("Empty day: ", myKey); }
        else {
          for (var l=0; l<tabValue[myKey].length; l++){
            var cellblock = [];
            var start=tabValue[myKey][l][0];
            var end=tabValue[myKey][l][1];
            for (var i=start; i<=end; i++){
              cellblock.push(timeTable.rows[i+1].cells[j+1]);
            }
            if (cellblock.length >= 1){dayblock.push([start, end, cellblock]);}
          }
        }
        cellList[myKey]=dayblock;
      }
      console.log("cellList: ", cellList);
    }
    console.log("end copyDatabase2cellList");
    showcellList();
  });
  //showcellList();
  return cellList;
}

function copycellList2Database(){
  console.log("start copycellList2Database");
  for(var i=0; i<cellList.length; i++){
    var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/'+i;
    if (cellList[i].length == 0){
      console.log("empty day");
      firebase.database().ref(dbDIR).update({
          0: "null"
        });
    }
    else{
      var dbDIR = '/userpool/'+user_id+'/nextweek/tab/'+tab_id+'/'+i;
      for(var j=0; j<cellList[i].length; j++) {
        firebase.database().ref(dbDIR+'/'+j).set({
          0: cellList[i][j][0],
          1: cellList[i][j][1]
        });
      }
    }
  }
}
