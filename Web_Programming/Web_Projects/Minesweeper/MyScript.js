var r;
var flag = 0;
var lose = 0;
var winner = 0;
var Visited = new Array(65).fill(0);
var Counters = new Array(65).fill(0);

function boardPadding(){
    var q = window.prompt("Enter number of mines");
    if (q > 36){
        flag = 1;
        alert("Please chose a number between 1 and 36");
        location.reload();
    }

    if (flag != 1){
        for (i=0; i<q; i++){
            r = Math.floor(Math.random() * 64) + 1;
            while (Visited[r] == 1){
                r = Math.floor(Math.random() * 64) + 1;
            }
            document.getElementById(r).innerHTML = "&#9827;";
            Visited[r]++;
            document.getElementById(r).style.color = "gainsboro";

            var temp = document.getElementById(r).className;
            
            if (temp == "top"){ 
                topElements();
            }
            else if (temp == "bottom"){ 
                bottomElements();
            }
            else if (temp == "left"){
                leftElements();
            }
            else if (temp == "right"){ 
                rigthElements();
            }
            else if (temp == "lbottom"){ 
                leftBottomElement();
            }
            else if (temp == "rbottom"){ 
                rightBottomElement();
            }
            else if (temp == "ltop"){
                leftTopElement();
            }
            else if (temp == "rtop"){ 
                rightTopElement();
            }
            else{
                centreElements();
            }
        }
        for (i=1; i<65; i++){
            if (Counters[i] != 0){
                if (Visited[i] != 1){
                    document.getElementById(i).innerHTML = Counters[i];
                    document.getElementById(i).style.color = "gainsboro";
                }
            }
        }
    }
}

function onTesting(clicked_id){
    if (Visited[clicked_id] == 1){
        lose = 1;
        document.getElementById(clicked_id).style.background = "lightcoral";
    }
    else{
        document.getElementById(clicked_id).style.background = "lightgreen";
        winner++;
    }
    document.getElementById(clicked_id).style.color = "grey";
    if (lose == 1){
        document.getElementById("winner").innerHTML = "Too bad! You lose with " + winner + " right tiles.";
        document.getElementById("winner").style.color = "lightcoral";   
    }
}

function topElements(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r+9] != 1){
        Counters[r+9]++;
    }
    if (Visited[r+7] != 1){
        Counters[r+7]++;
    }
}

function bottomElements(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r-7] != 1){
        Counters[r-7]++;
    }
    if (Visited[r-9] != 1){
        Counters[r-9]++;
    }
}

function leftElements(){
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r-7] != 1){
        Counters[r-7]++;
    }
    if (Visited[r+9] != 1){
        Counters[r+9]++;
    }
}

function rigthElements(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r+7] != 1){
        Counters[r+7]++;
    }
    if (Visited[r-9] != 1){
        Counters[r-9]++;
    }
}

function leftTopElement(){
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r+9] != 1){
        Counters[r+9]++;
    }
}

function rightTopElement(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r+7] != 1){
        Counters[r+7]++;
    }
}

function leftBottomElement(){
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r-7] != 1){
        Counters[r-7]++;
    }
}

function rightBottomElement(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r-9] != 1){
        Counters[r-9]++;
    }
}

function centreElements(){
    if (Visited[r-1] != 1){
        Counters[r-1]++;
    }
    if (Visited[r+1] != 1){
        Counters[r+1]++;
    }
    if (Visited[r-8] != 1){
        Counters[r-8]++;
    }
    if (Visited[r+8] != 1){
        Counters[r+8]++;
    }
    if (Visited[r+7] != 1){
        Counters[r+7]++;
    }
    if (Visited[r+9] != 1){
        Counters[r+9]++;
    }
    if (Visited[r-7] != 1){
        Counters[r-7]++;
    }
    if (Visited[r-9] != 1){
        Counters[r-9]++;
    }
}