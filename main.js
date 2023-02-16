let myLibrary = [];

/* addBookToLibrary(
  "A Better Nigeria: A Better World",
  "Ken Chukwudi",
  "1960",
  "Read"
);
addBookToLibrary("A Passage to India", "E.M. Foster", "1800", "Not read yet");
addBookToLibrary("A Revenue Stamp", "Amrita Pritam", "1450", "Not read yet");
addBookToLibrary("Death of a City", "Amrita Pritam", "1640", "Read"); */

// CONSTRUCTOR
function Book(title, author, pages, read = "no") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  /* this.info = function () {
    return `${title} by ${author}, ${pages}, ${read}`;
  }; */
}

// MODAL SECTION
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
let addBook = document.querySelector("#add-book");
addBook.addEventListener("click", closeModal);

//ADD TO LIBRARY FUNCTION
function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  const readStatus = read ? "Read" : "Not read yet";
  const book = new Book(title, author, pages, readStatus);
  for (let book of myLibrary) {
    if (book.title === title) {
      alert("Book already exists in library!");
      return;
    }
  }
  if (title.value !== "" && author !== "" && pages !== "") {
    myLibrary.push(book);
  }
  displayBooks();
}

// DEFAULT ACTION SHOULDNT BE TAKEN AS IT NORMALLY WOULD
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

// DISPLAY ALL ELEMENT IN AN ARRAY
function displayBooks() {
  const booksContainer = document.querySelector("#books-container");
  booksContainer.innerHTML = "";
  myLibrary.forEach((element, index) => {
    const divEl = document.createElement("div");
    divEl.classList.add("card");
    divEl.id = `card-${index}`;
    if (typeof element === "object") {
      Object.values(element).forEach((value) => {
        const paraEl = document.createElement("p");
        paraEl.textContent = value;
        divEl.appendChild(paraEl);
        booksContainer.appendChild(divEl);
      });
    }
    // TOGGLE BUTTON FOR READ STATUS
    const paraToggle = document.querySelector(".card p:nth-child(4)");
    const readToggle = document.createElement("button");

    readToggle.innerHTML = paraToggle.innerHTML;
    readToggle.setAttribute("class", "toggle-button");
    readToggle.setAttribute("type", "button");
    paraToggle.parentNode.replaceChild(readToggle, paraToggle);
    // readToggle.textContent === "Read" =
    //readToggle.style.backgroundColor = "#7FFFD4";
    //readToggle.textContent === "Not read yet"
    //readToggle.style.backgroundColor = "#FF5733";

    readToggle.addEventListener("click", function () {
      if (readToggle.textContent === "Read") {
        return (readToggle.textContent = "Not read yet");
        // (readToggle.style.backgroundColor = "#FF5733")
      } else {
        return (readToggle.textContent = "Read");
        //(readToggle.style.backgroundColor = "#7FFFD4")
      }
    });

    // REMOVE DIV THAT CONTAINS LIBRARY CARD
    function removeCard(cardIndex) {
      const card = document.querySelector(`#card-${cardIndex}`);
      card.remove();
      //
      myLibrary.splice(cardIndex, 1);
    }

    // REMOVE DIV THAT CONTAINS LIBRARY CARD
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.classList.add("remove-card");
    removeButton.textContent = "Remove book";
    removeButton.style.backgroundColor = "#D54A2D";
    removeButton.addEventListener("click", () => {
      removeCard(index);
    });
    divEl.appendChild(removeButton);
  });
}
// TRIGGER ADD BOOK BUTTON
addBook.addEventListener("click", addBookToLibrary);
//addBook.addEventListener("click", displayBooks);

// RESET FORM INPUT

let resetBtn = document.getElementById("reset");
let inputs = document.querySelectorAll("input");
resetBtn.addEventListener("click", () => {
  inputs.forEach((input) => (input.value = ""));
});
