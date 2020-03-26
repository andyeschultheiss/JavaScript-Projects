//This function is run once the DOM is loaded
//Disable stop button since it is not needed prior to game start
window.onload = function() {watch()};
function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn);  //disable stop button
}

function rollForTurn() {
    var xArray = [1,1];
    var ranNum = '';
    var min = 1;
    var max = 11;
    var first = "";
    var txt1 = "";
    var pOne = xArray[0];
    var pTwo = xArray[1];
    while (pOne == pTwo) { //re-roll if there are ties
        for (var i = 0; i < 2; i++) {
            //random whole number 1-10
            ranNum = Math.floor(Math.random()*(max-min) + min);
            xArray.push(ranNum);
        }
        var pOneIndex = xArray.length - 2;
        var pTwoIndex = xArray.length - 1;
        pOne = xArray[pOneIndex];
        pTwo = xArray[pTwoIndex];
    }
    diceRoll();  //play dice sounds

    //build string to show player dice rolls
    for (i = 0; i < xArray.length; i++) {
        txt1 = "Player 1 rolled " + pOne +"<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled " + pTwo + "<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000); //time delay for effect
    }

    //build string showing which player won the roll
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function() {txt1 = txt1 + "Player 1 wins the roll!<br>Please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() {txt1 = txt1 + "Player 2 wins the roll!<br>Please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    //pass which player won the roll
    return first;
}

//Initiate game, roll for turn, & determine active player
function startGame() {
    var activePlayer = rollForTurn();
    setTimeout(function() {hideGameMsg();}, 4000);

    //assign state of control butto
    var btn = document.getElementById('btnStart');
    btnDisabled(btn); //disable start button since new game is active

    btn = document.getElementById('btnStop');
    stopEnabled(btn); //enable stop button for new game

    btn = document.getElementById('settingsBtn');
    btnDisabled(btn); //disable change of settings once game begins

    //assign active player to the console
    var showPlayer = document.getElementById('showPlayer');
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "#5fdc37";
    
}

//style buttons when disabled
function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153,153,102)";
    btn.style.backgroundColor = "rgb(214,214,194)";
    btn.disabled = true;
}

function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(164, 64, 48)";
    btn.style.backgroundColor = "rgb(220, 75, 55)";
    btn.disabled = false;
}

function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(47, 131, 47)";
    btn.style.backgroundColor = "rgb(95, 220, 55)";
    btn.disabled = false;
}

function settingsEnabled(btn) {
    btn.style.backgroundColor = "rgb(155, 155, 155)";
    btn.style.border = "2px solid rgb(0,0,0)";
    btn.style.color = "#fff";
    btn.disabled = false;
}

//when user indicates, stop current game and reset game
function stopGame() {
    hideGameMsg(); //clear text, hide message box
    document.getElementById('photoBox').style.display = 'none';
    var btn = document.getElementById('btnStart');
    startEnabled(btn); //enable restart
    btn = document.getElementById('btnStop');
    btnDisabled(btn); //disable stop since already stopped
    btn = document.getElementById('settingsBtn');
    settingsEnabled(btn); //enable switch of avatars
    var showPlayer = document.getElementById('showPlayer');
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = "#db3835";

    //reset squares to starting empty state
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i = 0; i < arrayO.length; i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i < arrayX.length; i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }

    //clear running log of game moves
    document.getElementById('boardState').innerHTML = "";

}

//show message console and any text it may contain
function showGameMsg() {
    document.getElementById('gameMsgBox').style.display = 'block';
}

//conceal message console from view
function hideGameMsg() {
    clearMsg(); //clear text from console
    document.getElementById('gameMsgBox').style.display = 'none'; //hide div
}

//write text to message console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById('gameMsg').innerHTML = txt;
}

//clear text from message console
function clearMsg() {
    document.getElementById('gameMsg').innerHTML = "";
}

//this function is for the player config panel and
//checks proposed avatar assignments, keeping them from being identical
function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both be assigned " + p1Selected[p1Index].text);
    } else {
        document.getElementById('p1Display').innerHTML = p1Selected[p1Index].text;
        document.getElementById('p2Display').innerHTML = p2Selected[p2Index].text;
    }
}

//return currently assigned avatar for each player
function getAvatars() {
    var p1Avatar = document.getElementById('p1Display').innerHTML;
    var p2Avatar = document.getElementById('p2Display').innerHTML;
    var avatarArray = [p1Avatar, p2Avatar];
    return avatarArray;
}

//return active player's avatar
function determineAvatar() {
    //determine correct avatar to paint for active player
    var avatarArray = getAvatars(); 
    var active = document.getElementById('showPlayer').innerHTML; 
    var p1Avatar = avatarArray[0];
    var p2Avatar = avatarArray[1];
    //check active player and corresponding avatar
    if (active == "Player 1") {
        var paintAvatar = p1Avatar;
    } else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar; //return correct avatar
}

