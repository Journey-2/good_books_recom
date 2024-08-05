import React, { useState, useEffect } from 'react';
import '../styles/SavedBooks.css';

const MAX_DESCRIPTION_LENGTH = 100;

const truncateDescription = (description) => {
    if (!description) return 'No description available';
    return description.length > MAX_DESCRIPTION_LENGTH
        ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
        : description;
};

const SavedBooks = () => {
    const [savedBooks, setSavedBooks] = useState([]);

    useEffect(() => {
        const fetchSavedBooks = () => {
            const books = JSON.parse(localStorage.getItem('savedBooks')) || [];
            setSavedBooks(books);
        };

        fetchSavedBooks();
    }, []);

    const isBookSaved = (book) => {
        return savedBooks.some(savedBook => savedBook.id === book.id);
    };

    const addBookToSaved = (book) => {
        if (isBookSaved(book)) {
            console.log('This book is already saved.');
            return;
        }

        const updatedBooks = [...savedBooks, book];
        setSavedBooks(updatedBooks);
        localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
    };

    return (
        <div className="saved-books-container">
            <h2>Saved Books</h2>
            {savedBooks.length === 0 ? (
                <p>No saved books found.</p>
            ) : (
                <div className="book-section">
                    {savedBooks.map((book, index) => (
                        <div key={index} className="book">
                            <div className='card'>
                                <img src={book.thumbnail} alt={`${book.title} thumbnail`} />
                                <div className='card-content'>
                                    <h3 className='header'>{book.title}</h3>
                                    <p className='para'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                                    <p className='description'>{truncateDescription(book.description)}</p>
                                    <a href={book.infoLink} target="_blank" rel="noopener noreferrer" className='read-link'>
                                        Go to Google Books
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedBooks;
