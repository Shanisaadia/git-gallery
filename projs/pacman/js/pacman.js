'use strict'
const PACMAN = '😉';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    console.log('This is gPacman.isSuper now:', gPacman.isSuper);

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;

    if (nextCell === POWERFOOD) {
        gPacman.isSuper = true;
    }
    setTimeout(function () {
        gPacman.isSuper = false;
    }, 10000);

    if (nextCell === FOOD) updateScore(1);



    else if (nextCell === GHOST) {

        if (gPacman.isSuper === true) {
            for (var i = 0; i < gGhosts.length; i++) {
                var ghost = gGhosts[i];
                if (nextLocation.i === ghost.location.i && nextLocation.j === ghost.location.j) {
                    ghost.isSuspended = true;
                    var ghostIdx = i;
                    console.log('kkn', ghostIdx);
                }
            }
            killGhost(ghostIdx);
            setTimeout(reviveGhost, 6000);

            // update the model
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

            // update the dom
            renderCell(gPacman.location, EMPTY);

            gPacman.location = nextLocation;

            // update the model
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
            // update the dom
            renderCell(gPacman.location, PACMAN)

        }

        else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }

    }



    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN)

    checkVictory();
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}