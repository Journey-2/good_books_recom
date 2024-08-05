import React, { useEffect, useState } from 'react';
import { db } from '../auth/firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 
import '../styles/SavedBooks.css'; 

const SavedBooks = () => {
    const [savedBooks, setSavedBooks] = useState([]);

    useEffect(() => {
        const fetchSavedBooks = async () => {
            try {
                const booksCollectionRef = collection(db, 'books');
                const snapshot = await getDocs(booksCollectionRef);
                const booksList = snapshot.docs.map(doc => doc.data());
                setSavedBooks(booksList);
            } catch (error) {
                console.error('Error fetching saved books:', error);
            }
        };

        fetchSavedBooks();
    }, []);

    return (
        <div className="saved-books">
            <h2>Saved Books</h2>
            <div className="book-section">
                {savedBooks.map((book, index) => (
                    <div key={index} className="book">
                        <div className='card'>
                            <img src={book.thumbnail || '../assets/noImage.jpg'} alt={`${book.title} thumbnail`} />
                            <h3 className='header'>{book.title}</h3>
                            <p className='para'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedBooks;
