var tries = 0
var total_tiles = 0;
var total_seconds = 0;

function initialBoard(){
    var r = Math.floor(Math.random() * 16) + 1;
    document.getElementById(r.toString()).style.background = "gainsboro";
}

function vanishBoard(clicked_id){
    if (document.getElementById(clicked_id).style.background == "gainsboro"){
        tries ++
        r = Math.floor(Math.random() * 16) + 1;
        document.getElementById(r.toString()).style.background = "gainsboro";
        for (i = 1; i < 17; i++){
            if (i != r){
                document.getElementById(i.toString()).style.background = "white";
            }
        }
        if (total_tiles == 0){
            var timerVar = setInterval(countTimer, 1000);
        }
        total_tiles++;
        if (tries == 10){
            window.alert("Congrats! You got 10 tiles in " + total_seconds + " seconds");
        }
    }
}

function countTimer() {
   ++total_seconds;
   document.getElementById("timer").innerHTML = "Total Time:" + total_seconds;
}

