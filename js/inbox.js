// JavaScript source code
var id;

var req_arr;
var reward_cnt = 0;
var req_cnt = 0;


function getUserinfo(userid) {
    return firebase.database().ref("userpool").orderByChild("id").equalTo(userid).once("value", function (snap) {
        user_info = snap.val();
    });
}

function get_received_req() {//get when change happen in received requests
    firebase.database().ref("userpool/" + id).child('received_req').on("value", function (snapshot) {
        var index = 0;
        snapshot.forEach((snap) => {
            
            req = snap.val();
            firebase.database().ref("userpool").child(req.from).on("value", function (snap) {
                if (snap.exists()) {
                    info = snap.val();
                    console.log("Req", info);
                    req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'start_time': req.start_time,
                        'end_time': req.end_time,
                        'reward': req.reward,
                        'date': req.date,
                        'index': index,

                    };
                    console.log("draw req:", req2);
                    draw_one_req(req2);
                    index += 1;
                }
                
            });
            
        });
    });
}
//need confirm message
function del_request(idx) {
    req_cnt--;
    //firebase.database().ref("userpool/" + id + '/received_req').child(idx-1).remove();
    console.log("del:", idx);
    $("#id_" + idx).remove();
    //notify it to the sender

    $("#inbox_count").html(req_cnt);
    
}

//send message to sender // add time to my timetable
function accept_request(idx) {
    req_cnt--; 
    $("#id_" + idx).remove();
    console.log("id:", idx);
    firebase.database().ref("userpool/" + id + '/received_req').child(idx).once("value", function (snap) {
        console.log("accept:", snap);
        var req = snap.val();
        console.log("accept:", req);
        var newreq = firebase.database().ref("userpool/" + req.from + '/change').push();
        newreq.set({ "receiver": id, "date": req.date, "start_time": req.start_time, "end_time": req.end_time, "reward": req.reward });
        //i!!!! implement to be in receiver's timetable
    }).then(function () {
        firebase.database().ref("userpool/" + id + '/received_req').child(idx).remove();
        });
    
    //i!!!! implement to be in sender's timetable

    $("#inbox_count").html(req_cnt);
    
}

//hover effect
function draw_one_req(req) {
    var i = $('<img>', {
        class: "inbox_img",
        src : req.img,
        align : "left",
    });
    var del = $('<input>', {
        type: "button",
        value: "delete",
        class: "btn button",
        onclick: "del_request(" + req.index +")",
        style: "margin: 3px",
    });
    var acpt = $('<input>', {
        type: "button",
        value: "accept",
        class: "btn button",
        onclick: "accept_request("+req.index+")",
        style: "margin: 3px; right: 2px"
    });
    var cap = document.createElement('div');
    $(cap).attr("class", "caption alignleft");

    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "inbox_content_row");
    $(txt).attr("class", "img_text");
    $(temp).attr("id", "id_" + req.index);
    //$(temp).attr("onmouseover", "hoveron()");
    req_cnt++;
    $(i).appendTo($(cap));
    $(cap).append("<b> " + req.name + " </b>");
    $(cap).appendTo($(temp));

    if (req.reward == "") {
        $(txt).append("Can you to work at" + "<b> " + req.date + " " + req.start_time + "~" + req.end_time + "</b> ?<br>");
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#no_reward"));
    } else {
        $(txt).append(" Can you to work at" + "<b> " + req.date + " " + req.start_time + "~" + req.end_time + "</b> ?<br>");
        $(txt).append("you can get " + "<b> " + req.reward + " </b>" );
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#has_reward"));

    }
    $("#inbox_count").html(req_cnt);
};





$(document).ready(function () {

    $("#inbox_count").html(req_cnt);
    $("#reward_count").html(reward_cnt);
    global_params = window.location.href.split('?')[1];
    id = global_params.split('uid=')[1];
    
    console.log("fin");

    //firebase.database().ref("userpool/" + id).child('received_req').on("value", function (snapshot) {
    get_received_req();

   
    
});


function makeURL(str) {
    urlseg = str + "?uid=" + id;
    console.log("urlseg: ", urlseg);
    location.href = urlseg
}
var timeTable = document.getElementById('timetable');
function datetocell(json) {
    var day;
    switch (json.date) {
        case "MON": day = 0; break;
        case "TUE": day = 1; break;
        case "WED": day = 2; break;
        case "THU": day = 3; break;
        case "FRI": day = 4; break;
        case "SAT": day = 5; break;
        case "SUN": day = 6; break;
    }
    for (var i = json.start_time; i <= json.end_time; i++) {
        var cell = [];
        timetable.rows[i + 1].cells[day + 1].attr("background-color", "black");
    }
}

