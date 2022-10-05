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
class uiBuilder {
    static con(...values) {
        return console.log(values);
    }
    static addBookToUI(book) {
        console.group('Add Book to UI');
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
            console.log(x, 'clear');
        }
    }
    static showAlert(message, eClass) {
        console.log('Show Alert');
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
    }
}
const $book_form = getDOMelement.singleDOMElement('#book-form'), $tittleElement = getDOMelement.singleDOMElement('#title'), $authorElement = getDOMelement.singleDOMElement('#author'), $ismbElement = getDOMelement.singleDOMElement('#ismb'), 
// Template element
$temp_row = getDOMelement.singleDOMElement('#temp-row'), $tempRow_content = $temp_row.content, $book_tables = getDOMelement.singleDOMElement('.book-table'), $alertMe = getDOMelement.singleDOMElement('.alert'), $container_element = getDOMelement.singleDOMElement('.container'); //?
console.log($tittleElement);
// Events
$book_form.addEventListener('submit', (e) => {
    // Get the value from the form
    const title = $tittleElement.value, author = $authorElement.value, ismb = parseInt($ismbElement.value);
    // intantiate
    const book = new e_book(title, author, ismb);
    //Form Validation
    if (title === '' || author === '' || ismb === NaN) {
        uiBuilder.showAlert('Please Fill all filleds', 'error');
    }
    else {
        uiBuilder.addBookToUI(book);
        uiBuilder.clearField($tittleElement, $authorElement, $ismbElement);
    }
    e.preventDefault();
});
