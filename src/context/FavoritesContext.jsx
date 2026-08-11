import { createContext, useContext, useState, useCallback } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const alreadyExists = prev.some((m) => m.imdbID === movie.imdbID)
      if (alreadyExists) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFavorite = useCallback((imdbID) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID))
  }, [])

  const isFavorite = useCallback(
    (imdbID) => favorites.some((m) => m.imdbID === imdbID),
    [favorites],
  )

  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.imdbID)) {
        removeFavorite(movie.imdbID)
      } else {
        addFavorite(movie)
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  )

  const value = { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used inside a FavoritesProvider')
  }
  return context
}
