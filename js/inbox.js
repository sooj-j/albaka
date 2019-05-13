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
function clearInbox() {
    $(".has_reward").text("");
    $(".no_reward").text("");
};
function init_req() {
    firebase.database().ref("userpool/" + id).child('received_req').once('value', function (snapshot) {
        console.log("once", snapshot.val());//whole array
        clearInbox();

        snapshot.forEach((snap) => {
            console.log("Req01", snap.key);//one req
            var req = snap.val();
            firebase.database().ref("userpool/" + req.from).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'start_time': req.start_time,
                        'end_time': req.end_time,
                        'reward': req.reward,
                        'date': req.date,
                        'day': req.day,
                        'index': snap.key,

                    };
                    console.log("draw req:", req2);
                    draw_one_req(req2);
                    //index += 1;
                }
            });
        });
    });
    
    firebase.database().ref("userpool/" + id).child('received_req').on('child_changed', function (snapshot) {
        console.log("onchange", snapshot.val());//whole array
        clearInbox();
        
        snapshot.forEach((snap) => {
            console.log("Req01", snap.key);//one req
            var req = snap.val();
            firebase.database().ref("userpool/"+req.from).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'start_time': req.start_time,
                        'end_time': req.end_time,
                        'reward': req.reward,
                        'date': req.date,
                        'index': snap.key,

                    };
                    console.log("draw req:", req2);
                    draw_one_req(req2);
                    //index += 1;
                }
            });
        });
    });
}
function get_received_req() {//get when change happen in received requests
    //'child_changed'
    //firebase.database().ref("userpool/" + id).child('received_req').on('value', function (snapshot) {
        //console.log("changed received_Req");
        init_req();
    //});
};
function clearReward() {
    $(".has_reward").text("reward_to_send");
    $(".no_reward").text("reward_to_receive");
}

function get_received_rew() {//get when change happen in received rewards
    clearReward();
    firebase.database().ref("userpool/" + id).child('reward_Received').on("value", function (snapshot) {
        var index = 0;
        snapshot.forEach((snap) => {
            
            req = snap.val();
            firebase.database().ref("userpool").child(req.sender).once("value", function (snap) {
                if (snap.exists()) {
                    info = snap.val();
                    var req3 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'reward': req.reward,
                        'index': index,

                    };
                    console.log("draw req:", req3);
                    draw_one_rew(req3);
                    index += 1;
                }
            })
        })
    })
}

//need confirm message
function del_request(idx) {
    req_cnt--;
    console.log("idx", idx);
    //checked the firebase removed!!
    
    $("#id_" + idx).remove();
    firebase.database().ref("userpool/" + id + '/received_req').child(idx).once("value", function (snap) {
        if (snap.exists()) {
            var req = snap.val();
            console.log(req);

            if (req.queueKey) {
                var queuedbDIR = '/userpool/' + id + '/requestQueue/' + req.queueKey;
                firebase.database().ref(queuedbDIR).remove();
            };
            var timecell = { "day": req.day, "start_time": time2Row(req.start_time), "end_time": time2Row(req.end_time) };
            remove_hover_cell(timecell);
            
        }
    }).then(function () {
        //firebase.database().ref("userpool/" + id + '/received_req').child(idx).remove();
    });
    $("#inbox_count").html(req_cnt);
}



function push_time_toDB(timecell) {
    var day = day_to_07(timecell.day)+1;
    console.log(timecell, day);
    var dbDIR = '/userpool/' + user_id + '/thisweek/' + day;
    var requestData = {
        0: timecell.start_time,
        1: timecell.end_time
    }
    firebase.database().ref(dbDIR).once('value', function (snap) {
        var oldarr = snap.val();
        oldarr.push(requestData);
        oldarr.sort();
        firebase.database().ref(dbDIR).set(oldarr);
        console.log("accpet",oldarr);
    });    
    //firebase.database().ref(dbDIR + '/').push(requestData);
    console.log("accpet");
    initializeTimeTable();
};


