let board = document.getElementById('game-board');
let waldoImg = document.getElementById('id-waldo');
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let timerSeconds = 0;
let waldoArray= [ {name: 'Waldo', found: false}, {name: 'Wilma', found: false}, {name: 'Wizard', found: false}, ] 
let clickCoords, myTimer;
;

function findMouse(e) {
    // document.body.textContent =
    // "clientX: " + e.clientX +
    // " - clientY: " + e.clientY;
    console.log('testing 1')

    console.log( "clientX: " + e.pageX +
    " - clientY: " + e.pageY)
}

// Get Postion of image
function FindPosition(oElement) {
    if(typeof( oElement.offsetParent ) != "undefined") {
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [ posX, posY ];
    } else {
        return [ oElement.x, oElement.y ];
    }
}

// Get Click Coordinates
function GetCoordinates(e) {
    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = FindPosition(waldoImg);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        PosX = e.pageX;
        PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
        PosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    // console.log('X: ' + PosX)
    // console.log('Y: ' + PosY)
    clickCoords = {x: PosX, y: PosY};
    console.log(clickCoords)
    imageChecker(clickCoords)
}

// Check coordinates of click
function imageChecker(coords) {
    let xCoord = coords.x
    let yCoord = coords.y

    // Coordinates for Waldo
    if (!waldoArray[0].found) {
        if(yCoord >= 210 && yCoord <= 290 && xCoord >= 635 && xCoord <= 665)  {
            console.log('Found Waldo')
            waldoArray[0].found = true
        }
    }

    // Coordiantes for Wilma 
    if (!waldoArray[1].found) {
        if(yCoord >= 325 && yCoord <= 385 && xCoord >= 290 && xCoord <= 325)  {
            console.log('Found Wilma')
            waldoArray[1].found = true
        }
    }

    // Coordinates for Wizard 
    if (!waldoArray[2].found) {
        if(yCoord >= 160 && yCoord <= 225 && xCoord >= 930 && xCoord <= 975)  {
            console.log('Found Wizard')
            waldoArray[2].found = true
        }
    }
    CheckEnd()
}

// Check for Game End
function CheckEnd() {
    let check = false;
    for(let i = 0; i < waldoArray.length; i++) {
        if(waldoArray[i].found) {
            check = true
        } else {
            check = false;
            break;
        }
    }
    if (check){
        let endSec = secondsLabel.innerHTML;
        let endMin = minutesLabel.innerHTML; 
        console.log('You Win')
        console.log('time: ' + endMin + ':' + endSec);
        clearInterval(myTimer);
        waldoImg.removeEventListener('click', GetCoordinates)
    }
}

function setTime() {
    timerSeconds++
    secondsLabel.innerHTML = pad(timerSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(timerSeconds / 60));
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function startGame(){
    console.log('start')
    waldoImg.addEventListener('click', GetCoordinates)
        start = true
        myTimer = setInterval(setTime, 1000);
}
function resetGame() {
    clearInterval(myTimer);
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    timerSeconds = 0
    waldoImg.removeEventListener('click', GetCoordinates)
    for(let i = 0; i < waldoArray.length; i++) {
        waldoArray[i].found = false;
    }
}
// Event listeners
// board.addEventListener('click', (e) => findMouse(e) )
startBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)

