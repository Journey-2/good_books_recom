import axios from 'axios';

const api_key = 'AIzaSyChRoa3Qq028QuMDAzC8w3xsUdrO6YRDbM';
const query = 'ikigai';

async function fetchBooks() {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${api_key}`);

        if (response.data.items && response.data.items.length > 0) {
            const thumbnailsDiv = document.getElementById('book-thumbnails');
            thumbnailsDiv.innerHTML = ''; // Clear any existing thumbnails

            response.data.items.forEach(item => {
                const volumeInfo = item.volumeInfo;

                const imgElement = document.createElement('img');
                imgElement.alt = volumeInfo.title;

                if (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) {
                    imgElement.src = volumeInfo.imageLinks.thumbnail;
                } else {
                    imgElement.alt = "No thumbnail found";
                    imgElement.src = "path/to/placeholder/image.jpg"; // Optional: Add a placeholder image if no thumbnail is found
                }

                thumbnailsDiv.appendChild(imgElement);
            });
        } else {
            console.log("Invalid query");
        }
    } catch (error) {
        console.log("Error caught:", error);
    }
}

fetchBooks();
