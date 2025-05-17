// Show the popup
var showBtn = document.getElementById("add-popup-button");
var popup = document.querySelector(".popup-overlay");
var popupContent = document.querySelector(".popup-message");
showBtn.addEventListener("click", function () {
  popup.style.display = "block";
  popupContent.style.display = "block";
});

// Cancel button
var cancelBtn = document.getElementById("cancelBook");
cancelBtn.addEventListener("click", function (event) {
  event.preventDefault();
  popup.style.display = "none";
  popupContent.style.display = "none";
});

// Add book
var addBtn = document.getElementById("addBook");
var formbase = document.getElementById("input-table");
var container = document.querySelector(".container");

addBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let fbname = formbase.elements["Book"].value.trim();
  let fbauthor = formbase.elements["Author"].value.trim();
  let fbdes = formbase.elements["description"].value.trim();

  if (fbname && fbauthor && fbdes) {
    renderBook(fbname, fbauthor, fbdes);
    saveBookToLocalStorage({ name: fbname, author: fbauthor, description: fbdes });

    formbase.reset();
    popup.style.display = "none";
    popupContent.style.display = "none";
  }
});

// Render a single book card
function renderBook(name, author, description) {
  let bookbox = document.createElement("div");
  bookbox.classList.add("box-container");

  let booktitle = document.createElement("h2");
  booktitle.textContent = name;

  let bookauthor = document.createElement("h4");
  bookauthor.textContent = author;

  let bookdes = document.createElement("p");
  bookdes.textContent = description;

  let bookdel = document.createElement("button");
  bookdel.textContent = "Delete";
  bookdel.onclick = function () {
    bookbox.remove();
    deleteBookFromLocalStorage(name);
  };

  bookbox.appendChild(booktitle);
  bookbox.appendChild(bookauthor);
  bookbox.appendChild(bookdes);
  bookbox.appendChild(bookdel);

  container.appendChild(bookbox);
}

// Save a new book to localStorage
function saveBookToLocalStorage(book) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

// Delete a book from localStorage by its name
function deleteBookFromLocalStorage(bookName) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books = books.filter(book => book.name !== bookName);
  localStorage.setItem("books", JSON.stringify(books));
}

// Load all saved books on page load
function loadBooksFromLocalStorage() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.forEach(book => {
    renderBook(book.name, book.author, book.description);
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadBooksFromLocalStorage);

function deleteBook(event){
  event.target.parentElement.remove();
} 