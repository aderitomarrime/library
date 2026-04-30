let cards = document.querySelector(".cards")
let myDialog = document.querySelector("dialog");
let buttonOpenDialog = document.querySelector(".open-dialog");
let buttonAddBook = document.querySelector(".buttons button:last-child");
let myForm = document.querySelector("form");

buttonOpenDialog.addEventListener("click", ()=> {
    myDialog.showModal();
})

buttonAddBook.addEventListener("click", (event)=> {

    let author = document.querySelector("#author").value;
    let title = document.querySelector("#title").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("input[name='read']:checked").value;

    if (read === 'true') {
        read = true;
    }else {
        read = false;
    }

    addBookToLibrary(author, title, pages, read);
    ShowBooksOnScreen();
    
    event.preventDefault();
    myForm.reset();
    myDialog.close()
})

const myLibrary = [];

function Book(id, author, title, pages, read) {

    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {

    if(this.read == true) {
        this.read = false;
    } else {
        this.read = true;
    }
    
}

function addBookToLibrary(author, title, pages, read) {

    let uuid = crypto.randomUUID();
    let book = new Book(uuid, author, title, pages, read);

    myLibrary.push(book);
}

function wipeDisplay(element) {
    element.remove();
}

function ShowBooksOnScreen() {

    let allCards = document.querySelectorAll(".main .cads .card");
    allCards = Array.from(allCards);

    if(myLibrary.length > 2) {

        let card = document.createElement("div");
        card.classList.add("card")
        cards.appendChild(card);

        let arrayLastIndex = myLibrary.length-1;

        let cardHeader = document.createElement("div");
        let cardBody = document.createElement("div");
        let cardFooter = document.createElement("div");

        cardHeader.classList.add("card-header");
        cardBody.classList.add("card-body");
        cardFooter.classList.add("card-footer");

        let title = document.createElement("h1");
        let author = document.createElement("h2");

        let pages = document.createElement("p");
        let read = document.createElement("p");

        let buttonRemove = document.createElement("button");
        let buttonToggle = document.createElement("button");


        buttonRemove.setAttribute("data-id", `${myLibrary[arrayLastIndex]["id"]}`);
        buttonRemove.setAttribute("class", "remove");
        buttonToggle.setAttribute("data-id", `${myLibrary[arrayLastIndex]["id"]}`);
        read.setAttribute("data-id", `${myLibrary[arrayLastIndex]["id"]}`);
        read.setAttribute("class", "read");
        buttonToggle.setAttribute("class", "toggle");

        let readStaus; 
        if (myLibrary[arrayLastIndex]["read"] == true) {
            readStaus = "Yes";
        } else {
            readStaus = "No"
        }

        author.textContent = myLibrary[arrayLastIndex]["author"];
        title.textContent = myLibrary[arrayLastIndex]["title"];
        pages.textContent = `Pages ${myLibrary[arrayLastIndex]["pages"]}`;
        read.textContent = `Read: ${readStaus}`;
        buttonRemove.textContent = "Remove";
        buttonToggle.textContent = "Toggle Read";

        buttonToggle.addEventListener("click", ToggleRead);
        buttonRemove.addEventListener("click", deleteArrayItem);

        cards.appendChild(card);

        card.appendChild(cardHeader);
        cardHeader.appendChild(title);
        cardHeader.appendChild(author);

        card.appendChild(cardBody);
        cardBody.appendChild(pages);
        cardBody.appendChild(read);

        card.appendChild(cardFooter);
        cardFooter.appendChild(buttonRemove);
        cardFooter.appendChild(buttonToggle);

    } else {

        allCards.forEach(wipeDisplay)

        for (const singleBook of myLibrary) {

            let card = document.createElement("div");
            card.classList.add("card")
            cards.appendChild(card);

            let cardHeader = document.createElement("div");
            let cardBody = document.createElement("div");
            let cardFooter = document.createElement("div");

            cardHeader.classList.add("card-header");
            cardBody.classList.add("card-body");
            cardFooter.classList.add("card-footer");

            let title = document.createElement("h1");
            let author = document.createElement("h2");

            let pages = document.createElement("p");
            let read = document.createElement("p");

            let buttonRemove = document.createElement("button");
            let buttonToggle = document.createElement("button");

            let readStaus; 
            if (singleBook.read == true) {
                readStaus = "Yes";
            } else {
                readStaus = "No"
            }

            buttonRemove.setAttribute("data-id", `${singleBook["id"]}`);
            buttonToggle.setAttribute("data-id", `${singleBook["id"]}`);
            read.setAttribute("data-id", `${singleBook["id"]}`);
            read.setAttribute("class", "read");
            buttonRemove.setAttribute("class", "remove");
            buttonToggle.setAttribute("class", "toggle");

            author.textContent = singleBook["author"];
            title.textContent = singleBook["title"];

            pages.textContent = `Pages: ${singleBook["pages"]}`;
            read.textContent = `Read: ${readStaus}`;
            
            buttonRemove.textContent = "Remove";
            buttonToggle.textContent = "Toggle Read";

            buttonToggle.addEventListener("click", ToggleRead);
            buttonRemove.addEventListener("click", deleteArrayItem);

            cards.appendChild(card);

            card.appendChild(cardHeader);
            cardHeader.appendChild(title);
            cardHeader.appendChild(author);

            card.appendChild(cardBody);
            cardBody.appendChild(pages);
            cardBody.appendChild(read);

            card.appendChild(cardFooter);
            cardFooter.appendChild(buttonRemove);
            cardFooter.appendChild(buttonToggle);
        }
    }

}

addBookToLibrary("Coolen Hover", "Verity", 320, true);
addBookToLibrary("Brian P. Moran e Michael Lennington", "O ano de 12 semanas", 208, false);
ShowBooksOnScreen();

function ToggleRead(event) {

    let bookUuid = event.target.dataset.id;
    let read = document.querySelector(`p[data-id="${bookUuid}"].read`);

    let bookIndex = myLibrary.findIndex((book)=>{
        return book.id == bookUuid;
    })

    myLibrary[bookIndex].toggleReadStatus();

    let readStaus; 
    if (myLibrary[bookIndex]["read"] == true) {
        readStaus = "Yes";
    } else {
        readStaus = "No";
    }

    read.textContent = `Read: ${readStaus}`;

}

function deleteArrayItem(event) {

    let bookUuid = event.target.dataset.id;
    let cardFooter = event.target.parentNode;
    let card = cardFooter.parentNode;
    
    card.remove()

    let bookIndex = myLibrary.findIndex((book)=>{
        return book.id == bookUuid;
    })

    myLibrary.splice(bookIndex, 1);

}
