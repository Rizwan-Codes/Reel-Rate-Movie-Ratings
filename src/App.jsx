import { useState, useEffect } from 'react';
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";


function App() {
    const [view, setView] = useState('search');
    const [query, setQuery] = useState('');
    return (
        <div className="min-h-screen grain-overlay">
            <Header view={view} setView={setView} />

            <main className="max-w-5xl mx-auto px-6 py-8">
                {view === 'search' && (
                    <SearchBar query={query} setQuery={setQuery} />
                )}
            </main>
        </div>
    )
}

export default App;