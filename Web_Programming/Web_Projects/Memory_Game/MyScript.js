var tries = 0;
var clicks = 0; // Keeping ID and HTML text for comparing the last two selected cards
var ClickedID = [0, 0]; 
var ClickedHTML = ["I", "J"];

var Counters = new Array(17).fill(0);
var CorrectAnsw = new Array(17).fill(0);
var Letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

function cardPadding(){ // Initializing game board
    for (j = 0; j < 8; j++){
        for (i = 0; i < 2; i++){
            var r = Math.floor(Math.random() * 16) + 1;
            while (Counters[r] != 0){
                r = Math.floor(Math.random() * 16) + 1; 
            }
            Counters[r] = 1;

            var temp = document.getElementById(r.toString());
            temp.innerHTML = Letters[j];
        }
    }
    resetBoard();
}

function resetBoard(){
    for (i = 1; i < 17; i++){
        if (CorrectAnsw[i] != 1){
            var temp = document.getElementById(i.toString());
            temp.style.color = "gainsboro";
            temp.style.background = "gainsboro";
        }
    }
}

function onTesting(clicked_id){

    var r = parseInt(clicked_id);
    var temp = document.getElementById(r);
    temp.style.color = "grey";
    temp.style.background = "lightblue";
    
    clicks++;
    if (clicks == 1){
        ClickedID[0] = r;
        ClickedHTML[0] = temp.innerHTML;
        document.getElementById(ClickedID[0]).style.pointerEvents = "none";
    }
    else if(clicks == 2){
        ClickedID[1] = r;
        ClickedHTML[1] = temp.innerHTML;
        if (ClickedHTML[0] == ClickedHTML[1]){
            CorrectAnsw[ClickedID[0]] = 1;
            CorrectAnsw[ClickedID[1]] = 1;
            document.getElementById(ClickedID[0]).style.pointerEvents = "none";
            document.getElementById(ClickedID[0]).style.background = "lightcoral";
            document.getElementById(ClickedID[1]).style.pointerEvents = "none";
            document.getElementById(ClickedID[1]).style.background = "lightcoral";
        }
    }
    else if (clicks == 3){
        tries++
        clicks = 0;
        document.getElementById(ClickedID[0]).style.pointerEvents = "all";
        ClickedID[0] = 0;
        ClickedID[1] = 0;
        ClickedHTML[0] = "I";
        ClickedHTML[1] = "J";
        resetBoard();
    }
    countWinners();
}

function countWinners(){
    var counter = 0;
    for (i = 1; i < 17; i++){
        if (CorrectAnsw[i] == 1){
            counter++;
        }
    }
    if (counter == 16){
        document.getElementById("winner").innerHTML = "Total number of tries: " + tries;
    }
} 