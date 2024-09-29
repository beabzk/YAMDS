import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrendingMovies } from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

const TrendingPage = () => {
  const { page: urlPage } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const pageNumber = parseInt(urlPage, 10) || 1;
    setCurrentPage(pageNumber);
    fetchTrendingMovies(pageNumber);
  }, [urlPage]);

  const fetchTrendingMovies = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTrendingMovies(page);
      setMovies(result.results || []);
      setTotalPages(result.total_pages || 1);
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
      setError("Failed to fetch trending movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    navigate(`/trending/${newPage}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default TrendingPage;
