let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
*/

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
            origin: { x: 0.2, y: 0.3 }
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

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
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
