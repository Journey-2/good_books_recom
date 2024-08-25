import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import '../styles/MainPage.css';
import Popup from './Popup';
import Main_Image from '../assets/front.jpg';

function FrontImage() {
    return (
        <img src={Main_Image} alt="Main" className="front-image" />
    );
}

const MainPage = ({ query }) => {
    const [books, setBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);
    const [genre, setGenre] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const popularResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                    params: {
                        q: 'best seller',
                        key: api_key,
                        maxResults: 10
                    }
                });

                if (popularResponse.data.items) {
                    const popularBookDetails = popularResponse.data.items.map(item => {
                        const volumeInfo = item.volumeInfo || {};

                        return {
                            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '../assets/noImage.jpg',
                            title: volumeInfo.title,
                            authors: volumeInfo.authors,
                            description: volumeInfo.description,
                            infoLink: volumeInfo.infoLink
                        };
                    });
                    setPopularBooks(popularBookDetails);
                }

                const latestResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                    params: {
                        q: 'new books',
                        key: api_key,
                        orderBy: 'newest',
                        maxResults: 10
                    }
                });

                if (latestResponse.data.items) {
                    const latestBookDetails = latestResponse.data.items.map(item => {
                        const volumeInfo = item.volumeInfo || {};

                        return {
                            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '../assets/noImage.jpg',
                            title: volumeInfo.title,
                            authors: volumeInfo.authors,
                            description: volumeInfo.description,
                            infoLink: volumeInfo.infoLink
                        };
                    });
                    setLatestBooks(latestBookDetails);
                }
            } catch (error) {
                console.log("Error caught:", error);
            }
        };

        fetchBooks();
    }, [api_key]);

    useEffect(() => {
        if (query || genre) {
            const fetchSearchResults = async () => {
                try {
                    const searchQuery = query || genre;
                    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                        params: {
                            q: searchQuery,
                            key: api_key,
                            maxResults: 10
                        }
                    });

                    if (response.data.items && response.data.items.length > 0) {
                        const bookDetails = response.data.items.map(item => {
                            const volumeInfo = item.volumeInfo || {};

                            return {
                                thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '../assets/noImage.jpg',
                                title: volumeInfo.title,
                                authors: volumeInfo.authors,
                                description: volumeInfo.description,
                                infoLink: volumeInfo.infoLink
                            };
                        });
                        setBooks(bookDetails);
                    } else {
                        console.log("Invalid query or no results found");
                    }
                } catch (error) {
                    console.log("Error caught:", error);
                }
            };

            fetchSearchResults();
        }
    }, [query, genre, api_key]);

    const handleGenreClick = (selectedGenre) => {
        setGenre(selectedGenre);
    };

    const handleImageClick = (book) => {
        setSelectedBook(book);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedBook(null);
    };

    return (
        <div className="book-thumbnails">
            <Popup show={showPopup} book={selectedBook} handleClose={handleClosePopup} />
            {query || genre ? (
                <>
                    <h2 className='search-title'>{query ? `Search results for "${query}"` : `Books in "${genre}"`}</h2>
                    {books.map((book, index) => (
                        <div key={index} className="book">
                            <div className='card'>
                                <img src={book.thumbnail} alt={`${book.title} thumbnail`} onClick={() => handleImageClick(book)} />
                                <h3 className='header'>{book.title}</h3>
                                <p className='para'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <FrontImage />
                    <h2>Most Popular Books</h2>
                    <div className="book-section">
                        {popularBooks.map((book, index) => (
                            <div key={index} className="book">
                                <div className='card'>
                                    <img src={book.thumbnail} alt={`${book.title} thumbnail`} onClick={() => handleImageClick(book)} />
                                    <h3 className='header'>{book.title}</h3>
                                    <p className='para'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Latest Books</h2>
                    <div className="book-section">
                        {latestBooks.map((book, index) => (
                            <div key={index} className="book">
                                <div className='card'>
                                    <img src={book.thumbnail} alt={`${book.title} thumbnail`} onClick={() => handleImageClick(book)} />
                                    <h3 className='header'>{book.title}</h3>
                                    <p className='para'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="genre-buttons">
                        <div className='genre-title'>Find through genre</div>
                        <button onClick={() => handleGenreClick('fiction')}>Fiction</button>
                        <button onClick={() => handleGenreClick('non-fiction')}>Non-Fiction</button>
                        <button onClick={() => handleGenreClick('mystery')}>Mystery</button>
                        <button onClick={() => handleGenreClick('fantasy')}>Fantasy</button>
                        <button onClick={() => handleGenreClick('science fiction')}>Science Fiction</button>
                        <button onClick={() => handleGenreClick('romance')}>Romance</button>
                        <button onClick={() => handleGenreClick('thriller')}>Thriller</button>
                        <button onClick={() => handleGenreClick('historical')}>Historical</button>
                        <button onClick={() => handleGenreClick('biography')}>Biography</button>
                        <button onClick={() => handleGenreClick('poetry')}>Poetry</button>
                        <button onClick={() => handleGenreClick('self-help')}>Self-Help</button>
                        <button onClick={() => handleGenreClick('health')}>Health</button>
                        <button onClick={() => handleGenreClick('travel')}>Travel</button>
                        <button onClick={() => handleGenreClick('guide')}>Guide</button>
                        <button onClick={() => handleGenreClick('religion')}>Religion</button>
                        <button onClick={() => handleGenreClick('science')}>Science</button>
                        <button onClick={() => handleGenreClick('humor')}>Humor</button>
                        <button onClick={() => handleGenreClick('children')}>Children</button>
                        <button onClick={() => handleGenreClick('horror')}>Horror</button>
                        <button onClick={() => handleGenreClick('drama')}>Drama</button>
                    </div>
                </>
            )}
        </div>
    );
};

// Add PropTypes validation
MainPage.propTypes = {
    query: PropTypes.string
};

export default MainPage;
