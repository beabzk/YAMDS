import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import useStore from "../stores/store";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const { searchQuery, currentPage } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleGoBack = () => {
    if (searchQuery) {
      navigate(
        `/search?query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
      );
    } else {
      navigate("/");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={handleGoBack}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        &larr; Back to {searchQuery ? "Search Results" : "Home"}
      </button>
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mb-4"
      />
      <p className="mb-2">
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className="mb-4">
        <strong>Overview:</strong> {movie.overview}
      </p>
    </div>
  );
};

export default MovieDetails;
