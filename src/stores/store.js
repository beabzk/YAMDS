import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        (set, get) => ({
            favorites: [],
            currentPage: 1,
            totalPages: 1,
            movies: [],
            searchQuery: '',
            searchResults: [],
            addFavorite: (movie) => set((state) => ({
                favorites: [...state.favorites, movie]
            })),
            removeFavorite: (movieId) => set((state) => ({
                favorites: state.favorites.filter((movie) => movie.id !== movieId)
            })),
            isFavorite: (movieId) => get().favorites.some((movie) => movie.id === movieId),
            setCurrentPage: (page) => set({ currentPage: page }),
            setTotalPages: (pages) => set({ totalPages: pages }),
            setMovies: (movies) => set({ movies }),
            setSearchQuery: (query) => set({ searchQuery: query }),
            setSearchResults: (results) => set({ searchResults: results }),
            clearSearch: () => set({ searchQuery: '', searchResults: [] }),
        }),
        {
            name: 'movie-app-storage',
            getStorage: () => localStorage,
        }
    )
)

export default useStore