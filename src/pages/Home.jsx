import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovieDetails, getTrendingMovies } from "../services/api";
import MovieList from "../components/MovieList";
import useStore from "../stores/store";

// IDs for developer's picks movies
const developerPicks = [603, 157336, 128, 155];
const TRENDING_PREVIEW_COUNT = 8;

const Home = () => {
  const { clearSearch } = useStore();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [devPicks, setDevPicks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeveloperPicks();
    fetchTrendingMoviesPreview();
    clearSearch(); // Clear previous search when returning to home
  }, []);

  // Fetch developer's picks movies details
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

  // Fetch trending movies preview
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

  return (
    <div className="container mx-auto px-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trending Movies</h2>
        <Link
          to="/trending"
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          See all trending
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MovieList movies={trendingMovies} />
        </>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4">Developer's Pick</h2>
      {isLoading ? <div>Loading...</div> : <MovieList movies={devPicks} />}
    </div>
  );
};

export default Home;
