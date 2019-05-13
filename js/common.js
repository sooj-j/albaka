var tab_id = "tab1";

function time2Row(time){
  var row = 0;
  var old = time;
  time = time.split(":");
  time[0] = Number(time[0]);
  if (time[1]=="00"){
    row = (time[0]-8)*2;
    console.log("time: "+old+", row: "+row);
  }
  else{
    row = (time[0]-8)*2+1;
    console.log("time: "+old+", row: "+row);
  }
  return row;
}

function scrollTocell(cell) {
    var scrollPosition = $(cell).offset().top;
    console.log("pos", scrollPosition);

    //$(document).scrollTop(scrollPosition);

    $("html.body").animate({
        scrollTop: scrollPosition
    }, 300);
}


function datetocell(json) {
    var day;
    switch (json.day) {
        case "MON": day = 0; break;
        case "TUE": day = 1; break;
        case "WED": day = 2; break;
        case "THU": day = 3; break;
        case "FRI": day = 4; break;
        case "SAT": day = 5; break;
        case "SUN": day = 6; break;
    };
    for (var i = json.start_time; i <= json.end_time; i++) {

        if (i == json.start_time) {
            $(timetable.rows[i + 1].cells[day + 1]).text("CAN YOU WORK? :D");
        };
        $(timetable.rows[i + 1].cells[day + 1]).toggleClass("timetable-view-request-hover-slot");
        
        
    };
    scrollTocell($(timetable.rows[i + 1].cells[day + 1]));
}
function day_to_07(strday) {
    var day;
    switch (strday) {
        case "MON": day = 0; break;
        case "TUE": day = 1; break;
        case "WED": day = 2; break;
        case "THU": day = 3; break;
        case "FRI": day = 4; break;
        case "SAT": day = 5; break;
        case "SUN": day = 6; break;
    };
    return day;
}


function remove_hover_cell(json) {
    console.log("re,",json);
    var day;
    switch (json.day) {
        case "MON": day = 0; break;
        case "TUE": day = 1; break;
        case "WED": day = 2; break;
        case "THU": day = 3; break;
        case "FRI": day = 4; break;
        case "SAT": day = 5; break;
        case "SUN": day = 6; break;
    };
    for (var i = json.start_time; i <= json.end_time; i++) {
        if (i == json.start_time) {
            $(timetable.rows[i + 1].cells[day + 1]).text("");
        };
        $(timetable.rows[i + 1].cells[day + 1]).removeClass("timetable-view-request-hover-slot");
    };
};

function hover_on_view(json) {
    
    var day;
    switch (json.day) {
        case "MON": day = 0; break;
        case "TUE": day = 1; break;
        case "WED": day = 2; break;
        case "THU": day = 3; break;
        case "FRI": day = 4; break;
        case "SAT": day = 5; break;
        case "SUN": day = 6; break;
    };
    for (var i = json.start_time; i <= json.end_time; i++) {
        if (i == json.start_time) {
            $(timetable.rows[i + 1].cells[day + 1]).text("Can you work ?");
        };
        $(timetable.rows[i + 1].cells[day + 1]).addClass("timetable-view-request-hover-slot");
    };
    scrollTocell($(timetable.rows[i + 1].cells[day + 1]));

};


