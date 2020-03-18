
var firstString, secondString, completeString;

function concatenateTwo() {
    firstString = document.getElementById("String_1").value;
    secondString = document.getElementById("String_2").value;

    completeString = firstString.concat(secondString);

    document.getElementById("Output_Box").innerHTML = completeString;

}

 function searchSecond() {
     var n = completeString.search(secondString);

     document.getElementById("Second_Position").innerHTML = n.toString();
 }

 function precisionSet() {
    var numToSet = Number(document.getElementById("Number_to_Set").value);
    var precisionLevel = Number(document.getElementById("Precision_Level").value);

    document.getElementById("Precision_Set_Output").innerHTML = numToSet.toPrecision(precisionLevel);


 }

 function threeDecimalPlaces() {
    var numToSet = Number(document.getElementById("Number_to_Set").value);

    document.getElementById("Three_Dec_Output").innerHTML = numToSet.toFixed(3);

 }
    
 
