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
UI.prototype.showAlert = function (message, eClass) {
    var _a, _b;
    const alertContent = alertMe.content;
    //coping html template
    const copyAlertCOntent = document.importNode(alertContent, true);
    (_a = copyAlertCOntent.querySelector('.message')) === null || _a === void 0 ? void 0 : _a.textContent = message;
    (_b = copyAlertCOntent.querySelector('.alert-body')) === null || _b === void 0 ? void 0 : _b.classList.add(eClass);
    //Adding Template to the DOM
    $container.insertBefore(copyAlertCOntent, $bookform);
    //Remove From the DOM
    setTimeout(() => {
        var _a;
        (_a = document.querySelector('.alert-body')) === null || _a === void 0 ? void 0 : _a.remove();
    }, 3000);
};
UI.prototype.delete = function (target) {
    if (target.classList.contains('delete')) {
        console.log('deleted');
        target.parentElement.parentElement.remove();
    }
};
// DOM Elements
function getDOM_element(element) {
    return document.querySelector(element);
}
const $bookform = getDOM_element('#book-form'), $title = getDOM_element('#title'), $author = getDOM_element('#author'), $ismb = getDOM_element('#ismb'), 
// Template VariableSet
temp_row = getDOM_element('#temp-row'), tempRow_content = temp_row.content, $bookTables = getDOM_element('.book-table'), alertMe = getDOM_element('.alert'), $container = getDOM_element('.container');
//Events
$bookform.addEventListener('submit', (e) => {
    //Get Form  Value
    const titleValue = $title.value, authorValue = $author.value, ismbValue = parseInt($ismb.value);
    //intantiate
    const book = new Book(titleValue, authorValue, ismbValue);
    const ui = new UI();
    // Validate Form
    if (titleValue === '' || authorValue === '' || ismbValue === undefined) {
        ui === null || ui === void 0 ? void 0 : ui.showAlert(`You did not fill everything`, 'error');
        e.preventDefault();
    }
    else {
        ui.addBookToList(book);
        ui.clearField($title, $author, $ismb);
        ui.showAlert(`Nice, Book Added`, 'success');
        e.preventDefault();
    }
    //intantiate 
});
// Delecting a Book
$bookTables === null || $bookTables === void 0 ? void 0 : $bookTables.addEventListener('click', (e) => {
    const ui = new UI();
    ui.delete(e.target);
    e.target.classList.contains('delete') && ui.showAlert(`Deleted Successfully`, `success`);
    e.preventDefault();
});
