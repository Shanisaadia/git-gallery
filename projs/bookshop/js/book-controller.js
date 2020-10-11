'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function (book) {
        return `
            <table><tbody>
            <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td><table class="sub-table">
            <td class="read" onclick="onReadBook('${book.id}')">Read</td>
            <td class="update" onclick="onUpdateBookPrice('${book.id}')">Update</td>
            <td class="delete" onclick="onRemoveBook('${book.id}')">Delete</td>
            </table></td></tr>
            </tbody></table>`
    })
    document.querySelector('.books-container').innerHTML = strHTML.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    //FIX - Can remove some of the vars
    var elName = document.querySelector('.add-book input[name=book-name]');
    var elPrice = document.querySelector('.add-book input[name=book-price]');
    var name = elName.value;
    var price = elPrice.value;
    if (!name || !price) return;
    addBook(name, price);
    elName.value = '';
    elPrice.value = '';
    renderBooks();
}

function onUpdateBookPrice(bookId) {
    var newPrice = +prompt('Please enter the new price');
    if (!newPrice) return;
    if (isNaN(newPrice)) return; // Need to show an alert
    updateBookPrice(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('h6').innerText = book.price;
    elModal.querySelector('.img').innerHTML = `<img src="${book.imgUrl}"></img>`;
    elModal.querySelector('.book-rate').value = book.rate;
    elModal.querySelector('.book-rate').name = book.id;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
    updateBookRate();
}

function onIncreaseValue() {
    increaseValue();
}

function onDecreaseValue() {
    decreaseValue();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onSort(sortBy) {
    console.log('start sorting..')
    setSort(sortBy)
    renderBooks();
}