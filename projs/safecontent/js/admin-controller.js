'use strict'
console.log('Hi');

function onInitAdmin() {
    checkIfAdmin();
    renderTable()
}

function renderTable() {
    var strHTML = `<table><thead><tr><th>Userame</td><th>Password</td><th>Last Login</td><th>Admin</td></tr></thead><tbody>`;
    var users = getUsersForDisplay();
    console.log(users);
    users.forEach(function (user) {
        var time = new Date(user.lastLoginTime).toLocaleDateString()
        strHTML += `<tr>
        <td>${user.userName}</td>
        <td>${user.password}</td>
        <td>${time}</td>
        <td>${user.isAdmin}</td> </tr>`
    })
    strHTML += `</tbody></table>`;
    document.querySelector('.users-container').innerHTML = strHTML;
}

function onSetSort(sortBy) {
    console.log(sortBy)
    setSort(sortBy);
    renderTable();
}