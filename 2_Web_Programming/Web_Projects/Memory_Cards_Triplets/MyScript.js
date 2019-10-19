var tries = 1;
var clicks = 0; // Keeping ID and HTML text for comparing the last two selected cards
var ClickedID = [0, 0, 0]; 
var ClickedHTML = ["D", "E", "F"];

var Counters = new Array(17).fill(0);
var CorrectAnsw = new Array(17).fill(0);
var Letters = ["A", "B", "C"];

function Initial(){
    tries = 0;
    clicks = 0; // Keeping ID and HTML text for comparing the last two selected cards
    ClickedID = [0, 0, 0]; 
    ClickedHTML = ["D", "E", "F"];
    document.getElementById("winner").innerHTML = "Tries: " + tries;
    Counters = new Array(17).fill(0);
    CorrectAnsw = new Array(17).fill(0);
    Letters = ["A", "B", "C"];

    cardPadding();
}

function cardPadding(){ // Initializing game board
    for (j = 0; j < 3; j++){
        for (i = 0; i < 3; i++){
            var r = Math.floor(Math.random() * 9) + 1;
            while (Counters[r] != 0){
                r = Math.floor(Math.random() * 9) + 1; 
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
    document.getElementById("winner").innerHTML = "Tries: " + tries;

    if (clicks == 1){
        tries++;
        ClickedID[0] = r;
        ClickedHTML[0] = temp.innerHTML;
        document.getElementById(ClickedID[0]).style.pointerEvents = "none";
    }
    else if(clicks == 2){
        tries++;
        ClickedID[1] = r;
        ClickedHTML[1] = temp.innerHTML;
        if (ClickedHTML[0] == ClickedHTML[1]){
            document.getElementById(ClickedID[0]).style.pointerEvents = "none";
            document.getElementById(ClickedID[1]).style.pointerEvents = "none";
        }
    }
    else if(clicks == 3){
        ClickedID[2] = r;
        ClickedHTML[2] = temp.innerHTML;
        if (ClickedHTML[0] != ClickedHTML[1]){
            clicks = 0;
            document.getElementById(ClickedID[0]).style.pointerEvents = "all";
            document.getElementById(ClickedID[1]).style.pointerEvents = "all";
            resetBoard();
        }
        else if (ClickedHTML[1] == ClickedHTML[2]){
            tries++;
            clicks = 0;
            CorrectAnsw[ClickedID[0]] = 1;
            CorrectAnsw[ClickedID[1]] = 1;
            CorrectAnsw[ClickedID[2]] = 1;
            document.getElementById(ClickedID[2]).style.pointerEvents = "none";
            document.getElementById(ClickedID[0]).style.background = "lightcoral";
            document.getElementById(ClickedID[1]).style.background = "lightcoral";
            document.getElementById(ClickedID[2]).style.background = "lightcoral";
        }
    }
    else if (clicks == 4){
        if (ClickedHTML[1] != ClickedHTML[2]){
            clicks = 0;
            document.getElementById(ClickedID[0]).style.pointerEvents = "all";
            document.getElementById(ClickedID[1]).style.pointerEvents = "all";
            document.getElementById(ClickedID[2]).style.pointerEvents = "all";
            resetBoard();
        }
        else{
            tries++;
        }
        clicks = 0;
        document.getElementById(ClickedID[0]).style.pointerEvents = "all";
        ClickedID[0] = 0;
        ClickedID[1] = 0;
        ClickedID[2] = 0;
        ClickedHTML[0] = "D";
        ClickedHTML[1] = "E";
        ClickedHTML[2] = "F";
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
    if (counter == 9){
        var user = "";
        var pass = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLenght = characters.length;
        if (tries < 25){
            for (var i = 0; i < charactersLenght; i++){
                user += characters.charAt(Math.floor(Math.random() * charactersLenght));
            }
            console.log(user);
            for (var i = 0; i < charactersLenght; i++){
                pass += characters.charAt(Math.floor(Math.random() * charactersLenght));
            }
            window.alert("Your username is: " + user + "\n" + "Your password is: " + pass);
        }
        else{
            Initial();
        }
    }
} 
