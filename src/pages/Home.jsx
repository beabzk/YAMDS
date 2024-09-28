import React, { useState, useEffect } from "react";
import {
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
} from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";
import useStore from "../stores/store";

const developerPicks = [603, 157336, 128, 155];

const Home = () => {
  const {
    movies,
    setMovies,
    addMovies,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  } = useStore();
  const [devPicks, setDevPicks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query);
      setMovies(result.results || []);
      setCurrentPage(1);
      setTotalPages(result.total_pages || 1);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTrendingMovies();
      setMovies(result.results || []);
      setCurrentPage(1);
      setTotalPages(result.total_pages || 1);
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
      setError("Failed to fetch trending movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setError(null);
      try {
        const nextPage = currentPage + 1;
        let result;
        if (searchQuery) {
          result = await searchMovies(searchQuery, nextPage);
        } else {
          result = await getTrendingMovies(nextPage);
        }
        addMovies(result.results || []);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error("Error fetching more movies: ", error);
        setError("Failed to load more movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDeveloperPicks();
    fetchTrendingMovies();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">YAMDS</h1>
        <Link
          to="/favorites"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          My Favorites
        </Link>
      </nav>
      <SearchBar onSearch={handleSearch} />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <h2 className="text-xl font-bold mt-8 mb-4">Developer's Pick</h2>
      {isLoading ? <div>Loading...</div> : <MovieList movies={devPicks} />}

      <h2 className="text-xl font-bold mb-4">
        {searchQuery ? "Search Results" : "Trending Movies"}
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MovieList movies={movies} />
          {currentPage < totalPages && (
            <button
              onClick={loadMoreMovies}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
