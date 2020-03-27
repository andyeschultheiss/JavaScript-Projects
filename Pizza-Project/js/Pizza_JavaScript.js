function getReceipt() {
    //Initialize string to be passed between functions,
    //growing line-by-line into the receipt
    var txt1 = "<h3>You Ordered:</h3>";
    var runningTotal = 0;
    var sizeTotal = 0;
    var sizeArray = document.getElementsByClassName("size");

    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var selectedSize = sizeArray[i].value;
            txt1 = txt1 + selectedSize + "<br>";
        }
    }

    if (selectedSize === "Personal Pizza") {
        sizeTotal = 6;
    } else if (selectedSize === "Small Pizza") {
        sizeTotal = 8;
    } else if (selectedSize === "Medium Pizza") {
        sizeTotal = 10;
    } else if (selectedSize === "Large Pizza") {
        sizeTotal = 14;
    } else if (selectedSize === "Extra Large Pizza") {
        sizeTotal = 16;
    }

    runningTotal = sizeTotal;
    console.log(selectedSize + " = $" + sizeTotal + ".00");
    console.log("size text1: " + txt1);
    console.log("subtotal: $" + runningTotal + ".00");

    getMeat(runningTotal, txt1);
}

function getMeat(runningTotal, txt1) {
    var meatTotal = 0;
    var selectedMeat = [];
    var meatArray = document.getElementsByClassName("meats");
    for (var j = 0; j < meatArray.length; j++) {
        if (meatArray[j].checked) {
            selectedMeat.push(meatArray[j].value);
            console.log("selected meat item: " + meatArray[j].value);
            txt1 = txt1 + meatArray[j].value + "<br>";
        }
    }
    var meatCount = selectedMeat.length;
    if (meatCount > 1) {
        meatTotal = meatCount - 1;
    } else {
        meatTotal = 0;
    }
    runningTotal = runningTotal + meatTotal;
    console.log("total selected meat items: " + meatCount);
    console.log(meatCount + " meat - 1 free = $" + meatTotal + ".00");
    console.log("meat text1: " + txt1);
    console.log("purchase total: $" + runningTotal + ".00");

    getVeg(runningTotal, txt1);
}

function getVeg(runningTotal, txt1) {
    var vegTotal = 0;
    var selectedVeg = [];
    var vegArray = document.getElementsByClassName("veg");
    for (var j = 0; j < vegArray.length; j++) {
        if (vegArray[j].checked) {
            selectedVeg.push(vegArray[j].value);
            console.log("selected veg item: " + vegArray[j].value);
            txt1 = txt1 + vegArray[j].value + "<br>";
        }
    }
    var vegCount = selectedVeg.length;
    if (vegCount > 1) {
        vegTotal = vegCount - 1;
    } else {
        vegTotal = 0;
    }
    runningTotal = runningTotal + vegTotal;
    console.log("total selected veg items: " + vegCount);
    console.log(vegCount + " veg - 1 free = $" + vegTotal + ".00");
    console.log("veg text1: " + txt1);
    console.log("purchase total: $" + runningTotal + ".00");

    document.getElementById("showText").innerHTML = txt1;
    document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>$" + runningTotal + ".00</strong></h3>";
    
    //easter egg
    if (txt1.includes("Anchovies") && txt1.includes("Whipped Cream")) {
        showMsg();
        setTimeout(function() {hideMsg();}, 1500);
        console.log("Cowabunga, Dude!");
    }
}

function showMsg() {
    document.getElementById('msgBox').style.display = 'block';
    document.getElementById('photoBox').style.display = 'block';
}

function hideMsg() {
    document.getElementById('msgBox').style.display = 'none';
    document.getElementById('photoBox').style.display = 'none';
}