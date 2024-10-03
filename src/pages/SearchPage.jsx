import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import useStore from "../stores/store";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    searchResults,
    setSearchQuery,
    setSearchResults,
    setCurrentPage,
    currentPage,
    totalPages,
    setTotalPages,
  } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const urlQuery = queryParams.get("query") || "";
  const urlPage = parseInt(queryParams.get("page"), 10) || 1;

  // Effect to handle search when URL parameters change
  useEffect(() => {
    if (
      urlQuery !== searchQuery ||
      urlPage !== currentPage ||
      searchResults.length === 0
    ) {
      handleSearch(urlQuery, urlPage);
    }
  }, [urlQuery, urlPage]);

  // Function to handle movie search
  const handleSearch = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query, page);
      setSearchResults(result.results || []);
      setTotalPages(result.total_pages || 1);
      setCurrentPage(page);
      setSearchQuery(query);
      // Update the URL with the new query and page
      navigate(`/search?query=${encodeURIComponent(query)}&page=${page}`);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    handleSearch(searchQuery, newPage);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <LoadingSpinner size={48} className="mt-8" />
      ) : (
        <>
          <MovieList movies={searchResults} />
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

export default SearchPage;
