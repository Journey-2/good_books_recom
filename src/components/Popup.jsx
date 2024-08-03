import React from 'react';
import '../styles/Popup.css';

const Popup = ({ show, book, handleClose }) => {
    if (!show || !book) {
        return null;
    }

    const handleRedirect = () => {
        if (book.infoLink) {
            window.open(book.infoLink, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="overlay">
            <div className="popupDialog">
                <div className='button_container'>
                    <button className='save_button'>Save</button>
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
