import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies, onOpen}) {
    if (movies.length === 0 ) return null

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onOpen={onOpen} />
            ))}
        </div>    
    )
}