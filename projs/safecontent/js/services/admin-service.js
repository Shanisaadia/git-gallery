'use strict'

const STORAGE_KEY_USERS = 'usersDB';
const STORAGE_KEY_LGOIN = 'LoggedDB';
var gSortBy = 'NAME';

function checkIfAdmin() {
    var user = loadFromStorage(STORAGE_KEY_LGOIN);
    if (!user.isAdmin) window.location.assign('index.html');
}

function getUsersForDisplay() {
    var users = loadFromStorage(STORAGE_KEY_USERS);
    
    sortUsers(users);
    return users;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function sortUsers(users) {

    var sortBy = (gSortBy === 'NAME') ? 'userName' : 'lastLoginTime';
    users.sort(function (user1, user2) {
        var a = (typeof user1[sortBy] === 'string') ? user1[sortBy].toLowerCase() : user1[sortBy];
        var b = (typeof user2[sortBy] === 'string') ? user2[sortBy].toLowerCase() : user2[sortBy];

        if (a > b) return 1;
        else if (a < b) return -1;
        else return 0;
    })

}

