document.addEventListener("DOMContentLoaded", () => {
    // Example fetch and XML processing
    fetch('./xml/bookstore.xml')
        .then(response => response.text())
        .then(xmlString => {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // Validate XML against DTD
            // Example: xmlDoc.validate()

            // Display bookstore data
            displayBooks(xmlDoc);
        })
        .catch(error => console.error('Error fetching XML:', error));

    function displayBooks(xmlDoc) {
        const books = xmlDoc.querySelectorAll('book');
        const bookListSection = document.getElementById('bookList');
        
        books.forEach(book => {
            const title = book.querySelector('title').textContent;
            const author = book.querySelector('author').textContent;
            const genre = book.querySelector('genre').textContent;
            const price = book.querySelector('price').textContent;

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-item');
            bookDiv.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Genre:</strong> ${genre}</p>
                <p><strong>Price:</strong> $${price}</p>
            `;
            bookListSection.appendChild(bookDiv);
        });
    }
});
