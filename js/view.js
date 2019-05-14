
var user_info; //user information struct => key:  id, pw, name, workplace,img
var user_id;
var timeArray;
var timeTable = document.getElementById('timetable');
var cellList =[];

var requestSentCellList = [[], [], [], [], [], [], []];
var requestReceivedCellList = [[], [], [], [], [], [], []];
var dragged = [];
var timers = [];

/* TODO: change to object */
var currentRequestSentDay = null;
var currentRequestSentKey = null;
var currentRequestSentCellblock = null;

var currentRequestReceivedDay = null;
var currentRequestReceivedKey = null;
var currentRequestReceivedCellblock = null;

const modalWidth = 300
const modalHeight = 265
const receiveReplacementModalHeight = 200

const statusDefault = ['wait', 'wait', 'wait'];

const rewardList = ['coffee', 'beer', 'chicken', 'meal']
const rewardToIconHTML = {
  coffee: ' <i class="fas fa-coffee"></i>',
  beer: ' <i class="fas fa-beer"></i>',
  chicken: ' <i class="fas fa-drumstick-bite"></i>',
  meal: ' <i class="fas fa-concierge-bell"></i>'
}

const btnReplacementModalHTML = {
  send: 'SEND all requests',
  cancel: 'CANCEL all requests'
}

const dayToDateString = {
  0: 'MON 5/6',
  1: 'TUE 5/7',
  2: 'WED 5/8',
  3: 'THU 5/9',
  4: 'FRI 5/10',
  5: 'SAT 5/11',
  6: 'SUN 5/12'
};

const requestQueueDefault = [{
  0: 0,
  1: 3,
  day: 4,
  sender: "Heeju",
  reward: null
}, {
  0: 12,
  1: 16,
  day: 1,
  sender: "Hyunjoo",
  reward: null
}, {
  0: 2,
  1: 5,
  day: 6,
  sender: "Dayeon",
  reward: null
}];

/* user receives requests for a certain time intervals, in the order in the LIFO queue. */
const requestInterval = 15000;

/* status of sent request changes for a certain time intervals. */
const statusChangeInterval = 2000;

$(document).ready(function () {

    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[0].classList.add("nav-item-active");
    });

    findUser();
    initializeTimeTableHeader();
    initializeTimeTable();
    initializeRequestQueue();

    setDraggingSelector();

    /* click replacement modal close button */
    $('#btn-close-replacement-modal').click(function() {
      closeReplacementModal();
      initializeTimeTable();
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
      if ($(this).html() === btnReplacementModalHTML.cancel) {
        var dbDIR = '/userpool/'+user_id+'/requestSent/'+currentRequestSentDay+'/'+currentRequestSentKey;
        console.log('dbDIR', dbDIR);
        firebase.database().ref(dbDIR).remove();
        closeReplacementModal();
        initializeTimeTable();
        return;
      }

      timers = [];

      pushRequestToDatabase();
      $("#btn-send-all-requests").html(btnReplacementModalHTML.cancel);

      var requestStatus = $(".btn-request-status-yet")

      for (var i = 0; i < requestStatus.length; i++) {
        requestStatus[i].classList.remove("btn-request-status-yet");
        requestStatus[i].classList.add("btn-request-status-wait");
        requestStatus[i].innerHTML = 'waiting';
      }

      var requestReward = $(".btn-request-reward");

      changeStatusToReject(0, statusChangeInterval);
      changeStatusToReject(1, statusChangeInterval * 2);
      changeStatusToReject(2, statusChangeInterval * 3);

      var timer = setTimeout(openRewardModal, statusChangeInterval * 3);
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

      var dbDIR = '/userpool/'+user_id+'/requestSent/'+currentRequestSentDay+'/'+currentRequestSentKey;
      firebase.database().ref(dbDIR).once('value', function(snapshot) {
        requestValue = snapshot.val();
        message = "Dayeon accepted the replacement on <br/><strong>"+days[currentRequestSentDay]+" "+getTimeBar(requestValue[0], requestValue[1])+"</strong>"
        
        requestValue.status = statusDefault;
        requestValue.reward = $("#select-reward").val();

        firebase.database().ref(dbDIR).set(requestValue);

        var timer = setTimeout(function() {
          // reward-todo: 위처럼 보낸 reward db에 저장
          var rewarddbDIR = '/userpool/'+user_id+'/rewardSent/';

          if (requestValue.reward) {
            firebase.database().ref(rewarddbDIR).push({
              reward: requestValue.reward,
              sender: 'testDayeon'
            });
          }

          openAcceptModal(message);
        }, 2500);
        timers.push(timer);
      });
    });

    $("#btn-accept-request").click(function() {
      pushThisweekToDatabase(currentRequestReceivedCellblock);
      deleteRequestReceived();
      closeReceiveReplacementModal();
      setTimeout(pushRequestReceivedFromQueue, requestInterval);
    })

    $("#btn-reject-request").click(function() {
      pendRequestReceived();
      // TODO: received_req에 push
      // TODO: requestReceived에서 remove
      closeReceiveReplacementModal();
      setTimeout(pushRequestReceivedFromQueue, requestInterval);
    })
});

