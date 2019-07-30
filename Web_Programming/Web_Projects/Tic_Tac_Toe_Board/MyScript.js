var Counters = new Array(17).fill(0); 
        
function getWinner(clicked_id){    

    var r = parseInt(clicked_id);
    var temp = document.getElementById(r);
    Counters[r] = 1;
    temp.id = "red";
    temp.innerHTML = "X"

    r = Math.floor(Math.random() * 16) + 1;
    while (Counters[r] != 0){
        r = Math.floor(Math.random() * 16) + 1; 
    }
    Counters[r] = 2;

    temp = document.getElementById(r.toString());
    temp.id = "blue";
    temp.innerHTML = "Y";

    countWinner();
}

function countWinner(){

    var count_red = 0;
    var count_blue = 0;

    for (j = 0; j < 4; j++){
        for (i = 1; i < 5; i++){
            if ((Counters[i+j*4] == Counters[i+j*4+4]) && (Counters[i+j*4] != 0)){
                if (Counters[i+j*4] == 1){
                    count_red++;
                }
                else{
                    count_blue++;
                }
            }
        }
    }

    var p1 = document.getElementById("player1")
    var p2 = document.getElementById("player2")

    p1.innerHTML = "Player 1: " + count_red;
    p2.innerHTML = "Player 2: " + count_blue;
}