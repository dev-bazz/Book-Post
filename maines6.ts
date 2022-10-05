// Book Contructor
class e_book {
        title: string;
        author:string;
        ismb:number;
// ------------------------------------------------------------------------------------------------
        constructor(title:string, author:string, ismb:number){
                this.title = title;
                this.author = author;
                this.ismb = ismb;
        }
//-----------------------------------------------------------------------------------
}

interface iBook{
        title:string;
        author:string;
        ismb:number;
}

class getDOMelement {
        static singleDOMElement(elementSelector:string):null | HTMLElement{
                return document.querySelector(elementSelector);
        }
        static multipleDOMElements(elementSelector:string):null | NodeList {
                return document.querySelectorAll(elementSelector);
        }

}

class Store{
        static getLocalStorage(){
                let books:any;
                
                if(localStorage.getItem('books') === null){
                        books = []
                        
                } else{
                        const x:any = localStorage.getItem('book');
                        
                        books = JSON.parse(localStorage.getItem('books') ||'{}')
                
                }
                
                return books
        }
        static addToLocalStorage(book:any){
                
                const books = Store.getLocalStorage()
                books.push(book)
                localStorage.setItem('books', JSON.stringify(books))


        }
        static removeFromLocalStorage(target: number) {

                const books = Store.getLocalStorage()
                books.forEach((book:any, index:any)=>{
                        if (book.ismb == target){
                                books.splice(index,1)
                                console.log(book)
                        }
                        console.log(book.ismb)
                })

                localStorage.setItem('books', JSON.stringify(books))


        }
        static displayFromLocalStorage(){
                const books = Store.getLocalStorage()
                books.forEach( (x:any) => {
                        uiBuilder.addBookToUI(x)
                });

        }
}


class uiBuilder{
        
        static addBookToUI(book:iBook){
                
                const copyTemplate:null| any = document.importNode($tempRow_content, true) ;

                // manipulate copyTemplate
                copyTemplate.querySelector('.temp-title').textContent = book.title;
                copyTemplate.querySelector('.temp-author').textContent = book.author;
                copyTemplate.querySelector('.temp-ismb').textContent = book.ismb;

                // Append to the DOM
                $book_tables?.appendChild(copyTemplate);
                
        }

        static clearField(...ui:HTMLInputElement[]){
                for (let x of ui){
                        x.value = ''
                        
                }

        }
        static showAlert(message:string, eClass:string){
                
                const copyTemplate:null | any = document.importNode($alertMe.content, true);

                //Template manipulation
                copyTemplate.querySelector('.message').textContent = message;
                copyTemplate.querySelector('.alert-body').classList.add(eClass);

                // Adding Template to DOM
                $container_element.insertBefore(copyTemplate, $book_form);

                //Remove from dom
                setTimeout(()=>{
                        document.querySelector('.alert-body')?.remove()
                }, 2000)


        }

        static delete(target:any){
                if (target.classList.contains('delete')){
                        
                        uiBuilder.showAlert('Deleted ','success')
                        target.parentElement?.parentElement?.remove();

                } 
                

        }
}


const $book_form = getDOMelement.singleDOMElement('#book-form') as HTMLFormElement,
$tittleElement = getDOMelement.singleDOMElement('#title') as HTMLInputElement,
$authorElement = getDOMelement.singleDOMElement('#author') as HTMLInputElement,
$ismbElement = getDOMelement.singleDOMElement('#ismb') as HTMLInputElement,

// Template element
$temp_row = getDOMelement.singleDOMElement('#temp-row') as HTMLTemplateElement,
$tempRow_content = $temp_row.content,
$book_tables = getDOMelement.singleDOMElement('.book-table'),
$alertMe = getDOMelement.singleDOMElement('.alert') as HTMLTemplateElement,
$container_element = getDOMelement.singleDOMElement('.container') as HTMLDivElement
;//?

console.log($tittleElement)

// # Events

//# Dom Event
document.addEventListener('DOMContentLoaded',()=>{
        Store.displayFromLocalStorage()
})

// ## Adding a Book
$book_form.addEventListener('submit',(e)=>{
// Get the value from the form
        const title:string = $tittleElement.value,
        author:string = $authorElement.value,
        ismb:number = parseInt($ismbElement.value);

        // intantiate
        const book = new e_book(title, author,ismb);
        

        //Form Validation
        if(title === '' || author === '' || ismb === undefined){
                uiBuilder.showAlert('Please Fill all filleds', 'error')
        }
        else{
                console.log('book before adding', book);
                uiBuilder.addBookToUI(book);
                uiBuilder.showAlert('Book Added', 'success')
                Store.addToLocalStorage(book);
                uiBuilder.clearField($tittleElement, $authorElement, $ismbElement)
        }
        
        
        e.preventDefault()
});

// ## Delecting a Book

$book_tables?.addEventListener("click", (e:any | HTMLElement | EventListenerObject)=>{
        // console.log(e.target.parentElement.previousElementSibling.textContent)
        Store.removeFromLocalStorage(parseInt(e.target.parentElement.previousElementSibling.textContent))
        uiBuilder.delete(e.target)

})
