// There will be a global array that contains the three possible choices
// The computerSelection is decided as such:
// It will generate a number 0 - 2, then correspond those values
// to an array that contains the three possible choices

choices = ['rock', 'paper', 'scissors']

function randChoiceInt() {
    return Math.floor(Math.random() * 3);
}

function computerChoice() {
    return choices[randChoiceInt()];
}

function gameLogic(choice1, choice2) {
    // the choices must be passed in all lowercases!
    // returns the following values:
    // 0 -> tie
    // -1 -> 1st choice loses
    // 1 -> 1st choice wins
    // nested switch case
    switch (choice1) {
        case 'rock': // if first choice rock
            switch (choice2) {
                case 'rock': return 0; // rock v rock -> tie
                case 'paper': return -1; // rock v paper -> loss
                case 'scissors': return 1; // rock v scissors -> wins
            }
        case 'paper': // if first choice paper
            switch (choice2) {
                case 'rock': return 1; // paper v rock -> win
                case 'paper': return 0; // paper v paper -> tie
                case 'scissors': return -1; // paper v scissors -> loss
            }
        case 'scissors': // if first choice scissors
            switch (choice2) {
                case 'rock': return -1; // scissors v rock -> loss
                case 'paper': return 1; // scissors v paper -> win
                case 'scissors': return 0; // scissors v scissors -> tie
            }
    }
}

function playRound(playerSelection, computerSelection) {
    let playerChoice = prompt('Enter your choice!');
}