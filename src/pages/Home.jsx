import React, { useState, useEffect } from "react";
import {
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
} from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";

const developerPicks = [603, 157336, 128, 155];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [devPicks, setDevPicks] = useState([]);
  const [trending, setTrending] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
      const movieResults = await searchMovies(searchQuery);
      setMovies(movieResults);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  const fetchDeveloperPicks = async () => {
    try {
      const picks = await Promise.all(
        developerPicks.map((id) => getMovieDetails(id))
      );
      setDevPicks(picks);
    } catch (error) {
      console.error("Error fetching Developer's Picks: ", error);
    }
  };

  useEffect(() => {
    fetchDeveloperPicks();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setTrending(trendingMovies);
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
    }
  };

  useEffect(() => {
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

      <h2>Search Results</h2>
      <MovieList movies={movies} />

      <h2>Developer's Pick</h2>
      <MovieList movies={devPicks} />

      <h2>Trending Movies</h2>
      <MovieList movies={trending} />
    </div>
  );
};

export default Home;
