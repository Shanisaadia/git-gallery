'use strict'
console.log('Hi');

const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 3;
var gBooks;
var gPageIdx = 0;
var gSortBy = 'price';
var gSortBooks;

_createBooks();

function sortBooks(){
    var res = gBooks;

    if (gSortBy === 'price') {
        res.sort(function (a, b) {
            return a.price - b.price;
        })
        return res;
    }

    if (gSortBy === 'title') {
        res.sort(function (a, b) {
            var name1 = a.name.toUpperCase();
            var name2 = b.name.toUpperCase();
            if (name1 > name2) return 1;
            if (name2 > name1) return -1;
            return 0;
        })
        return res;
    }
}

function getBooks() {
    var sortedBooks = sortBooks();
    var fromIdx = gPageIdx * PAGE_SIZE;
    return sortedBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
}

function _createBook(name, price, imgUrl) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: imgUrl,
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Book1', 20, 'img/1.jpeg'))
        books.push(_createBook('Book2', 10, 'img/2.jpeg'))
        books.push(_createBook('Book3', 30, 'img/3.jpeg'))
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
    var bookId = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks.splice(bookId, 1);
    _saveBooksToStorage();

}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function updateBookPrice(bookId, newPrice) {
    var bookIdx = getBookIdxById(bookId);
    gBooks[bookIdx].price = newPrice;
    _saveBooksToStorage();
}

function updateBookRate() {
    var bookId = document.querySelector('.book-rate').name;
    var bookValue = document.querySelector('.book-rate').value;
    var bookIdx = getBookIdxById(bookId);
    gBooks[bookIdx].rate = bookValue;
    _saveBooksToStorage();
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return bookIdx;
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}