/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- ALSO, if the player rolls 2 times a 6, all his GLOBAL score gets lost. After that. it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The player can't choose to 'Hold', if his ROUND score is 0
- The first player to reach 100 points on GLOBAL score wins the game
- You can choose how many points you need to win the game, defaults is 100 points

*/

var scores, roundScore, activePlayer, gamePlaying;
var dice0Handler = document.getElementById('dice-0');
var dice1Handler = document.getElementById('dice-1');
var player0panelHandler = document.querySelector('.player-0-panel');
var player1panelHandler = document.querySelector('.player-1-panel');
var current0Handler = document.getElementById('current-0');
var current1Handler = document.getElementById('current-1');
init();


function nextPlayer() {

	activePlayer === 0? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	current0Handler.textContent = 0;
	current1Handler.textContent = 0;

	player0panelHandler.classList.toggle('active');
	player1panelHandler.classList.toggle('active');

}

function init() {

	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	dice0Handler.style.display = 'none';
	dice1Handler.style.display = 'none';

	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	player0panelHandler.classList.remove('winner');
	player1panelHandler.classList.remove('winner');
	player0panelHandler.classList.remove('active');
	player1panelHandler.classList.remove('active');
	player0panelHandler.classList.add('active');
}

function btnRoll() {

	if(gamePlaying) {


		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		dice0Handler.style.display = 'block';
		dice0Handler.src = "img/dice-" + dice0 + '.png';

		dice1Handler.style.display = 'block';
		dice1Handler.src = "img/dice-" + dice1 + '.png';

		if((dice0 == 6) && (dice1 == 6)) {

			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}

		else if((dice0 !== 1) && (dice1 !== 1)) {

			roundScore += dice0 + dice1;
			document.getElementById('current-' + activePlayer).textContent = roundScore;

		} else {

			nextPlayer();
		}
	}
}


function btnHold() {

	if (gamePlaying && roundScore !== 0) {

		scores[activePlayer] += roundScore;
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		var finalscore = document.querySelector('.finalscore').value;
		finalscore? finalscore : finalscore = 100;

		if(scores[activePlayer] >= finalscore) {

			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			dice0Handler.style.display = 'none';
			dice1Handler.style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		} else 
			nextPlayer();
	}

}

document.getElementById('btn-roll-0').addEventListener('click', function() { if(activePlayer === 0) btnRoll(); });
document.getElementById('btn-roll-1').addEventListener('click', function() { if(activePlayer === 1) btnRoll(); });
document.getElementById('btn-hold-0').addEventListener('click', function() { if(activePlayer === 0) btnHold(); });
document.getElementById('btn-hold-1').addEventListener('click', function() { if(activePlayer === 1) btnHold(); });

document.querySelector('.btn-new').addEventListener('click', init);