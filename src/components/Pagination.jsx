import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState("");
  const navigate = useNavigate();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    // Calculate the start and end pages for pagination
    // startPage is set to the maximum of 1 or (currentPage - half of maxVisiblePages)
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    // endPage is set to the minimum of totalPages or (startPage + maxVisiblePages - 1)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if the number of visible pages is less than maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add last page and ellipsis if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    // Map page numbers to list items
    return pageNumbers.map((number, index) => (
      <li key={index} className="inline-block mx-1">
        {number === "..." ? (
          <span className="px-3 py-2">...</span>
        ) : (
          <Link
            to={`/page/${number}`}
            className={`px-3 py-2 rounded ${
              number === currentPage
                ? "bg-primary text-background"
                : "bg-secondary text-background hover:bg-accent"
            }`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(number);
            }}
          >
            {number}
          </Link>
        )}
      </li>
    ));
  };

  // Handle input change for the page number input
  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  // Handle form submission for page number input
  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputPage("");
    }
  };

  return (
    <div className="block mt-8">
      <ul className="flex justify-center">{renderPageNumbers()}</ul>
      <form onSubmit={handleSubmit} className="ml-4 mt-4 justify-center flex">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          className="w-16 px-2 py-1 border rounded text-text bg-background"
          placeholder="Page"
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 bg-primary text-background rounded hover:bg-accent"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default Pagination;
