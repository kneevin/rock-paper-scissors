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

// announces to the player whether they lost, tied, or won
// this now edits the text of the announcer
// additionally, it sets the color of the outcome to the player's choice
// #00ff00 = win, #de0d0d = lose, #6782c7 = tie
function announce(playerSelection, computerSelection, outcome, playerButton) {
    let announceElement = document.querySelector('.announcer');
    switch (outcome) {
        case -1:
            result = 'lose'
            announceElement.textContent = `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`;
            break;
        case 0:
            result = 'tie'
            announceElement.textContent = `It's a Tie! You both chose ${playerSelection}...`;
            break;
        case 1:
            result = 'win'
            announceElement.textContent = `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
            break;
    }
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

// this is the game that is played when a button is pressed
// in other words, when a choice is selected, the computer generates
// a random choice, these are then compared and announces a winner
function playGame() {
    let playerChoose = this.id;
    let computerChoose = computerChoice();
    let outcome = playRound(playerChoose, computerChoose)
    announce(playerChoose, computerChoose, outcome, this);
}

// plays a game of 5 rounds, returns the scores of the player, the computer, and how many ties there were
function game() {
    // creating button functionalities
    let choices = document.querySelectorAll('.btn');
    choices.forEach(choice => choice.addEventListener('click', playGame));
}

game()