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


class uiBuilder{
        static con (...values:any){
                return console.log(values)
        }
        static addBookToUI(book:iBook){
                console.group('Add Book to UI')
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
                        console.log(x, 'clear')
                }

        }
        static showAlert(message:string, eClass:string){
                console.log('Show Alert')
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

// Events
$book_form.addEventListener('submit',(e)=>{
// Get the value from the form
        const title:string = $tittleElement.value,
        author:string = $authorElement.value,
        ismb:number = parseInt($ismbElement.value);

        // intantiate
        const book = new e_book(title, author,ismb);

        //Form Validation
        if(title === '' || author === '' || ismb === NaN){
                uiBuilder.showAlert('Please Fill all filleds', 'error')
        }
        else{
                uiBuilder.addBookToUI(book);
                uiBuilder.clearField($tittleElement, $authorElement, $ismbElement)
        }
        
        
        e.preventDefault()
})
