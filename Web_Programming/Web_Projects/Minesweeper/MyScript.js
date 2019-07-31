var flag = 0;

function boardPadding(){
    var Counters = new Array(65).fill(0);
    var Visited = new Array(65).fill(0); 
    var q = window.prompt("Enter number of mines");
    if (q > 36){
        flag = 1;
        alert("Please chose a number between 1 and 36");
        location.reload();
    }

    if (flag != 1){
        for (i=0; i<q; i++){
            var r = Math.floor(Math.random() * 64) + 1;
            while (Visited[r] == 1){
                r = Math.floor(Math.random() * 64) + 1;
            }
            document.getElementById(r.toString()).innerHTML = "&#9827;";
            Visited[r]++;
            // document.getElementById(r.toString()).style.color = "gainsboro";
            
            // *! Added class labels to border elements
            // *TODO Expand if statements for every element in the board 

            var temp = document.getElementById(r).className;
            console.log(temp);
            
        }
        for (i=1; i<65; i++){
            if (Counters[i] != 0){
                if (Visited[i] != 1){
                    document.getElementById(i).innerHTML = Counters[i];
                }
            }
        }
    }
}