"use strict";
// Book Contructor
function Book(title, author, ismb) {
    this.title = title;
    this.author = author;
    this.ismb = ismb;
}
// UI Contsructor
function UI() {
}
UI.prototype.addBookToList = function (book) {
    var _a, _b, _c;
    console.log(book, `this is from the book`);
    // Copy Template from html
    const templateCopy = document.importNode(tempRow_content, true);
    (_a = templateCopy.querySelector('.temp-title')) === null || _a === void 0 ? void 0 : _a.textContent = book.title;
    (_b = templateCopy.querySelector('.temp-author')) === null || _b === void 0 ? void 0 : _b.textContent = book.author;
    (_c = templateCopy.querySelector('.temp-ismb')) === null || _c === void 0 ? void 0 : _c.textContent = book.ismb;
    $bookTables === null || $bookTables === void 0 ? void 0 : $bookTables.appendChild(templateCopy);
};
UI.prototype.clearField = function (...ui) {
    for (let xi of ui) {
        xi.value = '';
    }
};
// DOM Elements
function getDOM_element(element) {
    return document.querySelector(element);
}
const $bookform = getDOM_element('#book-form'), $title = getDOM_element('#title'), $author = getDOM_element('#author'), $ismb = getDOM_element('#ismb'), 
// Template VariableSet
temp_row = getDOM_element('#temp-row'), tempRow_content = temp_row.content, $bookTables = getDOM_element('.book-table');
//Events
$bookform.addEventListener('submit', (e) => {
    //Get Form  Value
    const titleValue = $title.value, authorValue = $author.value, ismbValue = parseInt($ismb.value);
    //intantiate 
    const book = new Book(titleValue, authorValue, ismbValue);
    const ui = new UI();
    ui.addBookToList(book);
    ui.clearField($title, $author, $ismb);
    e.preventDefault();
});
