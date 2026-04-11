let tbody = document.querySelector("tbody")

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

function ShowBooksOnScreen() {
    for (const singleBook of myLibrary) {

        let tableRow = document.createElement("tr");

        tbody.appendChild(tableRow);

        let tdID = document.createElement("td");
        let tdAuthor = document.createElement("td");
        let tdTitle = document.createElement("td");
        let tdPages = document.createElement("td");
        let tdRead = document.createElement("td");

        tdID.textContent = singleBook["id"];
        tdAuthor.textContent = singleBook["author"];
        tdTitle.textContent = singleBook["title"];
        tdPages.textContent = singleBook["pages"];
        tdRead.textContent = singleBook["read"];

        tableRow.appendChild(tdID);
        tableRow.appendChild(tdAuthor);
        tableRow.appendChild(tdTitle);
        tableRow.appendChild(tdPages);
        tableRow.appendChild(tdRead);
        
    }
}

addBookToLibrary("Coolen Hover", "Verity", 340, true);
addBookToLibrary("Brian P. Moran e Michael Lennington", "O ano de 12 semanas", 208, false);
ShowBooksOnScreen();
