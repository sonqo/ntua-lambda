var Counters = new Array(17).fill(0); 
        
function getWinner(){    

    var r = Math.floor(Math.random() * 16) + 1;
    while (Counters[r] == 1){
        r = Math.floor(Math.random() * 16) + 1; 
    }
    Counters[r] = 1;

    var temp = document.getElementById(r.toString());
    temp.id = "red";

    var r = Math.floor(Math.random() * 16) + 1;
    while (Counters[r] == 1){
        r = Math.floor(Math.random() * 16) + 1; 
    }
    Counters[r] = 1;

    temp = document.getElementById(r.toString());
    temp.id = "blue";

}