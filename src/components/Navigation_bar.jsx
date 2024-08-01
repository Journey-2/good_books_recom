import React, { useEffect, useState } from 'react';
import '../styles/Navigation_bar.css';

function Navigation_bar({ onSearch }) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <nav className='Nav-Container'>
            <div className='Top-Nav'>
                <div className='Logo'>
                    <a href='Logo'>Good-Books</a>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <div className='Auth-Links'>
                    <a href='/AuthForm' className='Login'>Login</a>
                    <a href='Signup' className='Signup'>Signup</a>
                </div>
            </div>
            <div className={`Bottom-Nav ${isScrolling ? 'hidden' : 'visible'}`}>
                <a href='Home'>Home</a>
                <a href='Saved'>Saved</a>
                <a href='Find'>Find</a>
                <a href='Community'>Community</a>
            </div>
        </nav>
    );
}

export default Navigation_bar;
