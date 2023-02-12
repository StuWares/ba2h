let username = "guest";
let currentDate = new Date();
const cmdSubmit = document.getElementById('cmd-input');
let commands = [];
let consoleHistory = [];
let inputHistory = [];

document.getElementById('welcome').textContent = currentDate + ' ba2h console';
document.getElementById('user-intro').textContent = 'You are currently logged in as: ' + username;

let updateConsole = () => {
    let separator = '<br>';
    cmdSubmit.value = '';
    document.getElementById('console-history').innerHTML = consoleHistory.join(separator);
};


cmdSubmit.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        console.log('enter key pressed')
        let newCommand = cmdSubmit.value;
        consoleHistory.push(newCommand);
        updateConsole();
    }
})






