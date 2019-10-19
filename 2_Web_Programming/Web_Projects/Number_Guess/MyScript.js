var r = Math.floor(Math.random() * 100) + 1

function takeNumber(){
    var temp = document.getElementById("number").value;
    if (temp != ""){
        if (temp > r){
            document.getElementById("result").innerHTML = "You need to guess lower!"
        }
        else if (temp < r){
            document.getElementById("result").innerHTML = "You need to guess higher!"
        }
        else{
            document.getElementById("result").innerHTML = "Correct! The number is " + r;
        }
    }
}