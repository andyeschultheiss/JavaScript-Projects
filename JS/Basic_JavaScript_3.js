
function simpleSquareRoot() {
    var rootResult = 16 ** (0.5);
    document.getElementById("Math").innerHTML = rootResult;
}

function simpleSubtraction() {
    var subResult = 42 - 33;
    document.getElementById("MoreMath").innerHTML = subResult;
}

function multiMath() {
    var multiOpResult = (4*(12+3))%(10-3);
    document.getElementById("MultiMath").innerHTML = multiOpResult;
}

function incrementX() {
    var x = 5;
    x++;
    document.getElementById("incrementResult").innerHTML = "x = " + x;
}

function decrementY() {
    var y = 8;
    y--;
    document.getElementById("decrementResult").innerHTML = "y = " + y;
}

function randomToTen() {
    var z = Math.random() * 10;
    document.getElementById("randomResult").innerHTML = z;
}

function lnTwo() {
    var groovy = Math.LN2;
    document.getElementById("lnOfTwo").innerHTML = groovy;
}