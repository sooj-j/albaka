//test push

var goal;
var database = firebase.database();
var user_info;

var mayfirst = ['may1','may2','may3','may4', 'may5'];
var maysecond = ['may6','may7','may8','may9', 'may10','may11','may12'];
var maythird = ['may13','may14','may15','may16', 'may17','may18','may19'];
var mayfourth = ['may20','may21','may22','may23', 'may24','may25','may26'];
var mayfifth = ['may27','may28','may29','may31', 'may31'];

var weeks_list = ['mayfirst', 'maysecond', 'maythird', 'mayfourth', 'mayfifth']
var calender = {
'mayfirst': mayfirst,
'maysecond': maysecond,
'maythird': maythird,
'mayfourth': mayfourth,
'mayfifth':mayfifth
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
};
/*
var weeks = {
    'mayfirst':{
        'days':{
            'may1':0,
            'may2':2,
            'may3':0,
            'may4':8,
            'may5':0,
            },
        'total':0
        },
    'maysecond':{
        'days':{
            'may6':0,
            'may7':0,
            'may8':0,
            'may9':0,
            'may10':0,
            'may11':0,
            'may12':0,
            },
        'total':0
        },
    'maythird':{
        'days':{
            'may13':0,
            'may14':0,
            'may15':0,
            'may16':0,
            'may17':0,
            'may18':0,
            'may19':0,
        },
        'total':0
        },
    'mayfourth':{
        'days':{
            'may20':0,
            'may21':0,
            'may22':0,
            'may23':0,
            'may24':0,
            'may25':0,
            'may26':0,
        },
        'total':0
        },
    'mayfifth':{
        'days':{
            'may27':0,
            'may28':0,
            'may29':0,
            'may30':0,
            'may31':0,
        },
        'total':0
        }

}
*/

var weeks;
var may_sum;

$(document).ready(function(){
    $("#set-zone").hide();

    $("#nav-placeholder").load("nav.html", function () {
        $(".nav-item")[2].classList.add("nav-item-active");
    });

    database.ref('userpool/' + user_info[""] + '/wage/may/').once('value').then(function (snapshot) {
        goal = snapshot.val()['goal'];
        may_sum = snapshot.val()['sum'];
        $("#division").html(may_sum+"$/"+goal+"$");
        var percentage = (may_sum/goal *100).toPrecision(2);
        $('#progress').html(percentage + "%");
        $("#progress").css("width", percentage+'%')


        var weeks = snapshot.val()['weeks'];
        var sum = 0;
            var i;
            for(i = 0; i<5; i++){
                var total = 0;
                var id = weeks_list[i];
                var week = calender[id];
                var l = week.length;
                var j;
                for(j=0; j<l; j++){
                    var day = week[j];
                    var day_wage = weeks[id]['days'][day];
                    total += day_wage;
                    if (day_wage != 0)
                    {
                        //console.log();
                        $("#"+day).html(day_wage+"$");
                    }
                }
                weeks[id]['total'] = total;
                if (total!=0){
                    $("#"+id).html(total + "$");
                }

                sum += total;
        }
        alert(sum);
            $("#total-wage").html("Total Wage : " + sum + "$");

        });
        /*
    var may_sum = 0;
    var i;
    for(i = 0; i<5; i++){
        var total = 0;
        var id = weeks_list[i];
        var week = calender[id];
        var l = week.length;
        var j;
        for(j=0; j<l; j++){
            var day = week[j];
            var day_wage = weeks[id]['days'][day];
            total += day_wage;
            if (day_wage != 0)
            {
                $("#"+day).html(weeks[id]['days'][day]);
            }
        }
        weeks[id]['total'] = total;
        if (total!=0){
            $("#"+id).html(total);
        }

        may_sum += total;
    }
    $("#total-wage").html(may_sum + "$");

    */

    //database.ref('userpool/test1/wage/may/sum').set(may_sum);
    //database.ref('userpool/test1/wage/may/weeks').set(weeks);
});

$(document).on("click", "#change-button", function(){
    $("#set-zone").show();
    $("#goal-zone").hide();
});

$(document).on("click", "#set-button", function(){
    $("#set-zone").hide();
    $("#goal-zone").show();


    goal  = document.getElementById("goal-input").value;

    if(goal != ""){
        database.ref('userpool/test1/wage/may/goal').set(goal);
        $("#goal-input").val("");
    }
    database.ref('userpool/test1/wage/may/').once('value').then(function(snapshot) {
        may_sum = snapshot.val()['sum'];
        goal = snapshot.val()['goal'];
        $("#division").html(may_sum+"$/" + goal +"$");
        var percentage = (may_sum/goal *100).toPrecision(2);
        $('#progress').html(percentage + "%");
        $("#progress").css("width", percentage+'%')
    });

});



