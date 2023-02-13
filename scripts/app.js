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
        let splitCommand = newCommand.split(' ');
        let mainCommand = splitCommand[0];
        let commandArgument = splitCommand.slice(1).join(' ');
        console.log(splitCommand)
        console.log(mainCommand)
        console.log(commandArgument)
        

        if (commands.includes(mainCommand.toLowerCase())) {
            console.log('command found: ' + mainCommand.toLowerCase())
            consoleHistory.push('>' + newCommand);

            switch (mainCommand.toLowerCase()) {
                case 'help' : help(commandArgument);
                break;
                case 'echo' : echo(commandArgument);
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

function help(inputString = '') {
    let response = '';
    
        switch (inputString.toLowerCase()) {
            case '' : response = 'Commands avilable: ' + commands.join(' ') + '<br> Enter help [command name] for detailed help'
            break;
            case 'help' : response = 'Displays help information<br>Usage: help [command name](optional)';
            break;
            case 'echo' : response = 'Returns an input string to the console<br>Usage: echo [string]';
            break;
            case 'whoami' : response = 'Returns the current logged in user name<br>Usage: whoami';
            break;
            default : response = 'No help information for this command';
            break;
        }
        consoleHistory.push(response);
    
        updateConsole();
}

function echo(inputString = 'ohce') {
    consoleHistory.push(inputString);
    updateConsole();
}

function whoami() {
    consoleHistory.push(username);
}