function closeReceiveReplacementModal() {
  $("#overlay").css("display", "none");
  $("#receive-replacement-modal").css("display", "none");
}

function closeReplacementModal() {
  $("#overlay").css("display", "none");
  $("#replacement-modal").css("display", "none");
  $("#reward-modal").css("display", "none");
  
  timers.forEach((timer) => {
    clearTimeout(timer);
  });
}

/* if user reject the replacement request, then pend in inbox */
function pendRequestReceived() {
  var receiveddbDIR = '/userpool/'+user_id+'/requestReceived/'+currentRequestReceivedDay+'/'+currentRequestReceivedKey;
  var queuedbDIR = '/userpool/'+user_id+'/requestQueue/';
  
  var newRequestQueueRef; 

  /* if request without reward is rejected, then push the request with reward <beer> to queue */
  firebase.database().ref(receiveddbDIR).once("value", function (snap) {
    var requestQueueValue = snap.val();
    if(requestQueueValue && !requestQueueValue.reward) {
      requestQueueValue.reward = rewardList[Math.floor(Math.random()*rewardList.length)];;
      requestQueueValue.day = currentRequestReceivedDay;

      newRequestQueueRef = firebase.database().ref(queuedbDIR).push(requestQueueValue);
    }
    
    var pendingdbDIR = '/userpool/'+user_id+'/received_req/';
    var pendingData = {
        date: dayToDateString[currentRequestReceivedDay].split(' ')[1],
        day: dayToDateString[currentRequestReceivedDay].split(' ')[0],
      start_time: getTimeStr(requestQueueValue[0]),
      end_time: getTimeStr(requestQueueValue[1]),
      from: 'test' + requestQueueValue.sender,
      reward: requestQueueValue.reward
    }

    if (newRequestQueueRef) {
      pendingData.queueKey = newRequestQueueRef.key
    }

    firebase.database().ref(pendingdbDIR).once("value", function (snap) {
      var requestPendingValue = snap.val();

      if (!requestPendingValue) {
        requestPendingValue = [];
      }
       console.log('push to pendingDB > value', requestPendingValue, pendingData)

      requestPendingValue.push(pendingData);

      var pendingKey = requestPendingValue.length - 1;

      if (newRequestQueueRef) {
        firebase.database().ref(queuedbDIR+'/'+newRequestQueueRef.key).update({
          pendingKey: pendingKey
        });
      }
      firebase.database().ref(pendingdbDIR).remove()
        firebase.database().ref(pendingdbDIR).set(requestPendingValue).then(function () {
            firebase.database().ref(receiveddbDIR).remove().then(function () { location.reload(); });
            
        })
    });

    //firebase.database().ref(receiveddbDIR).remove();
  });

    initializeTimeTable();
    
    //init_req();
    
}


