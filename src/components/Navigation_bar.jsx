import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to="/">Good-Books</Link>
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
                    <Link to="/login" className='Login'>Login</Link>
                    <Link to="/signup" className='Signup'>Sign Up</Link>
                </div>
            </div>
            <div className={`Bottom-Nav ${isScrolling ? 'hidden' : 'visible'}`}>
                <Link to="/">Home</Link>
                <Link to="/saved">Saved</Link>
                <Link to="/find">Find</Link>
                <Link to="/community">Community</Link>
            </div>
        </nav>
    );
}

export default Navigation_bar;