//change active player over to other player
function avatarPlaced() {
    var parseText = document.getElementById('gameMsg').innerHTML;
    var activePlayer = document.getElementById('showPlayer').innerHTML; //get current player from the element
    //check for a winner and if so, don't continue
    if (parseText == "Three in a row, Player 1 wins!" || parseText =="Three in a row, Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = "#db3835";
    }
    if (activePlayer == "Player 1") {
        //once active player selects a square, change to other player active
        showPlayer.innerHTML = "Player 2";
    } else if (activePlayer == "Player 2") {
        showPlayer.innerHTML = "Player 1";
    }
    checkForTie(); //call tie function to see if there is a cat's game
}

//get array of current board and check for proposed move validity
function check(info, square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0); //compare just index of square
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

//check with this function to see if a square has already been assigned
//and if not, record new square with assigned avatar
function recordMoves(square) {
    //retrieve boardState array
    var boardState = document.getElementById('boardState').innerHTML;
    //separate string by commas to create array, remove leading comma
    boardState = boardState.substring(1);
    var info = boardState.split(',');
    var verdict = check(info, square); //check if occupied
    return verdict;
}

//get list of previous moves and add current move to it
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves + currentMove;
}

//check winning conditions
function checkForWinCon() {
    var traceArray = [];
    //fill dummy array with 9 "AA"s 
    for (var i = 0; i < 9; i++) {
        traceArray[i] = "AA";
    }
    //retrieve boardState array
    var boardState = document.getElementById('boardState').innerHTML;
    //separate string by commas to create array, remove leading comma
    boardState = boardState.substring(1);
    var info = boardState.split(',');
    info.sort(); //sort in order despite gameplay sequence
    for (var i in info) {
        traceArray[Number(info[i].charAt(0))-1] = info[i];
        //place moves in trace array with AA placeholders
    }
    console.log(traceArray);
    //check for any possible win conditions:
    //horizontal win condition
    checkWinConHori(traceArray);
    //vertical win condition
    checkWinConVert(traceArray);
    //diagonal win condition
    checkWinConDiag(traceArray);

    console.log("New CHECK: " + document.getElementById('gameMsg').innerHTML);
    checkForTie();
}

//horizontal win condition
function checkWinConHori(traceArray) {
    var winDetected = "on";
    var winCon = [];
    for (var i = 0; i < 8; i += 3) {
        //check for a horizontal three-in-a-row, starting with squares 1, 4, and 7
        //must match i+1 and i+2 characters
        if (traceArray[i].charAt(0) == "1" || 
            traceArray[i].charAt(0) == "4" ||
            traceArray[i].charAt(0) == "7") {
            if ((traceArray[i].charAt(1) == traceArray[i+1].charAt(1)) &&
                (traceArray[i].charAt(1) == traceArray[i+2].charAt(1))) {
                winDetected = "win";
                winCon = [i, i+1, i+2];
            }
        }
    }
    winner(winDetected, winCon);
}

//vertical win condition
function checkWinConVert(traceArray) {
    var winDetected = "on";
    var winCon = [];
    for (var i = 0; i < 3; i++) {
        //checking 1,2, and 3 positions as starts of vertical three-in-a-row's
        //must match both (i+3) and (i+6) characters
        if (traceArray[i].charAt(0) == "1" || 
            traceArray[i].charAt(0) == "2" ||
            traceArray[i].charAt(0) == "3") {
            if ((traceArray[i].charAt(1) == traceArray[i+3].charAt(1)) &&
                (traceArray[i].charAt(1) == traceArray[i+6].charAt(1))) {
                winDetected = "win";
                winCon = [i, i+3, i+6];
                winner(winDetected, winCon);
            }
        }
    }
}

//diagonal win condition
function checkWinConDiag(traceArray) {
    var winDetected = "on";
    var winCon = [];
    for (var i = 0; i < 3; i += 2) {
        //check starting in square 1 for match with squares 5 and 9
        if (traceArray[i].charAt(0) == "1") {
            if ((traceArray[i].charAt(1) == traceArray[i+4].charAt(1)) &&
                (traceArray[i].charAt(1) == traceArray[i+8].charAt(1))) {
                winDetected = "win";
                winCon = [i, i+4, i+8];
                winner(winDetected, winCon);
            }
        }
        //check square 3 with squares 5 and 7
        if (traceArray[i].charAt(0) == "3") {
            if ((traceArray[i].charAt(1) == traceArray[i+2].charAt(1)) &&
                (traceArray[i].charAt(1) == traceArray[i+4].charAt(1))) {
                winDetected = "win";
                winCon = [i, i+2, i+4];
                winner(winDetected, winCon);
            }
        }
        
    }
}

