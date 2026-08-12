import { useEffect, useState } from 'react'
import { OMDB_API_KEY, OMDB_BASE_URL } from '../config.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function MovieModal({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!imdbID) return

    const controller = new AbortController()

    async function fetchDetails() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`,
          { signal: controller.signal },
        )
        const data = await res.json()
        if (data.Response === 'False') throw new Error(data.Error)
        setMovie(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
    return () => controller.abort()
  }, [imdbID])

  if (!imdbID) return null

  const saved = movie && isFavorite(movie.imdbID)

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-reel-charcoal border border-reel-teal/40 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-reel-black/70 text-reel-paper flex items-center justify-center hover:text-reel-red z-10"
        >
          ✕
        </button>

        {loading && (
          <p className="p-10 text-center text-reel-paper/60">Loading details...</p>
        )}

        {error && (
          <p className="p-10 text-center text-reel-red">Could not load: {error}</p>
        )}

        {movie && !loading && !error && (
          <div className="flex flex-col sm:flex-row gap-5 p-5">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445'}
              alt={`${movie.Title} poster`}
              className="w-full sm:w-48 rounded-lg object-cover flex-shrink-0"
            />

            <div className="flex-1">
              <h2 className="font-marquee text-xl uppercase text-reel-paper">
                {movie.Title}{' '}
                <span className="text-reel-paper/40 text-base normal-case">
                  ({movie.Year})
                </span>
              </h2>
              <p className="text-sm text-reel-paper/50 mt-1">
                {movie.Genre} • {movie.Runtime}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {movie.Ratings?.map((r) => (
                  <span
                    key={r.Source}
                    className="text-xs bg-reel-black/60 border border-reel-gold/30 text-reel-gold px-2.5 py-1 rounded-full"
                  >
                    {r.Source}: {r.Value}
                  </span>
                ))}
              </div>

              <p className="text-sm text-reel-paper/80 mt-4 leading-relaxed">
                {movie.Plot}
              </p>

              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="text-reel-paper/40 w-16 shrink-0">Director</dt>
                  <dd className="text-reel-paper/80">{movie.Director}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-reel-paper/40 w-16 shrink-0">Cast</dt>
                  <dd className="text-reel-paper/80">{movie.Actors}</dd>
                </div>
              </dl>

              <button
                onClick={() => toggleFavorite(movie)}
                className={`mt-5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  saved
                    ? 'bg-reel-red text-reel-paper'
                    : 'bg-reel-teal/30 text-reel-paper hover:bg-reel-teal/50'
                }`}
              >
                {saved ? '★ Remove from My List' : '☆ Add to My List'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
