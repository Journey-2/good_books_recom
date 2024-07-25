import axios from 'axios';

const API_KEY = 'AIzaSyChRoa3Qq028QuMDAzC8w3xsUdrO6YRDbM'; 
const query = 'naruto';

async function fetchBooks() {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`);
    
    if (response.data.items && response.data.items.length > 0) {
      response.data.items.forEach(item => {
        const volumeInfo = item.volumeInfo;
        
        if (volumeInfo.imageLinks) {
          console.log('Title:', volumeInfo.title);
          console.log('Author(s):', volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A');
          console.log('Cover Image URL:', volumeInfo.imageLinks.thumbnail);
        } else {
          console.log('No cover image available for this book.');
        }
      });
    } else {
      console.log('No books found for the given query.');
    }
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error.response ? error.response.data : error.message);
  }
}

fetchBooks();


