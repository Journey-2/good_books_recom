import React, { useState } from 'react';
import Navigation_bar from './components/Navigation_bar';
import BookThumbnails from './components/bookThumbnails';
import Big_Image from "./components/Front_page"
import Page_footer from './components/page_footer'

const App = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <div>
            <Navigation_bar onSearch={handleSearch} />
            <Big_Image/>
            <BookThumbnails query={query} />
            <Page_footer/>
        </div>
    );
};

export default App;


