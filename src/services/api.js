import axios from 'axios';

// Create an instance of Axios with default base URL
const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});

// Fetch movies based on search query
export const searchMovies = async (query) => {
    const response = await apiClient.get('/search/movie', {
        params: { query },
    });
    return response.data.results;
};

// Fetch movie details by ID
export const getMovieDetails = async (id) => {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
};

// Fetch trending movies
export const getTrendingMovies = async () => {
    const response = await apiClient.get('/trending/movie/week');
    return response.data.results;
};
