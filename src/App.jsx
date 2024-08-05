import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation_bar from './components/Navigation_bar';
import MainPage from './components/MainPage';
import Page_footer from './components/Page_footer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage';
import SavedBooks from './components/SavedBooks';

const App = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <Router>
            <Navigation_bar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<MainPage query={query} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/saved" element={<SavedBooks />} />
            </Routes>
            <Page_footer />
        </Router>
    );
};

export default App;
