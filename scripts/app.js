let username = "guest";
let currentDate = new Date();
const cmdSubmit = document.getElementById('cmd-input');
const consoleDisplay = document.getElementById('console-history');
const mainContainer = document.getElementById('main-box');
const commands = ['help','contact','rm', 'echo','whoami','files','cls', 'su', 'sudo'];
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
    consoleDisplay.innerHTML = consoleHistory.join(separator);

    window.scrollTo(0, document.body.offsetHeight); // Tested changing from scrollHeight to offsetHeight to fix iPhone virtual keyboard issue

};


cmdSubmit.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        let newCommand = cmdSubmit.value;
        let splitCommand = newCommand.split(' ');
        let mainCommand = splitCommand[0];
        let commandArgument = splitCommand.slice(1).join(' ');
        let commandArg2 = splitCommand.slice(2).join(' ');
        

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
                case 'contact' : contact();
                break;
                case 'files' : fileDownload();
                break;
                case 'cls' : clearScreen();
                break;
                case 'rm' : remove(commandArgument, commandArg2);
                break;
                case 'su' : su(commandArgument);
                break;
                case 'sudo' : sudo();
                break;
            }


        } else {
            console.log('command not found')
        }
        updateConsole();
    }
    if (event.key === 'ArrowUp' ) {

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
    let response;
    
        switch (inputString.toLowerCase()) {
            case '' : response = 'Commands avilable: ' + commands.join(' | ') + '<br> Enter help [command name] for detailed help'
            break;
            case 'help' : response = 'Displays help information<br>Usage: help [command name](optional)';
            break;
            case 'echo' : response = 'Returns an input string to the console<br>Usage: echo [string]';
            break;
            case 'whoami' : response = 'Returns the current logged-in user name<br>Usage: whoami';
            break;
            case 'contact' : response = 'It me!';
            break;
            case 'files' : response = 'View and download available files';
            break;
            case 'cls' : response = 'Clears the current terminal';
            break;
            case 'rm' : response = 'Removes files or folders<br>-f force, ignore nonexistent files and arguments, never prompt<br>-r recursive, remove directories and their contents recursively<br>--no-preserve-root do not treat "/" specially ';
            break;
            case 'su' : response = "Switch to a different user account for the current terminal session<br>Usage: su [username]";
            break;
            case 'sudo' : response = "Make me a sandwich";
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

function contact() {
    consoleHistory.push(
        'Created by Stu Wares <br> <a href="https://github.com/StuWares" target="_blank">GitHub</a><br> <a href="https://twitter.com/tamerocket" target=”_blank”>Twitter</a><br><a href="https://infosec.exchange/@stuwares" target=”_blank”>Mastodon</a><br><a href="https://www.linkedin.com/in/stuart-wares" target=”_blank”>Linkedin</a>');
}

function fileDownload() {
    consoleHistory.push('Some totally safe files, click to download <br> ... <br>-rw-rw-r--  <a class="file-downloader" href="https://sql-logs.zip" target="_blank">sql-logs.zip</a>   120kb <br> ...')
}

function clearScreen() {
    consoleHistory = [];
}


function remove(arg1 = ' ', arg2 = ' ') {
    console.log(arg1)
    console.log(arg2)
    if (username == 'root') {
        if ((arg1.toLowerCase() == '-rf / --no-preserve-root' || arg1.toLowerCase() == '-fr / --no-preserve-root') ) {
            consoleHistory.push('yeet!')
            consoleHistory = []
            mainContainer.remove();
            document.body.style.backgroundColor = "white";
        }
    } else {
        consoleHistory.push("Permission denied")
    }
}

function su(name) {
    if (name == "guest" || name == "root"){
        username = name
        console.log(username)
        document.getElementById('user-intro').textContent = 'You are currently logged in as: ' + username;
    }
    else if (name == "- root") {
        username = 'root'
        console.log(username)
        document.getElementById('user-intro').textContent = 'You are currently logged in as: ' + username;
    } else {
        consoleHistory.push("su: user " + name + " does not exist");
    }
}

function sudo() {
    if (username != 'root'){
        consoleHistory.push(username + " is not in the sudoers file. This incident will be reported. Also your parents have been called")
    }
}