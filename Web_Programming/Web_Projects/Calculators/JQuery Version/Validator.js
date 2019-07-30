function validateFields() {

    var firstNum = document.getElementById("firstNum").value;
    var secondNum = document.getElementById("secondNum").value;
    var symbol = document.getElementById("symbol").value;

    if (firstNum == null || firstNum == "" || secondNum == null || secondNum == "" || symbol == null || symbol == ""){
        alert("At least one of the form fields is empty! Please try again.");
    }
    else{
        if (isNaN(firstNum) || isNaN(secondNum) == true){
            alert("Not a number! Please try again.")
        }
        else{
            if (symbol !== "+" && symbol !== "-" && symbol !== "*" && symbol !== "/"){
                alert("Please insert valid symbol!")
            }
        }
    }
}   