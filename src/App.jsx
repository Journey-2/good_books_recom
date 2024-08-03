import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation_bar from './components/Navigation_bar';
import MainPage from './components/MainPage';
import Page_footer from './components/Page_footer';
import LoginPage from './components/LoginPage';

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
                <Route path="/auth" element={<LoginPage />} />
            </Routes>
            <Page_footer />
        </Router>
    );
};

export default App;
