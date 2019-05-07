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
