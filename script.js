let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
*/

updateScoreElement();

document.querySelector('.js-rock-button')
    .addEventListener('click', () => { playGame('rock'); });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => { playGame('paper'); });
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => { playGame('scissors'); });
document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => { autoPlay(); });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'a') {
        autoPlay();
    }
});

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        if (confirm('Are you sure?')) {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
        }
    });

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose!'
        }
        else if (computerMove === 'paper') {
            result = 'You Win!'
        }
        else {
            result = 'Tie!'
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win!'
        }
        else if (computerMove === 'paper') {
            result = 'Tie!'
        }
        else {
            result = 'You Lose!'
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie!'
        }
        else if (computerMove === 'paper') {
            result = 'You Lose!'
        }
        else {
            result = 'You Win!'
        }
    }

    const resultElement = document.querySelector('.js-result');
    resultElement.classList.remove('win', 'lose', 'tie');

    if (result === 'You Win!') {
        score.wins += 1;
        resultElement.classList.add('win');

        confetti({
            particleCount: 120,
            spread: 70,
            origin: { x: 0.15, y: 0.4 }
        });
    }
    else if (result === 'You Lose!') {
        score.losses += 1;
        resultElement.classList.add('lose');
    }
    else if (result === 'Tie!') {
        score.ties += 1;
        resultElement.classList.add('tie');
    }

    resultElement.textContent = result;
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-moves').innerHTML = `
        <div class="moves-container">
            You <img src="./img/${playerMove}-emoji.png" class="log-icon"> VS <img src="./img/${computerMove}-emoji.png" class="log-icon">Computer
        </div>
    `;
    document.querySelector('.js-result').innerHTML = result;
}

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//}
function autoPlay() {
    const buttonElement = document.querySelector('.auto-play-button');

    //if (isAutoPlaying === false)
    if (!isAutoPlaying) {
        const playerMove = pickComputerMove();
        playGame(playerMove);

        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        buttonElement.innerHTML = 'Stop';
        buttonElement.classList.add ('is-AutoPlaying');
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;

        buttonElement.innerHTML = 'Auto Play';
        buttonElement.classList.remove ('is-AutoPlaying');
    }
}

function pickComputerMove() {
    let computerMove = '';

    const randomNumder = Math.random();
    if (randomNumder >=0 && randomNumder < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumder >= 1 / 3 && randomNumder < 2 / 3) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors';
    }
    return computerMove;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}
