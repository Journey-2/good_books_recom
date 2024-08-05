import React from 'react';
import '../styles/Popup.css';
import { db } from '../auth/firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

const Popup = ({ show, book, handleClose }) => {
    if (!show || !book) {
        return null;
    }

    const handleRedirect = () => {
        if (book.infoLink) {
            window.open(book.infoLink, '_blank', 'noopener,noreferrer');
        }
    };

    const handleSave = async () => {
        try {
            const booksCollectionRef = collection(db, 'books');

            const q = query(booksCollectionRef, where("title", "==", book.title));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('This book is already saved.');
                return;
            }

            await addDoc(booksCollectionRef, {
                title: book.title,
                authors: book.authors || [],
                description: book.description || 'No description available',
                thumbnail: book.thumbnail || '../assets/noImage.jpg',
                infoLink: book.infoLink || ''
            });
            alert('Book saved successfully!');
        } catch (error) {
            console.error('Error saving book:', error);
            alert('Failed to save the book.');
        }
    };

    return (
        <div className="overlay">
            <div className="popupDialog">
                <div className='button_container'>
                    <button className='save_button' onClick={handleSave}>Save</button>
                    <button className="close_button" onClick={handleClose}>Close</button>
                </div>
                <h2 className='Popup_header2'>{book.title}</h2>
                <h4 className='Popup_header4'>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</h4>
                <p className='Popup_para'>{book.description ? book.description : 'No description available'}</p>
                
                <button className='read_button'>Read</button>
                <button className='redirect_button' onClick={handleRedirect}>
                    Go to Google Books
                </button>
                
            </div>
        </div>
    );
};

export default Popup;