function initializeRequestQueue() {
  var dbDIR = '/userpool/'+user_id+'/requestQueue/';

  firebase.database().ref(dbDIR).once("value", function (snap) {
    requestQueueValue = snap.val();
    if (requestQueueValue === null) {
      firebase.database().ref(dbDIR).set(requestQueueDefault);
    }
    setTimeout(pushRequestReceivedFromQueue, requestInterval);
  });
}

/* user receives a popped request from the queue */
function pushRequestReceivedFromQueue() {
  var queuedbDIR = '/userpool/'+user_id+'/requestQueue/';
  var receiveddbDIR = '/userpool/'+user_id+'/requestReceived/';

  firebase.database().ref(queuedbDIR).once("value", function (snap) {
    requestQueueValue = snap.val();
    if (requestQueueValue === null) return;

    /* get latest request from queue */
    var lastKey = Object.keys(requestQueueValue).pop();
    var firstRequest = requestQueueValue[lastKey];

    day = firstRequest.day
    delete firstRequest.day

    if (firstRequest.pendingKey) {
      var pendingdbDIR = '/userpool/'+user_id+'/received_req/'+firstRequest.pendingKey;
      firebase.database().ref(pendingdbDIR).remove();
    }

    /* push new request to request received DB */
    firebase.database().ref(receiveddbDIR+'/'+day).once("value", function (snap) {
      requestValue = snap.val();
      /* if there is an existing request which has same < start time, end time, sender > with new request from queue,
         then delete the existing request ( pending request is updated with reward ) */
      
      /*
      if (requestValue) {
        for (key in requestValue) {
          if (requestValue[key][0] === firstRequest[0] &&
              requestValue[key][1] === firstRequest[1] &&
              requestValue[key].sender === firstRequest.sender) {
            firebase.database().ref(receiveddbDIR+'/'+day+'/'+key).remove();
          }
        }
      }
      */
      firebase.database().ref(receiveddbDIR+'/'+day).push(firstRequest);
      initializeTimeTable();
    });

    /* delete latest request from request queue */
    delete requestQueueValue[lastKey]
    if (Object.keys(requestQueueValue).length === 0) {
      /* prevent initialize queue to default when revisiting */
      requestQueueValue = "done"
    }
    firebase.database().ref(queuedbDIR).set(requestQueueValue);
  });
}

