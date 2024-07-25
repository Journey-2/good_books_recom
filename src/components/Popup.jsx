import React from 'react';
import '../styles/Popup.css';

const Popup = ({ show, book, handleClose }) => {
    if (!show || !book) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="popupDialog">
                <h3>{book.title}</h3>
                <p>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                <p>{book.description ? book.description : 'No description available'}</p>
                <button className="close_button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;