//check board state for ties and act accordingly
function checkForTie() {
    var boardState = document.getElementById('boardState').innerHTML;
    boardState = boardState.substring(1); //remove leading comma
    boardState = boardState.split(','); //separate by commas into array
    var check = document.getElementById('gameMsg').innerHTML;
    if (boardState.length >= 9 && check != "Three in a row, Player 1 wins!" && check != "Three in a row, Player 2 wins!") {
        var txt1 = "Cat's Game! Nobody wins...";
        tieSound(); //play sound for tie detected
        writeMsg(txt1);
        document.getElementById('photoBox').style.display = 'block';
        setTimeout(function() {stopGame();}, 3000);
    }
}

//when a win is detected, call this function to execute winning process
function winner(winDetected, winCon) {
    if (winDetected == "win") {
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = "Three in a row, " + activePlayer + " wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        startEnabled(btn);
        btn = document.getElementById('btnStop');
        btnDisabled(btn);
        btn = document.getElementById('settingsBtn');
        settingsEnabled(btn); //enable switch of avatars again
        document.getElementById('showPlayer').innerHTML = "Game Stopped";
        glowBoard(winCon); //call function to illuminate winning squares
    }
}

function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName('square');
    var defaultColor = "#CBF7CB";
    var flashColor = "#FFFF7D";
    blink();
    winSound();
    for (var i = 0; i < squares.length; i++) {
        if (i == index0) {
            var bg1 = squares[i];

            setTimeout(function() {bg1.style.backgroundColor = flashColor;}, 200);
            setTimeout(function() {bg1.style.backgroundColor = defaultColor;}, 400);
            setTimeout(function() {bg1.style.backgroundColor = flashColor;}, 600);
            setTimeout(function() {bg1.style.backgroundColor = defaultColor;}, 800);
            setTimeout(function() {bg1.style.backgroundColor = flashColor;}, 1000);
            setTimeout(function() {bg1.style.backgroundColor = defaultColor;}, 1200);

        } else if (i == index1) {
            var bg2 = squares[i];

            setTimeout(function() {bg2.style.backgroundColor = flashColor;}, 250);
            setTimeout(function() {bg2.style.backgroundColor = defaultColor;}, 500);
            setTimeout(function() {bg2.style.backgroundColor = flashColor;}, 700);
            setTimeout(function() {bg2.style.backgroundColor = defaultColor;}, 850);
            setTimeout(function() {bg2.style.backgroundColor = flashColor;}, 1050);
            setTimeout(function() {bg2.style.backgroundColor = defaultColor;}, 1200);

        } else if (i == index2) {
            var bg3 = squares[i];

            setTimeout(function() {bg3.style.backgroundColor = flashColor;}, 300);
            setTimeout(function() {bg3.style.backgroundColor = defaultColor;}, 550);
            setTimeout(function() {bg3.style.backgroundColor = flashColor;}, 650);
            setTimeout(function() {bg3.style.backgroundColor = defaultColor;}, 900);
            setTimeout(function() {bg3.style.backgroundColor = flashColor;}, 1100);
            setTimeout(function() {bg3.style.backgroundColor = defaultColor;}, 1200);
            
        }
        
    }

    setTimeout(function() {stopGame();}, 1600);
}

//produce event sounds
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function() {sound.pause();}, 400);
    setTimeout(function() {sound.currentTime = 0;}, 500);
}

function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById("gameMsg").innerHTML;
    setTimeout(function() {sound.play();}, 500);
}

function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function() {sound.play();}, 500);
    setTimeout(function() {sound.pause();}, 2700);
    setTimeout(function() {sound.currentTime = 0;}, 2800);
}

function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}

function blink() {
    var body = document.getElementById('body');
    var flashColor = "#FFFF7D";
    var defaultColor = "white";

    setTimeout(function() {body.style.backgroundColor = flashColor;}, 100);
    setTimeout(function() {body.style.backgroundColor = defaultColor;}, 300);
    setTimeout(function() {body.style.backgroundColor = flashColor;}, 500);
    setTimeout(function() {body.style.backgroundColor = defaultColor;}, 700);
    setTimeout(function() {body.style.backgroundColor = flashColor;}, 900);
    setTimeout(function() {body.style.backgroundColor = defaultColor;}, 1200);
    
}

//function for click event in each square element (1-9)
function squareAnimate(squareNum) {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") {
        //prevent avatar placement if game has not yet started
        //check if valid
        var verdict = recordMoves(squareNum);
        if (verdict == undefined) {
            //if verdict is empty, then square is unoccupied
            var paintAvatar = determineAvatar(); //get correct avatar to paint
            var selected = document.getElementsByClassName(paintAvatar)[squareNum-1]; //paint avatar to selected position
            if (paintAvatar == "O") {
                //animate "O"
                animateO(selected);
            } else if (paintAvatar == "X") {
                //animate "X"
                animateX(selected);
            }
            //build new array adding newly selected square and its assigned avatar
            var currentMove = "," + squareNum + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); //check if current move completes a winning condition
            avatarPlaced(); //end turn and pass to other player
            squareSound(); //play game sound
        }
    }
}

//animation for O avatar
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0)" : "translateY(-100%)";
}

//animation for X avatar
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "translateY(0)" : "translateY(100%)";
}