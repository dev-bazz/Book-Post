"use strict";
// Book Contructor
class e_book {
    // ------------------------------------------------------------------------------------------------
    constructor(title, author, ismb) {
        this.title = title;
        this.author = author;
        this.ismb = ismb;
    }
}
class getDOMelement {
    static singleDOMElement(elementSelector) {
        return document.querySelector(elementSelector);
    }
    static multipleDOMElements(elementSelector) {
        return document.querySelectorAll(elementSelector);
    }
}
class Store {
    static getLocalStorage() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            const x = localStorage.getItem('book');
            books = JSON.parse(localStorage.getItem('books') || '{}');
        }
        return books;
    }
    static addToLocalStorage(book) {
        const books = Store.getLocalStorage();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeFromLocalStorage(target) {
        const books = Store.getLocalStorage();
        books.forEach((book, index) => {
            if (book.ismb == target) {
                books.splice(index, 1);
                console.log(book);
            }
            console.log(book.ismb);
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayFromLocalStorage() {
        const books = Store.getLocalStorage();
        books.forEach((x) => {
            uiBuilder.addBookToUI(x);
        });
    }
}
class uiBuilder {
    static addBookToUI(book) {
        const copyTemplate = document.importNode($tempRow_content, true);
        // manipulate copyTemplate
        copyTemplate.querySelector('.temp-title').textContent = book.title;
        copyTemplate.querySelector('.temp-author').textContent = book.author;
        copyTemplate.querySelector('.temp-ismb').textContent = book.ismb;
        // Append to the DOM
        $book_tables === null || $book_tables === void 0 ? void 0 : $book_tables.appendChild(copyTemplate);
    }
    static clearField(...ui) {
        for (let x of ui) {
            x.value = '';
        }
    }
    static showAlert(message, eClass) {
        const copyTemplate = document.importNode($alertMe.content, true);
        //Template manipulation
        copyTemplate.querySelector('.message').textContent = message;
        copyTemplate.querySelector('.alert-body').classList.add(eClass);
        // Adding Template to DOM
        $container_element.insertBefore(copyTemplate, $book_form);
        //Remove from dom
        setTimeout(() => {
            var _a;
            (_a = document.querySelector('.alert-body')) === null || _a === void 0 ? void 0 : _a.remove();
        }, 2000);
    }
    static delete(target) {
        var _a, _b;
        if (target.classList.contains('delete')) {
            uiBuilder.showAlert('Deleted ', 'success');
            (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
        }
    }
}
const $book_form = getDOMelement.singleDOMElement('#book-form'), $tittleElement = getDOMelement.singleDOMElement('#title'), $authorElement = getDOMelement.singleDOMElement('#author'), $ismbElement = getDOMelement.singleDOMElement('#ismb'), 
// Template element
$temp_row = getDOMelement.singleDOMElement('#temp-row'), $tempRow_content = $temp_row.content, $book_tables = getDOMelement.singleDOMElement('.book-table'), $alertMe = getDOMelement.singleDOMElement('.alert'), $container_element = getDOMelement.singleDOMElement('.container'); //?
console.log($tittleElement);
// # Events
//# Dom Event
document.addEventListener('DOMContentLoaded', () => {
    Store.displayFromLocalStorage();
});
// ## Adding a Book
$book_form.addEventListener('submit', (e) => {
    // Get the value from the form
    const title = $tittleElement.value, author = $authorElement.value, ismb = parseInt($ismbElement.value);
    // intantiate
    const book = new e_book(title, author, ismb);
    //Form Validation
    if (title === '' || author === '' || ismb === undefined) {
        uiBuilder.showAlert('Please Fill all filleds', 'error');
    }
    else {
        console.log('book before adding', book);
        uiBuilder.addBookToUI(book);
        uiBuilder.showAlert('Book Added', 'success');
        Store.addToLocalStorage(book);
        uiBuilder.clearField($tittleElement, $authorElement, $ismbElement);
    }
    e.preventDefault();
});
// ## Delecting a Book
$book_tables === null || $book_tables === void 0 ? void 0 : $book_tables.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.previousElementSibling.textContent)
    Store.removeFromLocalStorage(parseInt(e.target.parentElement.previousElementSibling.textContent));
    uiBuilder.delete(e.target);
});
