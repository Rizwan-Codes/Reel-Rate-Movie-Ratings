import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce.js';
import { OMDB_API_KEY, OMDB_BASE_URL } from './Config.js'
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";


function App() {
    const [view, setView] = useState('search');
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setMovies([])
            setError(null)
            return
        }

        const controller = new AbortController()

        async function searchMovies() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(debouncedQuery)}&type=movie`,
                    { signal: controller.signal },
                )
                const data = await res.json()
                if (data.Response === 'False') {
                    setMovies([])
                    setError(data.Error)
                } else {
                    setMovies(data.Search)
                }
            } catch (err) {
                if (err.name !== 'AbortError') setError('Something went wrong. Try again.')
            } finally {
                setLoading(false)
            }
        }

        searchMovies()
        return () => controller.abort()
    }, [debouncedQuery])


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