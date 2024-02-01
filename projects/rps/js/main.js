let terminal = document.querySelector('#output');
let options = ['rock', 'paper', 'scissors']

function lineBreak() {
    let output = document.createElement('br');
    terminal.appendChild(output);
}

function consoleLog(text) {
    let output = document.createElement('p');

    output.textContent = text;
    terminal.appendChild(output);
}

function input(displayText) {
    let output = document.createElement('div');
    let textfield = document.createElement('input');
    let submit = document.createElement('button');

    textfield.placeholder = displayText;
    submit.textContent = 'Submit'
    output.appendChild(textfield);
    output.appendChild(submit)
    terminal.appendChild(output);

    submit.addEventListener('click', () => {
        let robot = randomChoice(),
            player = textfield.value;

        output.innerHTML = `<p>Your choice: ${player}</p>`;
        consoleLog('Robots choice: ' + robot);

        validateResults(robot, player)
        lineBreak();
        input('rock, paper or scissors?')
    });
}

function validateResults(robot, player) {
    if( 
        (robot === options[0] && player.toLowerCase() === options[1]) ||
        (robot === options[1] && player.toLowerCase() === options[2]) ||
        (robot === options[2] && player.toLowerCase() === options[0])
    ) {
        changeBorder('green');
        consoleLog('>>> You win this round :) !!!');
    } else if ( robot === player.toLowerCase() ) {
        changeBorder('yellow');
        consoleLog(">>> It's a draw :|");
    } else if ( !options.includes(player.toLowerCase()) ) {
        changeBorder('red');
        consoleLog(`>>> '${player}' is not a valid input`);
    } else {
        changeBorder('purple');
        consoleLog('>>> You lost to a robot :(')
    }
}

let randomChoice = () => options[Math.floor(Math.random()*3)];

function changeBorder(color) {
    let style = 'border-color: ' + color+ '; box-shadow: 5px 10px 8px ' + color + ';';
    terminal.setAttribute('style', style);
}

input('rock, paper or scissors?');