//send message to sender // add time to my timetable
function accept_request(idx) {
    req_cnt--;
    $("#id_" + idx).remove();
    console.log("id:", idx);
    firebase.database().ref("userpool/" + id + '/received_req').child(idx).once("value", function (snap) {
        if (snap.exists()) {
            var req = snap.val();

            if (req.queueKey) {
                var queuedbDIR = '/userpool/' + id + '/requestQueue/' + req.queueKey;
                firebase.database().ref(queuedbDIR).remove();
            }
            
            var timecell = { "day": req.day, "start_time": time2Row(req.start_time), "end_time": time2Row(req.end_time) };
            remove_hover_cell(timecell);
            push_time_toDB(timecell);
            firebase.database().ref("userpool/" + id + '/received_req').child(idx).remove();
        //var newreq = firebase.database().ref("userpool/" + req.from + '/change').push();
        //newreq.set({ "receiver": id, "date": req.date, "start_time": req.start_time, "end_time": req.end_time, "reward": req.reward });


        }
        
    });
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
        value: "remove forever",
        class: "btn button",
        onclick: "del_request(" + req.index +")",
        style: "margin: 3px; font-size:10px",
    });
    var acpt = $('<input>', {
        type: "button",
        value: "accept",
        class: "btn button",
        onclick: "accept_request("+req.index+")",
        style: "margin: 3px; right: 2px;font-size:10px"
    });
    var cap = document.createElement('div');
    $(cap).attr("class", "caption alignleft");

    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "inbox_content_row");
    $(txt).attr("class", "img_text");
    $(temp).attr("id", "id_" + req.index);

    req_cnt++;
    $(i).appendTo($(cap));
    $(cap).append("<b> " + req.name + " </b>");
    $(cap).appendTo($(temp));

    if (req.reward == "") {
        $(txt).append("Can you to work at" + "<b> " + req.day +" "+ req.date+ " " + req.start_time + "~" + req.end_time + " </b> ?<br>");
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#no_reward"));
    } else {
        $(txt).append(" Can you to work at" + "<b> " + req.day+" "+req.date+ " " + req.start_time + "~" + req.end_time + " </b> ?<br>");
        //$(txt).append("you can get " + "<b> " + req.reward + " </b>");
        $(acpt).attr('value', 'accept with ' + req.reward);
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#has_reward"));

    }
    $("#inbox_count").html(req_cnt);
};

function draw_one_rew_to_receive(req) {
   
    var del = $('<input>', {
        type: "button",
        value: "I already received.",
        class: "btn button",
        onclick: "del_reward(" + req.index + ")",
        style: "margin: 3px; font-size:10px",
    });
    var give = $('<input>', {
        type: "button",
        value: "notify"+req.sender+ "to send",
        class: "btn button",
        onclick: "give_reward(" + req.index + ")",
        style: "margin: 3px; font-size:10px",
    });

    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "reward_content_row");
    //$(txt).attr("class", "img_text");
    $(temp).attr("id", "id_" + req.index);

    rew_cnt++;
    $(txt).append("<b>" + req.sender +" </b>"+"has to give you" + "<b>" + req.reward + "</b><br>");

    $(txt).append(del);
    $(txt).append(give);
    $(temp).append($(txt));
    $(temp).appendTo($("#reward_to_receive"));
    $("#reward_count").html(req_cnt);
    
};
function draw_one_rew_to_send(req) {

    var del = $('<input>', {
        type: "button",
        value: "I already sent.",
        class: "btn button",
        onclick: "del_reward(" + req.index + ")",
        style: "margin: 3px; font-size:10px",
    });

    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "reward_content_row");
    //$(txt).attr("class", "img_text");
    $(temp).attr("id", "id_" + req.index);

    rew_cnt++;
    $(txt).append("you have to give <b> " + req.reward + " </b> to "+req.sender + " </b> <br>");

    $(txt).append(del);
    $(temp).append($(txt));
    $(temp).appendTo($("#reward_to_send"));
    $("#reward_count").html(req_cnt);

};




$(document).ready(function () {

    $("#inbox_count").html(req_cnt);
    $("#reward_count").html(reward_cnt);
    global_params = window.location.href.split('?')[1];
    id = global_params.split('uid=')[1];
    
    console.log("fin");

    init_req();
    
    //get_received_req();
    get_received_rew();

    
    
});



function makeURL(str) {
    urlseg = str + "?uid=" + id;
    console.log("urlseg: ", urlseg);
    location.href = urlseg
}
var timeTable = document.getElementById('timetable');



