import { useFavorites } from '../context/FavoritesContext.jsx'
import MovieGrid from './MovieGrid.jsx'

export default function FavoritesPage({ onOpen }) {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 text-[#EDE6D6]/50">
        <p className="text-lg">Your list is empty.</p>
        <p className="text-sm mt-1">Search a movie and tap the ☆ to save it here.</p>
      </div>
    )
  }

  return <MovieGrid movies={favorites} onOpen={onOpen} />
}
