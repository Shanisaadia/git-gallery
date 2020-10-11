'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWERFOOD = '🍦';

var gFoodCount = 0;
var gIsVictory = false;
var gIntervalCherrys;


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('Starting init');
    gBoard = buildBoard();
    console.table(gBoard);

    createPacman(gBoard);
    // createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    console.table(gBoard);

    gGame.isOn = true;
    gIsVictory = false;
    gFoodCount = 0;
    // gFoodCount = foodCount(gBoard);
    console.log('This is gFoodCount:', gFoodCount);

    gGame.score = 0;
    updateScore(gGame.score);
    console.log('This is gGame.score:', gGame.score);


    // Remove elements from DOM
    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'none';

    var elRestart = document.querySelector('.restart');
    elRestart.style.display = 'none';

    var elPlayAgain = document.querySelector('.play-again');
    elPlayAgain.style.display = 'none';


    console.log('Finish init');

}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            // Define Wall location andd added it. 
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }

            // Define Power food location andd added it. 
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8) {
                board[i][j] = POWERFOOD;
            }

        }
    }
    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    console.log('This is gGame.score:', gGame.score);
    console.log('This is gFoodCount:', gFoodCount);

}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)

    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'block';

    var elRestart = document.querySelector('.restart');
    elRestart.style.display = 'block';
}

function restart() {
    clearInterval(gIntervalGhosts);
    gGhosts = [];
    init();
}

function checkVictory() {
    gFoodCount = foodCount(gBoard);
    if (gFoodCount === 0) {
        console.log('This is gFoodCount:', gFoodCount);
        console.log('This is gGame.score:', gGame.score);

        gIsVictory = true;

        var elPlayAgain = document.querySelector('.play-again');
        elPlayAgain.style.display = 'block';
    }
}

function foodCount(board) {
    gFoodCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            if (currCell === FOOD)
                gFoodCount++
        }
    }
    return gFoodCount;
}

