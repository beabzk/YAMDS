import React, { useState } from "react";
import { searchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const Home = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchQuery) => {
    try {
      const movieResults = await searchMovies(searchQuery);
      setMovies(movieResults);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
