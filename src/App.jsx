import React, { useState } from 'react';
import Navigation_bar from './components/Navigation_bar';
import MainPage from './components/MainPage';
import Page_footer from './components/page_footer'
import { Route,Routes } from 'react-router-dom';

const App = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };


    return (
        <>
            <Navigation_bar onSearch={handleSearch} />
            <MainPage query={query} />
            <Page_footer/>
        </>
    );
};

export default App;


