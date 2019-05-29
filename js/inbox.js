// JavaScript source code
var id;

var req_arr;
var rew_r_cnt = 0;
var rew_s_cnt = 0;
var req_cnt = 0;

//only used in reward inbox
var index_to_key = {};
const rewardToBigIconHTML = {
    coffee: ' <i class="fas fa-coffee fa-2x icon"></i>',
    beer: ' <i class="fas fa-beer fa-2x icon "></i>',
    chicken: ' <i class="fas fa-drumstick-bite fa-2x icon"></i>',
    meal: ' <i class="fas fa-concierge-bell fa-2x icon"></i>'
};



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
            
					var req = snap.val();
					console.log("Req01", req);//one req
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
										'day': req.day,
										'index': snap.key,
									};
									draw_one_req(req2);
									
								}
                })
        });
    });
}

function init_rew() {
    var reward_idx = 0;
    firebase.database().ref("userpool/" + id).child('rewardReceived').once('value', function (snapshot) {
        clearRewardReceived();
        snapshot.forEach((snap) => {
            var req = snap.val();
            firebase.database().ref("userpool/" + req.sender).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'reward': req.reward,
                        'index': reward_idx,
                    };
                    console.log("draw rew:", req2);
                    draw_one_rewReceived(req2);
                    index_to_key[reward_idx] = snap.key;
                    reward_idx++;
                }
            });
        });
    });

    firebase.database().ref("userpool/" + id).child('rewardReceived').on('child_changed', function (snapshot) {
        clearRewardReceived();
        snapshot.forEach((snap) => {
            var req = snap.val();
            firebase.database().ref("userpool/" + req.sender).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'reward': req.reward,
                        'index': reward_idx,
                    };
                    draw_one_rewReceived(req2);
                    index_to_key[reward_idx] = snap.key;
                    reward_idx++;
                }
            });
        });
    });
    firebase.database().ref("userpool/" + id).child('rewardSent').once('value', function (snapshot) {
        clearRewardReceived();
        snapshot.forEach((snap) => {
            var req = snap.val();
            firebase.database().ref("userpool/" + req.sender).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'reward': req.reward,
                        'index': reward_idx,
                    };
									draw_one_rewSend(req2);
                    index_to_key[reward_idx] = snap.key;
                    reward_idx++;
                }
            });
        });
    });

    firebase.database().ref("userpool/" + id).child('rewardSent').on('child_changed', function (snapshot) {
        console.log("on", snapshot.val());//whole array
        clearRewardReceived();
        snapshot.forEach((snap) => {
            console.log("Req01on", snap.key);//one req
            var req = snap.val();
            firebase.database().ref("userpool/" + req.sender).once("value", function (s) {
                if (s.exists()) {
                    var info = s.val();
                    var req2 = {
                        'img': info.img,
                        'id': info.id,
                        'name': info.name,
                        'reward': req.reward,
                        'index': reward_idx,
                    };
                    draw_one_rewSend(req2);
                    index_to_key[reward_idx] = snap.key;
                    reward_idx++;
                }
            });
        });
    });
}

function clearRewardReceived() {

    $('#reward_to_receive').text('');
}
function clearNoReward() {
    $('#empty_reward').css('display', 'none');
}


//need confirm message
function del_request(idx) {
    req_cnt--;
    console.log("idx", idx);
    //checked the firebase removed!!
    
    $("#id_" + idx).remove();
	firebase.database().ref("userpool/" + id + '/received_req').once("value", function (snap) {
		if (snap.exists()) {
			var req_arr = snap.val();
			var req = req_arr[idx];
			console.log(req);

			var timecell = { "day": req.day, "start_time": time2Row(req.start_time), "end_time": time2Row(req.end_time) };
			remove_hover_cell(timecell);
			req_arr[idx] = {};
			firebase.database().ref("userpool/" + id + '/received_req').set(req_arr);
		}
	});
	$("#inbox_count").html(req_cnt);
	if (req_cnt == 0) {
		$('#no_request').css("display", "block");
	}
}

function del_reward(idx) {
    rew_r_cnt--;
    console.log("idx", idx);
    //checked the firebase removed!!
    if (!(idx in index_to_key)) {
        console.log("error");
        return;
    };
    
    firebase.database().ref("userpool/" + id + '/rewardReceived').child(index_to_key[idx]).remove();
	$("#gid_" + idx).remove();
	if (rew_r_cnt == 0) {
		$("#no_reward_toreceive").css("display", "block");
	}
	$("#reward_count").html(rew_r_cnt + rew_s_cnt);
}

