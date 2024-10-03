import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Create a Zustand store with persistence
const useStore = create(
    persist(
        (set, get) => ({
            // State variables
            favorites: [],
            currentPage: 1,
            totalPages: 1,
            movies: [],
            searchQuery: '',
            searchResults: [],
            isDarkMode: false,

            // Actions
            addFavorite: (movie) => set((state) => ({
                favorites: [...state.favorites, movie] // Add a movie to favorites
            })),
            removeFavorite: (movieId) => set((state) => ({
                favorites: state.favorites.filter((movie) => movie.id !== movieId) // Remove a movie from favorites by ID
            })),
            isFavorite: (movieId) => get().favorites.some((movie) => movie.id === movieId),
            setCurrentPage: (page) => set({ currentPage: page }),
            setTotalPages: (pages) => set({ totalPages: pages }),
            setMovies: (movies) => set({ movies }),
            setSearchQuery: (query) => set({ searchQuery: query }),
            setSearchResults: (results) => set({ searchResults: results }),
            clearSearch: () => set({ searchQuery: '', searchResults: [] }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'movie-app-storage', // Name of the storage key
            getStorage: () => localStorage, // Use localStorage for persistence
        }
    )
)

export default useStore