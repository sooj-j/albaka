
var user_info; //user information struct => key:  id, pw, name, workplace,img
var user_id;
var timeArray;
var timeTable = document.getElementById('timetable');
var cellList =[];

var requestSentCellList = [[], [], [], [], [], [], []];
var requestReceivedCellList = [[], [], [], [], [], [], []];
var dragged = [];
var timers = [];

var currentRequestDay = null;
var currentRequestKey = null;

/* TODO: change to object */
var currentRequestReceivedDay = null;
var currentRequestReceivedKey = null;
var currentRequestReceivedCellblock = null;

const modalWidth = 300
const modalHeight = 265

const rewardToIconHTML = {
  'coffee': ' <i class="fas fa-coffee"></i>',
  'beer': ' <i class="fas fa-beer"></i>',
  'chicken': ' <i class="fas fa-drumstick-bite"></i>',
  'meal': ' <i class="fas fa-concierge-bell"></i>'
}

$(document).ready(function () {
    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[0].classList.add("nav-item-active");
    });

    findUser();
    initializeTimeTableHeader();
    initializeTimeTable();

    setDraggingSelector();

    /* click replacement modal close button */
    $('#btn-close-replacement-modal').click(function() {
      $("#overlay").css("display", "none");
      $("#replacement-modal").css("display", "none");
      $("#reward-modal").css("display", "none");
      
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    });

    /* click accept modal close button */
    $('#btn-close-accept-modal').click(function() {
      $("#accept-modal").css("display", "none");
    });

    $('#btn-close-receive-replacement-modal').click(function() {
      closeReceiveReplacementModal();
    })

    /* click replacement modal send all requests button */
    $("#btn-send-all-requests").click(function() {
      timers = [];

      pushRequestToDatabase(dragged, ['wait', 'wait', 'wait']);
      $("#btn-send-all-requests").html('CANCEL all requests');

      var requestStatus = $(".btn-request-status-yet")

      for (var i = 0; i < requestStatus.length; i++) {
        requestStatus[i].classList.remove("btn-request-status-yet");
        requestStatus[i].classList.add("btn-request-status-wait");
        requestStatus[i].innerHTML = 'waiting';
      }

      var timeStatusChange = 2000;
      var requestReward = $(".btn-request-reward");

      changeStatusToReject(requestStatus[0], requestReward[0], timeStatusChange);
      changeStatusToReject(requestStatus[1], requestReward[1], timeStatusChange * 2);
      changeStatusToReject(requestStatus[2], requestReward[2], timeStatusChange * 3);

      var timer = setTimeout(openRewardModal, timeStatusChange * 3);
      timers.push(timer);
    })

    /* change reward modal select */
    $("#select-reward").on('change', function() {
      if (this.value == "none") {
        $("#btn-send-reward").prop("disabled", true);
      } else {
        $("#btn-send-reward").prop("disabled", false);
      }
    });

    /* click reward modal send button  */
    $("#btn-send-reward").click(function() {
      $("#reward-modal").css("display", "none");

      var requestStatus = $(".btn-request-status-reject");
      for (var i = 0; i < requestStatus.length; i++) {
        requestStatus[i].classList.remove("btn-request-status-reject");
        requestStatus[i].classList.add("btn-request-status-wait");
        requestStatus[i].innerHTML = 'waiting';
      }

      var dbDIR = '/userpool/'+user_id+'/requestSent/'+currentRequestDay+'/'+currentRequestKey;
      firebase.database().ref(dbDIR).once('value', function(snapshot) {
        requestValue = snapshot.val();
        message = "Dayeon accepted the replacement on <br/><strong>"+days[currentRequestDay]+" "+getTimeBar(requestValue[0], requestValue[1])+"</strong>"
        var timer = setTimeout(function() {
          openAcceptModal(message);
        }, 2500);
        timers.push(timer);
      });
    });

    $("#btn-accept-request").click(function() {
      pushThisweekToDatabase(currentRequestReceivedCellblock);
      deleteRequestReceived();
      closeReceiveReplacementModal();
    })

    $("#btn-reject-request").click(function() {
      pendRequestReceived();
      closeReceiveReplacementModal();
    })
});

function closeReceiveReplacementModal() {
  $("#overlay").css("display", "none");
  $("#receive-replacement-modal").css("display", "none");
}