function del_sent_reward(idx) {
    rew_s_cnt--;
    console.log("idx", idx);
    //checked the firebase removed!!
    if (!(idx in index_to_key)) {
        console.log("error");
        return;
    };

    firebase.database().ref("userpool/" + id + '/rewardSent').child(index_to_key[idx]).remove();
	$("#gid_" + idx).remove();
	if (rew_s_cnt == 0) {
		$("#no_reward_tosend").css("display", "block");
	}
	$("#reward_count").html(rew_r_cnt + rew_s_cnt);
}


function push_time_toDB(timecell) {
    var day = day_to_07(timecell.day);
    console.log(timecell, day);
    var dbDIR = '/userpool/' + user_id + '/thisweek/' + day;
    var requestData = [
        timecell.start_time,
        timecell.end_time
    ];
    firebase.database().ref(dbDIR).once('value', function (snap) {
        var oldarr = snap.val();
        if (oldarr == "null") {
            oldarr = [];
        };
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

            /*
            if (req.queueKey) {
                var queuedbDIR = '/userpool/' + id + '/requestQueue/' + req.queueKey;
                firebase.database().ref(queuedbDIR).remove();
            }
            */
            
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
        class: "btn inbox_button",
        onclick: "del_request(" + req.index +")",
        style: "margin: 3px; font-size:10px",
    });
    var acpt = $('<input>', {
        type: "button",
        value: req.reward ? "accept with " + req.reward : "accept",
        class: "btn inbox_button",
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

	if (!req.reward) {
        $(txt).append("Can you to work at" + "<b> " + req.day +" "+ req.date+ " " + req.start_time + "~" + req.end_time + " </b> ?<br>");
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#no_reward"));
    } else {
        $(txt).append(" Can you to work at" + "<b> " + req.day+" "+req.date+ " " + req.start_time + "~" + req.end_time + " </b> ?<br>");
        //$(txt).append("you can get " + "<b> " + req.reward + " </b>");
        //$(acpt).html();
        $(txt).append(acpt);
        $(txt).append(del);
        $(temp).append($(txt));
        $(temp).appendTo($("#has_reward"));

    }
	$("#inbox_count").html(req_cnt);
	$('#no_request').css("display", "none");
};

function draw_one_rewReceived(req) {
	console.log("draw", req);
   
    var del = $('<input>', {
        type: "button",
        value: "received",
        class: "btn inbox_button",
        onclick: "del_reward(" + req.index + ")",
        style: "margin: 3px; font-size:10px",
    });
    var give = $('<input>', {
        type: "button",
        value: "Notify Again",
        class: "btn inbox_button",
        onclick: "noti_reward(" + req.index + ")", //implement to notify alarm
        style: "margin: 3px; font-size:10px",
    });
    var icon = rewardToBigIconHTML[req.reward];
    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "reward_content_row");
    $(txt).attr("class", "gift_text");
    $(temp).attr("id", "gid_" + req.index);

    rew_r_cnt++;
    $(txt).append(icon);
    $(txt).append("Receive " + "<b>" + req.reward + "</b>"+" from "+"<b>" + req.name +" </b>");

    //$(txt).append(del);
    //$(txt).append(give);
    $(temp).append($(txt));
    $(temp).append(del);
    $(temp).appendTo($("#reward_to_receive"));
	$("#reward_count").html(rew_r_cnt + rew_s_cnt);
	$("#no_reward_toreceive").css("display", "none");
	
	
    
};
function draw_one_rewSend(req) {

    var del = $('<input>', {
        type: "button",
        value: "already sent",
        class: "btn inbox_button",
        onclick: "del_sent_reward(" + req.index + ")",
        style: "margin: 3px; font-size:10px",
    });
    var icon = rewardToBigIconHTML[req.reward];
    var temp = document.createElement('div');
    var txt = document.createElement('div');
    $(temp).attr("class", "reward_content_row");
    $(txt).attr("class", "gift_text");
    $(temp).attr("id", "gid_" + req.index);

    rew_s_cnt++;
    $(txt).append(icon);
    $(txt).append("Give <b> " + req.reward + " </b> to <b>"+req.name + " </b>");

    //$(txt).append(del);
    $(temp).append($(txt));
    $(temp).append(del);
    $(temp).appendTo($("#reward_to_send"));
	$("#reward_count").html(rew_r_cnt + rew_s_cnt);
	$("#no_reward_tosend").css("display", "none");
	
	

};




$(document).ready(function () {

	$("#inbox_count").html(req_cnt);
	$("#reward_count").html(rew_s_cnt + rew_r_cnt);
  global_params = window.location.href.split('?')[1];
  id = global_params.split('uid=')[1];
	console.log("here");
  init_req();
	init_rew();
    //get_received_req();
    //get_received_rew();

    
    
});



function makeURL(str) {
    urlseg = str + "?uid=" + id;
    console.log("urlseg: ", urlseg);
    location.href = urlseg
}
var timeTable = document.getElementById('timetable');



