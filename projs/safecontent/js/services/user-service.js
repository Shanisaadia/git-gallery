'use strict'

const STORAGE_KEY_USERS = 'usersDB';
const STORAGE_KEY_LGOIN = 'LoggedDB';
var gUsers;


function generateUsers() {
    gUsers = loadFromStorage(STORAGE_KEY_USERS);
    if (!gUsers || !gUsers.length) gUsers = _createUsers();
    saveToStorage(STORAGE_KEY_USERS, gUsers);
}

function _createUser(userName, passwordStr, isAdmin) {
    return {
        id: makeId(),
        userName: userName,
        password: passwordStr,
        lastLoginTime: Date.now(),
        isAdmin: isAdmin,
    };
}

function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY_USERS);
    if (!users || !gUsers.length) {
        var users = []
        users.push(_createUser('s', '1', true))
        users.push(_createUser('Ron', '456', false))
        users.push(_createUser('Tomer', '789', false))
        return users;

    }
    return users;
}

function saveUsers(users) {
    saveToStorage(STORAGE_KEY_USERS, users);
}

function saveLoggedInUsers(users) {
    saveToStorage(STORAGE_KEY_LGOIN, users);
}

function doLogin(userName, password) {
    var user = gUsers.find(function (user) {
        return userName === user.userName && password === user.password;
    });
    if (!user) return console.log('User was not found'); // If we didn't find a match alert the user or do nothing..

    updateLastLoginTime(user); // If we did find the user, update the login time
    saveToStorage(STORAGE_KEY_USERS, gUsers);
    saveToStorage(STORAGE_KEY_LGOIN, user);
    renderLoggoedInPage(user);
}

function updateLastLoginTime(user) {
    user.lastLoginTime = Date.now();
}

function renderLoggoedInPage(user) {
    var elLoginForm = document.querySelector('.main-container');  // Hide Login modal after successfully login
    elLoginForm.style.display = 'none';

    var elHeader = document.querySelector('h1');  // Display Welcome message
    elHeader.innerHTML = ('Hello ' + user.userName);

    var elLogout = document.querySelector('.logout');  // Display logout btn
    elLogout.style.display = 'block';

    if (user.isAdmin) {
        console.log(user.isAdmin);
        var elAdminPage = document.querySelector('.admin-login');  // Display Admin link 
        elAdminPage.style.display = 'block';
    }

}

function doLogout() {
    removeFromStorage(STORAGE_KEY_LGOIN);
}

function renderLogInPage() {
    var elLoginForm = document.querySelector('.main-container');  // show Login modal after logout
    elLoginForm.style.display = 'block';

    var elHeader = document.querySelector('h1');  // Hide Welcome message
    elHeader.style.display = 'none';

    var elLogout = document.querySelector('.logout');  // Hide logout btn
    elLogout.style.display = 'none';

    var elAminLink = document.querySelector('.admin-login');  // Hide Admin link
    elAminLink.style.display = 'none';
}
