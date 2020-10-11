'use strict'
console.log('Hi');

function onInit() {
    generateUsers();
    var loggedUser = loadFromStorage(STORAGE_KEY_LGOIN);
    if (!loggedUser) return;
    doLogin(loggedUser);
}

function onDoLogin() {
    var userName = document.querySelector('.user-name').value; // Catch the value from input 1 (txt)
    if (userName === '') return; // Add validation that user name is not empty
    document.querySelector('.user-name').value = ''; // Empty User name input after login

    var password = document.querySelector('.password').value; // Catch the value from input 2 (num)
    if (password === '') return; // Add validation that password is not empty
    document.querySelector('.password').value = ''; // Empty Password input after login

    console.log('This is the user name:', userName, 'and this is the user password:', password);
    doLogin(userName, password);
}

function onDoLogout() {
    doLogout();
    renderLogInPage();
}

function onRenderAdminPage() {
    renderAdminPage();
}