function changeStatusToReject(index, time) {
  var requestStatus = $(".btn-request-status");
  var requestReward = $(".btn-request-reward");

  timer = setTimeout(function() {
    requestStatus[index].classList.remove("btn-request-status-wait");
    requestStatus[index].classList.add("btn-request-status-reject");
    requestStatus[index].innerHTML = "rejected";
    requestReward[index].style.display = "block";

    var dbDIR = '/userpool/'+user_id+'/requestSent/'+currentRequestSentDay+'/'+currentRequestSentKey;
    firebase.database().ref(dbDIR).once('value', function(snapshot) {
      var requestValue = snapshot.val();
      if (requestValue) {
        var status = requestValue.status;
        status[index] = 'reject'
        firebase.database().ref(dbDIR).update({status: status});
      }
    });
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
          //console.log(myKey, keyList);
          
        if (thisweekValue[myKey]=="null"){
          console.log("Empty day: ", myKey);
        }
        else {
            for (var l = 0; l < thisweekValue[myKey].length; l++){
            //var key_slot = thisweekValue[myKey][l];
            var cellblock = []
            //console.log(key_slot);
            //var start = key_slot[0];
            //var end = key_slot[1];
            var start=thisweekValue[myKey][l][0];
            var end=thisweekValue[myKey][l][1];
            console.log("day: ", myKey, ", start: ", start, ", end: ", end);
            for (var i=start; i<=end; i++){
              var row = i+1;
              var day = j + 1;
              //console.log("cell", row, day);
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
  return getTimeStr(start) + " ~ "+ getTimeStr(end);
}

function getTimeStr(time) {
  if (time % 2 == 0){
    return timeAxis[time/2];
  } else {
    return time30Axis[(time-1) / 2];
  }
}

function initializeTimeTableHeader() {
    var timeTableHeader = document.getElementById('timetable-header');
    var newRow = timeTableHeader.insertRow(0);
    var newCell = newRow.insertCell(0);

    // TODO: current dates
    var dates = ['5/6', '5/7', '5/8', '5/9', '5/10', '5/11', '5/12'];

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

function findCurrentRequestSent(element) {
  var day = element.cellIndex-1;

  requestSentCellList[day].forEach((requestData) => {
    if (requestData.cellblock.includes(element)) {
      currentRequestSentDay = day;
      currentRequestSentKey = requestData.key;
      currentRequestSentCellblock = requestData.cellblock;
      return;
    }
  });
}

function setDraggingSelector() {
  var isMouseDown = false;
  var prev;

  $(document).on('mousedown','.timetable-entry',function(e) {
    dragged=[];

    if (this.classList.contains("timetable-view-request-received-slot")) {
      findCurrentRequestReceived(this);
      openReceiveReplacementModal(e.pageX, e.pageY - $(window).scrollTop());
    } else if (this.classList.contains("timetable-view-drag-slot")) {
      findCurrentRequestSent(this);
      openReplacementModal(e.pageX, e.pageY - $(window).scrollTop());
    } else if (this.classList.contains("timetable-view-slot")){
      dragged.push(this);
      $(this).addClass("timetable-view-drag-slot");
      isMouseDown = true;
      prev = this;
      return false;
    }
  });

  $(document).on('mouseover','.timetable-entry',function(e) {
    if (isMouseDown) {
      if (this.classList.contains("timetable-view-drag-slot")) {
        isMouseDown = false;
        openReplacementModal(e.pageX, e.pageY - $(window).scrollTop());
      } else if (this.classList.contains("timetable-view-slot") && (this.cellIndex == prev.cellIndex)){
        dragged.push(this);
        $(this).addClass("timetable-view-drag-slot");
      }
    }
  });

  $(document).on('mouseup','.timetable-entry',function(e) {
    isMouseDown = false;
    if (dragged.length >= 1){
      currentRequestSentDay = null;
      currentRequestSentKey = null;
      currentRequestSentCellblock = dragged;
      openReplacementModal(e.pageX, e.pageY - $(window).scrollTop());
    }
  });
}

function openReceiveReplacementModal(x, y) {
  $("#overlay").css({"display":"block"});

  if (y > $(window).height() - receiveReplacementModalHeight) {
    y = $(window).height() - receiveReplacementModalHeight;
  }

  if (x > $(window).width() - modalWidth) {
    x = $(window).width() - modalWidth;
  }

  var sender, reward;

  var dbDIR = '/userpool/'+user_id+'/requestReceived/'+currentRequestReceivedDay+'/'+currentRequestReceivedKey;

  firebase.database().ref(dbDIR).once("value", function (snap) {
    requestValue = snap.val();

    if (requestValue) {
      sender = requestValue.sender;
      reward = requestValue.reward;
    }

    var description = "<strong>"+sender+"</strong> asks for replacement";
    if (reward) {
      description += "<br/>with <strong>"+reward+"</strong> as a reward";
    }
    $("#receive-replacement-modal-description").html(description);
  });

  $("#receive-replacement-modal").css({
    "display": "block",
    "left": x+"px",
    "top": y+"px"
  });
}

function openReplacementModal(x, y) {
  var requestStatus = $(".btn-request-status")
  var requestReward = $(".btn-request-reward");

  for (var i = 0; i < requestStatus.length; i++) {
    requestStatus[i].classList.remove("btn-request-status-yet");
    requestStatus[i].classList.remove("btn-request-status-wait");
    requestStatus[i].classList.remove("btn-request-status-reject");
    requestReward[i].style.display = "none";
  }

  var statusList;
  var dbDIR = '/userpool/'+user_id+'/requestSent/'+currentRequestSentDay+'/'+currentRequestSentKey;

  firebase.database().ref(dbDIR).once("value", function (snap) {
    requestValue = snap.val();
    if (requestValue) {
      statusList = requestValue.status;
    }

    if (!statusList) {
      $("#btn-send-all-requests").html(btnReplacementModalHTML.send);

      for (var i = 0; i < requestStatus.length; i++) {
        requestStatus[i].classList.add("btn-request-status-yet");
        requestStatus[i].innerHTML = "not requested yet";
      }
    } else {
      $("#btn-send-all-requests").html(btnReplacementModalHTML.cancel);

      var countWait = 0;

      for (var i = 0; i < statusList.length; i ++) {
        if (statusList[i] === 'wait') {
          requestStatus[i].classList.add("btn-request-status-wait");
          requestStatus[i].innerHTML = "waiting";
          changeStatusToReject(i, statusChangeInterval * (countWait + 1));
          countWait += 1;
        } else {
          requestStatus[i].classList.add("btn-request-status-reject");
          requestStatus[i].innerHTML = "rejected";
          requestReward[i].style.display = "block";
        }
      }

      if (countWait === 0) {
        openRewardModal();
      } else {
        var timer = setTimeout(openRewardModal, statusChangeInterval * (countWait + 1));
        timers.push(timer);
      }
    }
  });

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

function pushRequestToDatabase() {
  var cellblock = currentRequestSentCellblock;
  var startCell = cellblock[0];
  var endCell = cellblock[cellblock.length-1];

  var day = startCell.cellIndex - 1;
  s_row = time2Row(($(startCell).parent())[0].cells[0].id);
  e_row = time2Row(($(endCell).parent())[0].cells[0].id);

  /* TODO: drag upward */

  var dbDIR = '/userpool/'+user_id+'/requestSent/'+day;
  var requestData = {
    0: s_row,
    1: e_row,
    status: statusDefault
  }
  var newRequestRef = firebase.database().ref(dbDIR+'/').push(requestData);

  currentRequestSentDay = day;
  currentRequestSentKey = newRequestRef.key;

  initializeTimeTable();
}

function deleteRequest() {
  var day = currentRequestSentDay;
  var key = currentRequestSentKey;
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

  var dbDIR = '/userpool/'+user_id+'/thisweek/'+day;
  var thisweekData = {
    0: s_row,
    1: e_row
  }

  firebase.database().ref(dbDIR).once("value", function (snap) {
      var thisweekValue = snap.val();
      console.log("push", thisweekValue);
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
  var rewarddbDIR = '/userpool/'+user_id+'/rewardReceived/';

  firebase.database().ref(requestdbDIR).once("value", function (snap) {
    var requestValue = snap.val();
    
    if (requestValue.reward) {
      firebase.database().ref(rewarddbDIR).push({
        reward: requestValue.reward,
        sender: 'test' + requestValue.sender
      });
    }
    firebase.database().ref(requestdbDIR).remove();
  });

  // TODO: 필요?
  currentRequestReceivedDay = null;
  currentRequestReceivedKey = null;
}



/* helper function */
function initializeAutoRequest() {
  var queuedbDIR = '/userpool/'+user_id+'/requestQueue/';
  firebase.database().ref(queuedbDIR).remove();

  var requestdbDIR = '/userpool/'+user_id+'/requestReceived/';
  firebase.database().ref(requestdbDIR).remove();

  var pendingdbDIR = '/userpool/'+user_id+'/received_req/';
  // firebase.database().ref(pendingdbDIR).remove();

  requestQueueDefault.forEach((element) => {
    var thisweekdbDIR = '/userpool/'+user_id+'/thisweek/'+element.day+'/';
    firebase.database().ref(thisweekdbDIR).once("value", function (snap) {
      thisweekValue = snap.val();

      if (thisweekValue === null) return;

      Object.keys(thisweekValue).forEach((key) => {
        if (thisweekValue[key][0] <= element[0] && thisweekValue[key][1] >= element[1]) {
          thisweekValue.splice(key, 1);
          firebase.database().ref(thisweekdbDIR).remove();

          if (thisweekValue.length === 0) {
            firebase.database().ref(thisweekdbDIR).set("null");
          } else {
            firebase.database().ref(thisweekdbDIR).set(thisweekValue);
          }
        }
      })
      initializeTimeTable();
    });
  });
}
