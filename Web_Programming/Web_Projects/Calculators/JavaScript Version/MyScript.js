function getInput(){
    var n1 = parseInt(document.getElementById("firstNum").value);
    var n2 = parseInt(document.getElementById("secondNum").value);
    var s1 = document.getElementById("symbol").value;
    
    if ((n1 != "") && (n2 != "") && (s1 != "")){
        if (s1 == "+"){
            var result = n1 + n2;
        } 
        else if (s1 == "-"){
            var result = n1 - n2;
        }
        else if (s1 == "*"){
            var result = n1 * n2;
        }
        else if (s1 == "/"){
            var result = n1 / n2;
        }
        else{
            alert("Please insert valid calculation symbol!");
        }
        document.getElementById("result").innerHTML = result;
    }
}