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

function capitalize(str) {
    // capitalizes the first letter
    return str[0].toUpperCase() + str.slice(1);
}

function playRound(playerSelection, computerSelection) {
    // the choices must be passed in all lowercases!
    // returns the following values:
    // 0 -> tie
    // -1 -> 1st choice loses
    // 1 -> 1st choice wins
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

function announce(playerSelection, computerSelection, outcome) {
    switch (outcome) {
        case -1:
            return `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`;
        case 0:
            return `It's a Tie! You both chose ${playerSelection}...`;
        case 1:
            return `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelect = prompt('Enter you choice').toLowerCase();
        let computerSelect = computerChoice();
        let result = playRound(playerSelect, computerSelect);
        console.log(announce(playerSelect, computerSelect, result));

        if (result > 0) { playerScore++; }
        else if (result < 0) { computerScore++; }
        else { tieScore++; }
    }
    console.log(`Player: ${playerScore} | Computer: ${computerScore} | Ties: ${tieScore}`);
}