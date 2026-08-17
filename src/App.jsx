import { useState, useEffect, useMemo, useCallback } from 'react'
import { OMDB_API_KEY, OMDB_BASE_URL } from './config.js'
import { useDebounce } from './hooks/useDebounce.js'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieModal from './components/MovieModel.jsx'
import FavoritesPage from './components/FavoritesPage.jsx'

export default function App() {
    const [view, setView] = useState(() => {
        return localStorage.getItem("view") || "search";
    });
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedID, setSelectedID] = useState(null)
    const [sortBy, setSortBy] = useState('relevance')

    const debouncedQuery = useDebounce(query, 500)

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

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
                    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(debouncedQuery.trim())}&type=movie`,
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

    const sortedMovies = useMemo(() => {
        if (sortBy === 'relevance') return movies
        const copy = [...movies]
        copy.sort((a, b) =>
            sortBy === 'yearDesc' ? b.Year - a.Year : a.Year - b.Year,
        )
        return copy
    }, [movies, sortBy])

    const openMovie = useCallback((imdbID) => setSelectedID(imdbID), [])
    const closeMovie = useCallback(() => setSelectedID(null), [])

    return (
        <div className="min-h-screen grain-overlay">
            <Header view={view} setView={setView} />

            <main className="max-w-5xl mx-auto px-6 py-8">
                {view === 'search' ? (
                    <>
                        <SearchBar query={query} setQuery={setQuery} />

                        {movies.length > 0 && (
                            <div className="flex justify-end mt-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-reel-charcoal border border-[#3A5A57]/30 text-sm text-[#EDE6D6]/80 rounded-lg px-3 py-1.5 focus:outline-none"
                                >
                                    <option value="relevance">Sort: Relevance</option>
                                    <option value="yearDesc">Sort: Newest first</option>
                                    <option value="yearAsc">Sort: Oldest first</option>
                                </select>
                            </div>
                        )}

                        {loading && (
                            <p className="text-center text-[#EDE6D6]/50 mt-10">Searching...</p>
                        )}

                        {error && (
                            <p className="text-center text-[#C4432B] mt-10">{error}</p>
                        )}

                        {!loading && !error && !query && (
                            <p className="text-center text-[#EDE6D6]/40 mt-16">
                                Start typing a movie title to see ratings from IMDb, Rotten
                                Tomatoes and Metacritic.
                            </p>
                        )}

                        <MovieGrid movies={sortedMovies} onOpen={openMovie} />
                    </>
                ) : (
                    <FavoritesPage onOpen={openMovie} />
                )}
            </main>

            <MovieModal imdbID={selectedID} onClose={closeMovie} />
        </div>
    )
}
