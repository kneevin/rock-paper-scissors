// There will be a global array that contains the three possible choices
// The computerSelection is decided as such:
// It will generate a number 0 - 2, then correspond those values
// to an array that contains the three possible choices

choices = ['rock', 'paper', 'scissors']

// Generates a random number in range [0, 2]
function randChoiceInt() {
    return Math.floor(Math.random() * 3);
}

// Generates a random computer choice
function computerChoice() {
    return choices[randChoiceInt()];
}

// Capitalizes the first letter
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

// sets the color of the player's choice to the color of their outcome
// then removes that color
function setOutcomeColor(playerButton, result) {
    let userChoice = document.querySelector(`#${playerButton.id}`, 'btn')
    // the choice 'blinks'
    userChoice.classList.add(result);
    setTimeout(() => { userChoice.classList.remove(result) }, 300);

}

// updates the score of the winner, increments by one
function updateScore(winner) {
    value = document.querySelector(`.${winner}`);
    value.textContent = `${parseInt(value.textContent) + 1}`
}

// changes announcement text to the passed parameter
function setAnnouncement(str) {
    let announceElement = document.querySelector('.announcer')
    announceElement.textContent = str;
}

// announces to the player whether they lost, tied, or won
// this now edits the text of the announcer
function announce(playerSelection, computerSelection, outcome, playerButton) {
    switch (outcome) {
        case -1: // computer won, need to update computer score
            result = 'lose'
            announcement = `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`;
            updateScore('computer-score');
            break;
        case 0:
            result = 'tie'
            announcement = `It's a Tie! You both chose ${capitalize(playerSelection)}...`;
            updateScore('tie-score');
            break;
        case 1:
            result = 'win'
            announcement = `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}.`;
            updateScore('player-score');
            break;
    }
    setAnnouncement(announcement);
    setOutcomeColor(playerButton, result);
}

function playRound(playerSelection, computerSelection) {
    // the choices must be passed in all lowercases!
    // returns the following values:
    //  0 -> tie
    //  -1 -> 1st choice loses
    //  1 -> 1st choice wins
    // nested switch case
    switch (playerSelection) {
        case 'rock': // if first choice rock
            switch (computerSelection) {
                case 'rock': return 0; // rock v rock -> tie
                case 'paper': return -1; // rock v paper -> loss
                case 'scissors': return 1; // rock v scissors -> wins
            }
        case 'paper': // if first choice paper
            switch (computerSelection) {
                case 'rock': return 1; // paper v rock -> win
                case 'paper': return 0; // paper v paper -> tie
                case 'scissors': return -1; // paper v scissors -> loss
            }
        case 'scissors': // if first choice scissors
            switch (computerSelection) {
                case 'rock': return -1; // scissors v rock -> loss
                case 'paper': return 1; // scissors v paper -> win
                case 'scissors': return 0; // scissors v scissors -> tie
            }
    }
}

// if a competitor reaches a score of 5, announces a winner
function announceWinner() {
    playerScore = document.querySelector('.player-score');
    if (parseInt(playerScore.textContent) == 5) {
        setAnnouncement('You won the match! Click any choice to begin a new match.')
    } else {
        setAnnouncement('You lost the match. Click any choice to begin a new match.')
    }
}

// helper function that resets score the match once clicked
function resetScore() {
    let scores = document.querySelectorAll('.score');
    scores.forEach((score) => { score.textContent = '0' });
    game();
}

// this function will remove the eventlistener for the current match,
// then add an eventlistener that will reset the scores of the match once clicked
// after it is clicked, it will add the playgame eventlisteners again
function resetGame() {
    let choices = document.querySelectorAll('.btn');
    choices.forEach(choice => choice.removeEventListener('click', playGame));
    choices.forEach(choice => choice.addEventListener('click', resetScore))
}


// this function checks whether the game is over
// if it is, it will call another function that will announce the winner
function checkWinner() {
    scores = document.querySelectorAll('.competitor');
    scores.forEach(score => {
        if (parseInt(score.textContent) == 5) { // if a score is above 5, announce the winner and reset the game
            announceWinner();
            resetGame();
        }
    })
}

// this is the game that is played when a button is pressed
// in other words, when a choice is selected, the computer generates
// a random choice, these are then compared and announces a winner
function playGame() {
    let playerChoose = this.id;
    let computerChoose = computerChoice();
    let outcome = playRound(playerChoose, computerChoose)
    announce(playerChoose, computerChoose, outcome, this);
    checkWinner();
}

// plays a game of 5 rounds, returns the scores of the player, the computer, and how many ties there were
function game() {
    // creating button functionalities
    let choices = document.querySelectorAll('.btn');
    choices.forEach(choice => choice.removeEventListener('click', resetScore));
    choices.forEach(choice => choice.addEventListener('click', playGame));
}

// turns everything to 'night-mode'
function setNightMode() {
    // setting screen to black
    body = document.querySelector('body');
    body.classList.toggle('body-night');

    // changing border color and card colors
    buttons = document.querySelectorAll('.bordered');
    buttons.forEach((button) => {
        button.classList.toggle('border-night');
        button.classList.toggle('btn-night');
    });

    // changing hover properties
    hoverButtons = document.querySelectorAll('button');
    console.log(hoverButtons)
    hoverButtons.forEach((button) => {
        button.classList.toggle('night');
    });
}
// night-mode functionality
function addNightMode() {
    let nightButton = document.querySelector('.night-btn');
    nightButton.addEventListener('click', setNightMode)
}

addNightMode();
game();