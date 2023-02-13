let username = "guest";
let currentDate = new Date();
const cmdSubmit = document.getElementById('cmd-input');
const consoleDisplay = document.getElementById('console-history');
const commands = ['help','echo','whoami'];
let consoleHistory = [];
let inputHistory = [];

document.getElementById('welcome').textContent = currentDate + ' ba2h console';
document.getElementById('user-intro').textContent = 'You are currently logged in as: ' + username;

let updateConsole = () => {
    let separator = '<br>';
    cmdSubmit.value = '';
    if (consoleHistory.length > 50) {
        consoleHistory.shift();
    } 
    document.getElementById('console-history').innerHTML = consoleHistory.join(separator);
};


cmdSubmit.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        console.log('enter key pressed')
        let newCommand = cmdSubmit.value;        
        if (commands.includes(newCommand.toLowerCase())) {
            console.log('command found: ' + newCommand.toLowerCase())
            consoleHistory.push('>' + newCommand);

            switch (newCommand.toLowerCase()) {
                case 'help' : help();
                break;
                case 'echo' : echo();
                break;
                case 'whoami' : whoami();
                break;
            }


        } else {
            console.log('command not found')
        }
        updateConsole();
    }
})

function help() {
    consoleHistory.push('Commands avilable: ' + commands.join(' '));
    updateConsole();
}

function echo(inputString = 'ohce') {
    consoleHistory.push(inputString);
    updateConsole();
}

function whoami() {
    consoleHistory.push(username);
}