/* if user reject the replacement request, then pend in inbox */
function pendRequestReceived() {
  var requestdbDIR = '/userpool/'+user_id+'/requestReceived/'+currentRequestReceivedDay+'/'+currentRequestReceivedKey;
  firebase.database().ref(requestdbDIR).update({
    isPending: true,
  });
  initializeTimeTable();
}

function changeStatusToReject(status, reward, time) {
  timer = setTimeout(function() {
    status.classList.remove("btn-request-status-wait");
    status.classList.add("btn-request-status-reject");
    status.innerHTML = "rejected";
    reward.style.display = "block";
  }, time);
  timers.push(timer);
}

function findUser() {
    global_params = window.location.href.split('?')[1];
    user_id = global_params.split('uid=')[1];
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
            newCell.id = timeAxis[i / 2];
        }
        else{
            newCell.id = time30Axis[(i-1) / 2];
        }

        for (var j = 0; j < numDayofWeek; j++) {
            newCell = newRow.insertCell(j + 1);

            if (i % 2 == 0) {
                newCell.className = "timetable-hour-entry";
                newCell.classList.add("timetable-entry");
                // newCell.className = "timetable-entry";
            } else {
                newCell.className = "timetable-half-entry";
                newCell.classList.add("timetable-entry");
            }
        }
    }
    readThisweekFromDatabase();
    readRequestSentFromDatabase();
    readRequestReceivedFromDatabase();
}

function readThisweekFromDatabase(){
  var thisweekValue;
  var dbDIR = '/userpool/'+user_id+'/thisweek/';
  console.log("dbDIR", dbDIR);
  cellList =[];
  firebase.database().ref(dbDIR).once('value', function(snapshot) {
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
            var cellblock=[]
            var start=thisweekValue[myKey][l][0];
            var end=thisweekValue[myKey][l][1];
            // console.log("day: ", myKey, ", start: ", start, ", end: ", end);
            for (var i=start; i<=end; i++){
              var row = i+1;
              var day = j+1;
              //console.log(timeTable.rows[row].cells[day]);
              timeTable.rows[row].cells[day].classList.add("timetable-view-slot");
              cellblock.push(timeTable.rows[row].cells[day]);
              if (i == start){
                if (start % 2 == 0){
                  s_time = timeAxis[start/2];
                }
                else {
                  s_time = time30Axis[(start-1) / 2];
                }
                if ((end+1) % 2 == 0){
                  e_time = timeAxis[(end+1)/2];
                }
                else {
                  e_time = time30Axis[end / 2];
                }
                timeTable.rows[row].cells[day].innerHTML = s_time + " ~ "+ e_time;
              }
            }
            if (cellblock.length >= 1){cellList.push(cellblock);}
          }
        }
      }
      console.log("cellList: ", cellList);
    }
  });
}

/* TODO: merge with readThisweekFromDatabase */

function readRequestSentFromDatabase(){
  function storeToList(dayKey, data) {
    requestSentCellList[dayKey].push(data);
  }

  readFromDatabase(storeToList, '/userpool/'+user_id+'/requestSent/', "timetable-view-drag-slot")
}

function readRequestReceivedFromDatabase(){
  function storeToList(dayKey, data) {
    requestReceivedCellList[dayKey].push(data);
  }

  readFromDatabase(storeToList, '/userpool/'+user_id+'/requestReceived/', "timetable-view-request-received-slot", true)
}

function readFromDatabase(storeToList, dbDIR, className, isRequestReceived) {
  var requestValue;
  firebase.database().ref(dbDIR).once('value', function(snapshot) {
    requestValue = snapshot.val();
    if (requestValue == null) {
       console.log("Empty request");
       return;
    }

    var keyList = Object.keys(requestValue);  
    keyList.forEach((dayKey) => {
      if (requestValue[dayKey] == "null") {
        console.log("Empty request day: ", dayKey);
        return;
      }

      var rcKeyList = Object.keys(requestValue[dayKey]);
      rcKeyList.forEach((rcKey) => {
        var requestComponent = requestValue[dayKey][rcKey]

        if (isRequestReceived && requestComponent.isPending) {
          // TODO: push in inbox
          return;
        }

        var cellblock=[]
        var start=requestComponent[0];
        var end=requestComponent[1];

        for (var i = start; i <= end; i ++){
          var row = i+1;
          var day = Number(dayKey) + 1;
          timeTable.rows[row].cells[day].classList.add(className);
          cellblock.push(timeTable.rows[row].cells[day]);
          if (i == start){
            timeTable.rows[row].cells[day].innerHTML = getTimeBar(start, end);
            if (isRequestReceived && rewardToIconHTML[requestComponent['reward']]) {
              timeTable.rows[row].cells[day].innerHTML += rewardToIconHTML[requestComponent['reward']];
            }
          }
        }
        if (cellblock.length >= 1) {
          storeToList(dayKey, {
            key: rcKey,
            cellblock: cellblock,
          });
        }
      })
    })
  });
}

