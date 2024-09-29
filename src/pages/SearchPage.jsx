import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import useStore from "../stores/store";

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

  const queryParams = new URLSearchParams(location.search);
  const urlQuery = queryParams.get("query") || "";
  const urlPage = parseInt(queryParams.get("page"), 10) || 1;

  useEffect(() => {
    if (
      urlQuery !== searchQuery ||
      urlPage !== currentPage ||
      searchResults.length === 0
    ) {
      handleSearch(urlQuery, urlPage);
    }
  }, [urlQuery, urlPage]);

  const handleSearch = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query, page);
      setSearchResults(result.results || []);
      setTotalPages(result.total_pages || 1);
      setCurrentPage(page);
      setSearchQuery(query);
      navigate(`/search?query=${encodeURIComponent(query)}&page=${page}`);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(searchQuery, newPage);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <SearchBar
        onSearch={(newQuery) => handleSearch(newQuery, 1)}
        initialQuery={searchQuery}
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
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
