const FALLBACK_POSTER = 'https://placehold.co/300x445/211D1A/C9A227?text=No+Poster'

export default function MovieCard({ movie, onOpen }) {
    const { isFavorite, toggleFavorite } = useFavorites()
    const saved = isFavorite(movie.imdbID)

    return (
        <div className="group relative bg-[#211D1A] rounded-lg overflow-hidden border border-[#3A5A57]/20 hover:border-[#C9A227]/60 transition-colors">
            <button
                onClick={() => onOpen(movie.imdbID)}
                className="block w-full text-left"
            >
                <img src={movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER}
                    alt={`${movie.Title} poster`}
                    className="w-full aspect-2/3 object-cover"
                    loading="lazy"
                />
                <div className="p-3">
                    <h3 className="font-marquee text-sm uppercase tracking-wide text-reel-paper truncate">
                        {movie.Title}
                    </h3>
                    <p className="text-xs text-reel-paper/50 mt-1">{movie.Year}</p>
                </div>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(movie)
                }}
                aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm
                    backdrop-blur-sm transition-colors ${saved
                        ? 'bg-[#C4432B] text-[#EDE6D6]'
                        : 'bg-[#161311]/60 text-[#EDE6D6]/70 hover:text-[#C9A227]'
                    }`}
            >
                {saved ? '★' : '☆'}
            </button>

        </div>

    )
}