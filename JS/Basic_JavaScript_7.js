
var timeOfDay = -1;

function greetingTime() {
    timeOfDay = document.getElementById("Hour_of_Day").value;

    if ((timeOfDay < 12) && (timeOfDay > 0)) {
        document.getElementById("Greeting_Output_Box").innerHTML = "Good morning!";
        console.log("morning");
    }
    else if ((timeOfDay >= 12) && (timeOfDay < 18)) {
        document.getElementById("Greeting_Output_Box").innerHTML = "Good afternoon!";
        console.log("afternoon");
    }
    else {
        document.getElementById("Greeting_Output_Box").innerHTML = "Good evening!";
        console.log("evening");
    }

}

    
 
