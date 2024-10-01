import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovieDetails, getTrendingMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import useStore from "../stores/store";

const developerPicks = [603, 157336, 128, 155];
const TRENDING_PREVIEW_COUNT = 8;

const Home = () => {
  const navigate = useNavigate();
  const { setSearchQuery, clearSearch } = useStore();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [devPicks, setDevPicks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeveloperPicks();
    fetchTrendingMoviesPreview();
    clearSearch(); // Clear previous search when returning to home
  }, []);

  const fetchDeveloperPicks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const picks = await Promise.all(
        developerPicks.map((id) => getMovieDetails(id))
      );
      setDevPicks(picks);
    } catch (error) {
      console.error("Error fetching Developer's Picks: ", error);
      setError("Failed to fetch developer picks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMoviesPreview = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTrendingMovies(1);
      setTrendingMovies(result.results.slice(0, TRENDING_PREVIEW_COUNT));
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
      setError("Failed to fetch trending movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mx-auto px-4">
      {/* <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">YAMDS</h1>
        <Link
          to="/favorites"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          My Favorites
        </Link>
      </nav> */}
      {/* <SearchBar onSearch={handleSearch} /> */}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MovieList movies={trendingMovies} />
          <Link to="/trending" className="text-blue-500 hover:text-blue-700">
            See all trending movies
          </Link>
        </>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Developer's Pick</h2>
      {isLoading ? <div>Loading...</div> : <MovieList movies={devPicks} />}
    </div>
  );
};

export default Home;
