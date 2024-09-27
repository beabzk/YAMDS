import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (movie) => set((state) => ({
                favorites: [...state.favorites, movie]
            })),
            removeFavorite: (movieId) => set((state) => ({
                favorites: state.favorites.filter((movie) => movie.id !== movieId)
            })),
            isFavorite: (movieId) => get().favorites.some((movie) => movie.id === movieId),
        }),
        {
            name: 'favorites-storage',
            getStorage: () => localStorage,
        }
    )
)

export default useFavoritesStore