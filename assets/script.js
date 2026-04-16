let tbody = document.querySelector("tbody")
let myDialog = document.querySelector("dialog");
let buttonOpenDialog = document.querySelector(".open-dialog");
let buttonAddBook = document.querySelector(".buttons button:last-child");
let myForm = document.querySelector("form");

buttonOpenDialog.addEventListener("click", ()=> {
    myDialog.showModal();
})

buttonAddBook.addEventListener("click", (event)=> {
    event.preventDefault();

    myDialog.close()

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

    buttonDelete = document.querySelectorAll(".delete");
    buttonDelete = Array.from(buttonDelete);
    buttonDelete.forEach(deleteArrayItem);
    
    myForm.reset();
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

function addBookToLibrary(author, title, pages, read) {

    let uuid = crypto.randomUUID();
    let book = new Book(uuid, author, title, pages, read);

    myLibrary.push(book);
}

function wipeDisplay(td) {
    td.remove();
}

function ShowBooksOnScreen() {

    let tabletds = document.querySelectorAll("tbody tr td");
    tabletds = Array.from(tabletds);

    if(myLibrary.length > 2) {

        let tableRow = document.createElement("tr");
        tbody.appendChild(tableRow);

        let arrayLastIndex = myLibrary.length-1;

        let tdID = document.createElement("td");
        let tdAuthor = document.createElement("td");
        let tdTitle = document.createElement("td");
        let tdPages = document.createElement("td");
        let tdRead = document.createElement("td");
        let tdDelete = document.createElement("td");
        let buttonDelete = document.createElement("button");

        tdID.setAttribute("data-id", `${myLibrary[arrayLastIndex]["id"]}`);
        buttonDelete.setAttribute("data-id", `${myLibrary[arrayLastIndex]["id"]}`);
        buttonDelete.setAttribute("class", "delete");

        let read; 
        if (myLibrary[arrayLastIndex]["read"] == true) {
            read = "Yes";
        } else {
            read = "No"
        }

        tdID.textContent = myLibrary[arrayLastIndex]["id"];
        tdAuthor.textContent = myLibrary[arrayLastIndex]["author"];
        tdTitle.textContent = myLibrary[arrayLastIndex]["title"];
        tdPages.textContent = myLibrary[arrayLastIndex]["pages"];
        tdRead.textContent = read;
        buttonDelete.textContent = "Delete";


        tableRow.appendChild(tdID);
        tableRow.appendChild(tdAuthor);
        tableRow.appendChild(tdTitle);
        tableRow.appendChild(tdPages);
        tableRow.appendChild(tdRead);
        tableRow.appendChild(tdDelete);
        tdDelete.appendChild(buttonDelete);

    } else {

        tabletds.forEach(wipeDisplay)

        for (const singleBook of myLibrary) {

            let tableRow = document.createElement("tr");
            tbody.appendChild(tableRow);

            let tdID = document.createElement("td");
            let tdAuthor = document.createElement("td");
            let tdTitle = document.createElement("td");
            let tdPages = document.createElement("td");
            let tdRead = document.createElement("td");
            let tdDelete = document.createElement("td");
            let buttonDelete = document.createElement("button");

            let read; 
            if (singleBook.read == true) {
                read = "Yes";
            } else {
                read = "No"
            }

            tdID.setAttribute("data-id", `${singleBook["id"]}`);
            buttonDelete.setAttribute("data-id", `${singleBook["id"]}`);
            buttonDelete.setAttribute("class", "delete");

            tdID.textContent = singleBook["id"];
            tdAuthor.textContent = singleBook["author"];
            tdTitle.textContent = singleBook["title"];
            tdPages.textContent = singleBook["pages"];
            tdRead.textContent = read;
            buttonDelete.textContent = "Delete";

            tableRow.appendChild(tdID);
            tableRow.appendChild(tdAuthor);
            tableRow.appendChild(tdTitle);
            tableRow.appendChild(tdPages);
            tableRow.appendChild(tdRead);
            tableRow.appendChild(tdDelete);
            tdDelete.appendChild(buttonDelete);
            
        }
    }

}

addBookToLibrary("Coolen Hover", "Verity", 320, true);
addBookToLibrary("Brian P. Moran e Michael Lennington", "O ano de 12 semanas", 208, false);
ShowBooksOnScreen();

let buttonDelete = document.querySelectorAll(".delete");

buttonDelete = Array.from(buttonDelete);

buttonDelete.forEach(deleteArrayItem);

function deleteArrayItem(element) {
    element.addEventListener("click", ()=> {

        let bookUuid = element.dataset.id;
        let td = element.parentNode;
        let tr = td.parentNode;
        
        tr.remove()

        let bookIndex = myLibrary.findIndex((book)=>{
            return book.id == bookUuid;
        })

        myLibrary.splice(bookIndex, 1);

    });
}
