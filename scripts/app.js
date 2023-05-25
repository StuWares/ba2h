let username = "guest";
let currentDate = new Date();
const cmdSubmit = document.getElementById('cmd-input');
const consoleDisplay = document.getElementById('console-history');
const commands = ['help','echo','whoami'];
let consoleHistory = [];
let inputHistory = [];
let histPosition;

document.getElementById('welcome').textContent = currentDate + ' ba2h console';
document.getElementById('user-intro').textContent = 'You are currently logged in as: ' + username;

cmdSubmit.value = '';
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
        let newCommand = cmdSubmit.value;
        let splitCommand = newCommand.split(' ');
        let mainCommand = splitCommand[0];
        console.log('maincommand: ' + mainCommand)
        let commandArgument = splitCommand.slice(1).join(' ');
        console.log(splitCommand)
        console.log(mainCommand)
        console.log(commandArgument)

        

        if (commands.includes(mainCommand.toLowerCase())) {
            console.log('command found: ' + mainCommand.toLowerCase())
            consoleHistory.push('>' + newCommand);

            if (cmdSubmit.value !== inputHistory[inputHistory.length - 1]) {
                inputHistory.push(cmdSubmit.value);
                if (inputHistory.length > 50) {
                    inputHistory.shift();
                }
                histPosition = inputHistory.length - 1;
            }
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
    if (event.key === 'ArrowUp' ) {

        console.log(histPosition);
        if (histPosition >= 0) {
            cmdSubmit.value = inputHistory[histPosition];
            if (histPosition > 0) {
                histPosition--;
            }

        }

    }
    if (event.key === 'ArrowDown') {
        if (histPosition <= inputHistory.length - 1) {
            cmdSubmit.value = inputHistory[histPosition];
            if (histPosition < inputHistory.length - 1) {
                histPosition++;
            }
        }
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






