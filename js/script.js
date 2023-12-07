const apiUrl = "https://openlibrary.org/search.json";
const container = document.getElementById("bookContainer");

function fetchBooks(query) {
  return fetch(`${apiUrl}?q=${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching books data");
      }
      return response.json();
    })
    .then((data) => data.docs || []);
}

function displayBooks(books) {
  container.innerHTML = "";

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${
      book.author_name ? book.author_name.join(", ") : "Unknown"
    }`;

    const cover = document.createElement("img");
    cover.alt = "Book Cover";

    //   cover.onerror = function () {
    // 	 cover.src = 'img/No-Image-Placeholder.svg';
    //   };

    cover.src = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(cover);

    container.appendChild(bookCard);
  });
}

function searchBooks() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();

  if (query !== "") {
    fetchBooks(query)
      .then(displayBooks)
      .catch((error) => {
        console.error(error.message);
        container.innerHTML = "Error loading books. Please try again later.";
      });
  } else {
    container.innerHTML = "Please enter book title or author.";
  }
}
