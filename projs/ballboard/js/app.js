'use strict';

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png"/>';
const BALL_IMG = '<img src="img/ball.png"/>';
const GLUE_IMG = '<img src="img/glue.png"/>';

var gGamerPos;
var gBoard;
var gNewBallInterval;
var gGlueInterval;
var gCollectedBallsCount = 0;
var gBallCount = 0;
var gIsGameOn;
var gIsGlueOn;

function init() {
	gGamerPos = { i: 1, j: 1 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gCollectedBallsCount = 0;
	gBallCount = 1;
	console.log('Init phase 1 done');
	addNewBalls();
	addGlue();
	gIsGameOn = true;
	gIsGlueOn = false;
}

function addNewBalls() {
	gNewBallInterval = setInterval(createBall, 5000);
}

function addGlue() {
	gGlueInterval = setInterval(createGlue, 5000);
}

function buildBoard() {
	var board = [];
	for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 12; j++) {
			board[i][j] = {
				gameElement: null
			};
			if (i === 0 || i === 9 || j === 0 || j === 11) {
				board[i][j].type = WALL;
			} else {
				board[i][j].type = FLOOR;
			}
		}
	}

	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[1][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	if (!gIsGlueOn) {
		var targetCell = gBoard[i][j];

		// If the clicked Cell is WALL don't do nothig.
		if (targetCell.type === WALL) return;

		// If the clicked Cell is GLUE > set gIsGlue on to true for x sec.
		if (targetCell.gameElement === GLUE) {
			gIsGlueOn = true;
		}
		setTimeout(function () {
			gIsGlueOn = false;
		}, 8000);

		// Calculate distance to ake sure we are moving to a neighbor cell
		var iAbsDiff = Math.abs(i - gGamerPos.i);
		var jAbsDiff = Math.abs(j - gGamerPos.j);

		// If the clicked Cell is one of the four allowed
		if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

			if (targetCell.gameElement === BALL) {
				// console.log('Collecting!');
				gBallCount--;
				gCollectedBallsCount++;
				// console.log('This is gCollectedBallsCount', gCollectedBallsCount);

				var elCounter = document.querySelector('.counter');
				elCounter.innerText = `${gCollectedBallsCount} balls were collected`;
				var audio = new Audio('audio/popSound.mp3')
				audio.play();
			}

			// Update MODEL
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
			// Update DOM
			renderCell(gGamerPos, '');

			// Update MODEL
			gGamerPos = { i: i, j: j };
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
			// Update DOM
			renderCell(gGamerPos, GAMER_IMG);

			// If the clicked Cell is glue
			if (targetCell.gameElement === GLUE) return;

			checkVictory();
		}
	}

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(ev) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (ev.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function createBall() {
	console.log('Create ball');
	var rndRowIdx = getRandomInt(1, gBoard.length - 1);
	var rndColIdx = getRandomInt(1, gBoard[0].length - 1);
	var coord = {
		i: rndRowIdx,
		j: rndColIdx,
	}
	while (gBoard[coord.i][coord.j].gameElement !== null) {
		rndRowIdx = getRandomInt(1, gBoard.length - 1);
		rndColIdx = getRandomInt(1, gBoard[0].length - 1);
		coord = {
			i: rndRowIdx,
			j: rndColIdx,
		}
	}
	gBoard[coord.i][coord.j].gameElement = BALL;
	renderCell(coord, BALL_IMG);
	gBallCount++;
	console.log('This is gBallCount', gBallCount);
	return;
}

function checkVictory() {
	if (gBallCount === 0) {
		console.log('gBallCount:', gBallCount, 'gCollectedBallsCount:', gCollectedBallsCount);
		gIsGameOn = false;
		var elVictory = document.querySelector('.victory');
		elVictory.innerHTML = 'No balls left! GAME OVER';
		elVictory.style.display = 'block';
		clearInterval(gNewBallInterval);
		clearInterval(gGlueInterval);
		var elBtn = document.querySelector('.restart');
		elBtn.innerHTML = '<button onclick="gameRestart(this)">Start a new game!</button>';
	}
}

function gameRestart() {
	// gIsGameOn = true;
	var elVictory = document.querySelector('.victory');
	elVictory.style.display = 'none';
	var elCounter = document.querySelector('.counter');
	elCounter.style.display = 'none';
	init();
}

function createGlue() {
	console.log('Create glue');
	var rndRowIdx = getRandomInt(1, gBoard.length - 1);
	var rndColIdx = getRandomInt(1, gBoard[0].length - 1);
	var coord = {
		i: rndRowIdx,
		j: rndColIdx,
	}
	while (gBoard[coord.i][coord.j].gameElement !== null) {
		rndRowIdx = getRandomInt(1, gBoard.length - 1);
		rndColIdx = getRandomInt(1, gBoard[0].length - 1);
		coord = {
			i: rndRowIdx,
			j: rndColIdx,
		}
	}
	gBoard[coord.i][coord.j].gameElement = GLUE;
	renderCell(coord, GLUE_IMG);
	setTimeout(removeGlue, 3000, coord);
	return;
}

function removeGlue(coord) {
	console.log('Remove glue');
	var currCell = gBoard[coord.i][coord.j];
	if (currCell.gameElement !== GLUE) {
		return;
	} else {
		currCell.gameElement = 'null';
		renderCell(coord, '')
	}
}

