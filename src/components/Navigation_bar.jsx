import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebase';
import '../styles/Navigation_bar.css';

function Navigation_bar({ onSearch, user }) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); 
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getInitial = (email) => {
        return email ? email.charAt(0).toUpperCase() : '';
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
                    {user ? (
                        <div className='User-Profile'>
                            <Link to='@' className='Avatar'>{getInitial(user.email)}</Link>
                            <Link to='#' className='Logout' onClick={handleLogout}>Logout</Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className='Login'>Login</Link>
                            <Link to="/signup" className='Signup'>Sign Up</Link>
                        </>
                    )}
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
