// Book Contructor
function Book(title:string,author:string, ismb:number):null | object | void {
        this.title = title;
        this.author = author;
        this.ismb = ismb;
}

interface iBook{
        title:string;
        author:string;
        ismb:number;
}


// UI Contsructor
function UI(){

}
UI.prototype.addBookToList = function(book:iBook){
        console.log(book, `this is from the book`);
        // Copy Template from html
        const templateCopy = document.importNode(tempRow_content,true);
        templateCopy.querySelector('.temp-title')?.textContent = book.title;
        templateCopy.querySelector('.temp-author')?.textContent = book.author;
        templateCopy.querySelector('.temp-ismb')?.textContent = book.ismb;
        $bookTables?.appendChild(templateCopy)


}
UI.prototype.clearField = function(...ui:HTMLElement[]){
        for (let xi of ui) {
                xi.value = ''
        }
}


// DOM Elements

function getDOM_element(element:string): null | HTMLElement{
        return document.querySelector(element);
}
const $bookform = getDOM_element('#book-form') as HTMLFormElement,
        $title = getDOM_element('#title') as HTMLInputElement,
        $author = getDOM_element('#author') as HTMLInputElement,
        $ismb = getDOM_element('#ismb') as HTMLInputElement,
        // Template VariableSet
        temp_row = getDOM_element('#temp-row') as HTMLTemplateElement,
        tempRow_content = temp_row.content,
        $bookTables = getDOM_element('.book-table');

//Events
$bookform.addEventListener('submit', (e)=>{
        //Get Form  Value
        const titleValue:string = $title.value,
        authorValue:string = $author.value,
        ismbValue:number = parseInt($ismb.value)  ;
        
        
        

        //intantiate 
        const book = new Book(titleValue, authorValue, ismbValue);
        const ui = new UI()

        
        ui.addBookToList(book)
        ui.clearField($title,$author,$ismb)
        
        e.preventDefault()
})