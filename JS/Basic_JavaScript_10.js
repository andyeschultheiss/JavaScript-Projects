function startFunction() {
    var booldisabled = document.getElementById("testButton").disabled;
    if (booldisabled) {
        document.getElementById("testButton").disabled = false;
    }
    else {
        document.getElementById("testButton").disabled = true;
    }
}

function bikeArray() {

    let myBike = {
        brand: "All-City",
        model: "Space Horse",
        year: 2012,
        size: 61,
        color: "Orange",
        description: function() {
            return "My bike is a " + this.year + " " + this.brand + " " +
                this.model + " in size " + this.size + " and its color is "
                + this.color;
        }
    };

    document.getElementById("MyBike_Description").innerHTML = myBike.description();

    var bike_pics = [];
    bike_pics[0] = "Elven Blue All-City Space Horse";
    bike_pics[1] = "Space Horse Disc in Black & White";
    bike_pics[2] = "Randonneur Setup in British Racing Green";
    bike_pics[3] = "Single-Speed Space Horse Build";

    var bike_size = [];
    var i;

    for (i=0; i<7; i++){
        bike_size[i] = 43 + 3 * i;
        console.log(bike_size[i]);
    }

    var text = "";
    for (i=0; i<bike_size.length; i++) {
        if (bike_size[i] > 46) {break;}
        text += bike_size[i].toString() + "<br>";
    }
    document.getElementById("sizeDescription").innerHTML = "The following sizes are available in 650b wheel size:<br>" + text;

    document.getElementById("Bike_Description").innerHTML = bike_pics[1] + ":";
    
    var bikepic = document.createElement("IMG");
    bikepic.setAttribute("src", "./Images/B_and_W_SH.jpg");
    bikepic.setAttribute("width", "600");
    bikepic.setAttribute("height", "400");
    bikepic.setAttribute("alt", "Space Horse Disc in B&W");
    document.body.appendChild(bikepic);

}