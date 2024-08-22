import React from 'react';

const GenreFilter = ({ onGenreSelect }) => {
    const genres = [
        'fiction', 'non-fiction', 'mystery', 'fantasy', 'science fiction', 'romance', 'thriller', 
        'historical', 'biography', 'poetry', 'self-help', 'health', 'travel', 'guide', 'religion', 
        'science', 'humor', "children's", 'horror', 'drama'
    ];

    return (
        <div className="GenreFilter-page">
            <h2>Find through genre</h2>
            <div className="genre-buttons">
                {genres.map(genre => (
                    <button key={genre} onClick={() => onGenreSelect(genre)}>
                        {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GenreGenreFilter;
