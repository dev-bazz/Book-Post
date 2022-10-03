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
        $bookTables?.appendChild(templateCopy);



}
UI.prototype.clearField = function(...ui:HTMLElement[]){
        for (let xi of ui) {
                xi.value = ''
        }
}
UI.prototype.showAlert = function(message:string, eClass:string){
        const alertContent = alertMe.content

        //coping html template
        const copyAlertCOntent:DocumentFragment = document.importNode(alertContent, true)
        copyAlertCOntent.querySelector('.message')?.textContent = message;
        copyAlertCOntent.querySelector('.alert-body')?.classList.add(eClass)


        //Adding Template to the DOM
        $container.insertBefore(copyAlertCOntent, $bookform);


        //Remove From the DOM
        setTimeout(()=>{
        document.querySelector('.alert-body')?.remove()
        }, 3000)

}

UI.prototype.delete = function(target:any){
        if(target.classList.contains('delete')){
                console.log('deleted')
                target.parentElement.parentElement.remove()
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
        $bookTables = getDOM_element('.book-table'),
        alertMe = getDOM_element('.alert') as HTMLTemplateElement,
        $container = getDOM_element('.container') as HTMLDivElement;
        

//Events
$bookform.addEventListener('submit', (e)=>{
        //Get Form  Value
        const titleValue:string = $title.value,
        authorValue:string = $author.value,
        ismbValue:number = parseInt($ismb.value)  ;

        //intantiate
        const book = new Book(titleValue, authorValue, ismbValue);
        const ui = new UI()

        // Validate Form
        if(titleValue === '' || authorValue === '' || ismbValue === undefined){
                ui?.showAlert(`You did not fill everything`, 'error')
                e.preventDefault()


        }else{
        ui.addBookToList(book)
        ui.clearField($title,$author,$ismb)
        ui.showAlert(`Nice, Book Added`,'success')
        e.preventDefault()
        }
        
        

        //intantiate 

        
});
// Delecting a Book
$bookTables?.addEventListener('click', (e:{})=>{
        const ui = new UI();
        ui.delete(e.target);
        e.target.classList.contains('delete') && ui.showAlert(`Deleted Successfully`, `success`)
        e.preventDefault();
})