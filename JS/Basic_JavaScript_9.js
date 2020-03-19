
function countdown() {
    var seconds = Number(document.getElementById("seconds").value);

    function tick() {
        timer.innerHTML = seconds;
        seconds = seconds - 1;
        setTimeout(tick, 1000);
        if (seconds == -1) {
            timer.innerHTML = "0";
            alert("Time is up!");
        }
    }

    tick();
}