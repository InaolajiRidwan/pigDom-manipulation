'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;


 
  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;

   diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //this select player1(1)
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //this is the logic operatio(ternary operator)

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;

      //this select player zero(0)

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //this hold,assign and add to player scores
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
