'use strict'

var gBalloons;
var gBalloonsInterval;

resetGame();
function resetGame() {
    gBalloons = [
        { id: 1, distance: 0, speed: 50 },
        { id: 1, distance: 0, speed: 30 }
    ];

    renderBalloons();
    gBalloonsInterval = setInterval(moveUp, 1000);
}


function moveUp() {
    for (var i = 0; i, gBalloons.length; i++) {
        var currBalloon = gBalloons[i];
        currBalloon.distance += currBalloon.speed;
        var elCurrBalloon = document.querySelector('.balloon' + (i + 1));
        elCurrBalloon.style.bottom = currBalloon.distance + 'px';
        if (currBalloon.distance >= 1000) {
            clearInterval(gBalloonsInterval);
        }
    }
}

function pop(balloonIdxStr) {
    var balloonIdx = +balloonIdxStr
    var elBalloon = document.querySelector('.balloon' + balloonIdx);
    elBalloon.style.display = 'none';
    var audio = new Audio('audio/popSound.mp3')
    audio.play();
}

function renderBalloons() {
    var strHtml = '';
    for (var i = 0; i < gBalloons.length; i++) {
        strHtml += '<div onclick="pop(' + (i+1) + ')" class="balloon balloon' + (i + 1) + '"></div>';
    }
    var elSKy = document.querySelector('.sky');
    elSKy.innerHTML = strHtml;
}