function getTimeBar(start, end) {
  if (start % 2 == 0){
    s_time = timeAxis[start/2];
  } else {
    s_time = time30Axis[(start-1) / 2];
  }

  if ((end+1) % 2 == 0){
    e_time = timeAxis[(end+1)/2];
  } else {
    e_time = time30Axis[end / 2];
  }

  return s_time + " ~ "+ e_time;
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

function findCurrentRequestReceived(element) {
    var day = element.cellIndex-1;

    requestReceivedCellList[day].forEach((requestData) => {
      if (requestData.cellblock.includes(element)) {
        currentRequestReceivedDay = day;
        currentRequestReceivedKey = requestData.key;
        currentRequestReceivedCellblock = requestData.cellblock;
        return;
      }
    });
}

function setDraggingSelector() {
  var isMouseDown = false;

  $(document).on('mousedown','.timetable-entry',function(e) {
    dragged=[];
    isMouseDown = true;

    if (this.classList.contains("timetable-view-request-received-slot")) {
      findCurrentRequestReceived(this);
      openReceiveReplacementModal(e.pageX, e.pageY - $(window).scrollTop());
    } else if (this.classList.contains("timetable-view-drag-slot")) {
      openReplacementModal(dragged, e.pageX, e.pageY - $(window).scrollTop());
    } else if (this.classList.contains("timetable-view-slot")){
      dragged.push(this);
      $(this).addClass("timetable-view-drag-slot");
      return false;
    }
  });

  $(document).on('mouseover','.timetable-entry',function(e) {
    if (isMouseDown) {
      if (this.classList.contains("timetable-view-drag-slot")) {
        isMouseDown = false;
        openReplacementModal(dragged, e.pageX, e.pageY - $(window).scrollTop());
      } else if (this.classList.contains("timetable-view-slot")){
        dragged.push(this);
        //$(this).toggleClass("timetable-view-drag-slot");
          $(this).addClass("timetable-view-drag-slot");
      }
    }
  });

  $(document).on('mouseup','.timetable-entry',function(e) {
    isMouseDown = false;
    if (dragged.length >= 1){
      openReplacementModal(dragged, e.pageX, e.pageY - $(window).scrollTop());
    }
  });
}

function openReceiveReplacementModal(x, y) {
  $("#overlay").css({"display":"block"});

  if (y > $(window).height() - modalHeight) {
    y = $(window).height() - modalHeight;
  }

  if (x > $(window).width() - modalWidth) {
    x = $(window).width() - modalWidth;
  }

  $("#receive-replacement-modal").css({
    "display": "block",
    "left": x+"px",
    "top": y+"px"
  });
}

// TODO: remove timeComponent param
function openReplacementModal(timeComponent, x, y) {
  $("#btn-send-all-requests").html('SEND all requests');

  var requestStatus = $(".btn-request-status")
  var requestReward = $(".btn-request-reward");

  for (var i = 0; i < requestStatus.length; i++) {
    requestStatus[i].classList.remove("btn-request-status-wait");
    requestStatus[i].classList.remove("btn-request-status-reject");
    requestStatus[i].classList.add("btn-request-status-yet");
    requestStatus[i].innerHTML = 'not requested yet';
    requestReward[i].style.display = "none";
  }

  $("#overlay").css({"display":"block"});

  if (y > $(window).height() - modalHeight) {
    y = $(window).height() - modalHeight;
  }

  if (x > $(window).width() - modalWidth) {
    x = $(window).width() - modalWidth;
  }

  $("#replacement-modal").css({
    "display": "block",
    "left": x+"px",
    "top": y+"px"
  });
}

function openRewardModal() {
  var x = $("#replacement-modal").offset().left + 300;
  var y = $("#replacement-modal").offset().top - $(window).scrollTop();

  if (x > $(window).width() - modalWidth) {
    x = $(window).width() - modalWidth;
    replacementX = x - modalWidth;
    $("#replacement-modal").css({"left": replacementX+"px"});
  }

  $("#reward-modal").css({
    "display": "block",
    "left": x+"px",
    "top": y+"px"
  });
}

function openAcceptModal(message) {
  $("#overlay").css({"display":"none"});
  $("#replacement-modal").css("display", "none");
  $("#accept-modal").css("display", "block");
  $("#accept-modal-description").html(message);
  deleteRequest();
}

function pushRequestToDatabase(drag, status) {
  startCell = drag[0];
  endCell = drag[drag.length-1];

  var day = startCell.cellIndex-1;
  s_row = time2Row(($(startCell).parent())[0].cells[0].id);
  e_row = time2Row(($(endCell).parent())[0].cells[0].id);

  /* TODO: drag upward */
  requestSentCellList[day].push([s_row, e_row, drag]);

  var dbDIR = '/userpool/'+user_id+'/requestSent/'+day;
  var requestData = {
    0: s_row,
    1: e_row,
    status: status
  }
  var newRequestRef = firebase.database().ref(dbDIR+'/').push(requestData);

  currentRequestDay = day;
  currentRequestKey = newRequestRef.key;

  initializeTimeTable();
}

function deleteRequest() {
  var day = currentRequestDay;
  var key = currentRequestKey;
  var requestdbDIR = '/userpool/'+user_id+'/requestSent/'+day+'/'+key;
  var thisweekdbDIR = '/userpool/'+user_id+'/thisweek/'+day;

  firebase.database().ref(requestdbDIR).once("value", function (snap) {
    requestValue = snap.val();
    var requestStartRow = requestValue[0]
    var requestEndRow = requestValue[1]

    firebase.database().ref(thisweekdbDIR).once("value", function (snap) {
      thisweekValue = snap.val();
      for (var key in thisweekValue) {
        var thisweekStartRow = thisweekValue[key][0];
        var thisweekEndRow = thisweekValue[key][1];

        if ((thisweekStartRow <= requestStartRow) && (requestEndRow <= thisweekEndRow)) {
          thisweekValue.splice(key, 1);

          if (requestEndRow !== thisweekEndRow) {
            thisweekValue.splice(key, 0, [requestEndRow + 1, thisweekEndRow]);
          }
          if (thisweekStartRow !== requestStartRow) {
            thisweekValue.splice(key, 0, [thisweekStartRow, requestStartRow - 1]);
          }

          firebase.database().ref(thisweekdbDIR).remove();
          firebase.database().ref(thisweekdbDIR).set(Object.assign({}, thisweekValue));
          firebase.database().ref(requestdbDIR).remove();

          initializeTimeTable();
        }
      }
    })
  });
}

function pushThisweekToDatabase(drag) {
  startCell = drag[0];
  endCell = drag[drag.length-1];

  var day = startCell.cellIndex-1;
  s_row = time2Row(($(startCell).parent())[0].cells[0].id);
  e_row = time2Row(($(endCell).parent())[0].cells[0].id);

  requestSentCellList[day].push([s_row, e_row, drag]);

  var dbDIR = '/userpool/'+user_id+'/thisweek/'+day;
  var thisweekData = {
    0: s_row,
    1: e_row
  }

  /* TODO: sort? */
  firebase.database().ref(dbDIR).once("value", function (snap) {
    var thisweekValue = snap.val();
    console.log('thisweekValue', thisweekValue, thisweekValue.length);
    var index = thisweekValue === "null" ? 0 : thisweekValue.length;

    firebase.database().ref(dbDIR+'/'+index+'/').set(thisweekData);
    initializeTimeTable();
  });
}

function deleteRequestReceived() {
  var day = currentRequestReceivedDay;
  var key = currentRequestReceivedKey;

  var index = requestReceivedCellList.findIndex((element) => { element.key === key; });
  requestReceivedCellList.splice(index, 1);

  var requestdbDIR = '/userpool/'+user_id+'/requestReceived/'+day+'/'+key;
  firebase.database().ref(requestdbDIR).remove();

  // TODO: 필요?
  currentRequestReceivedDay = null;
  currentRequestReceivedKey = null;
}