import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState("");
  const navigate = useNavigate();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

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

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputPage("");
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <ul className="flex">{renderPageNumbers()}</ul>
      <form onSubmit={handleSubmit} className="ml-4">
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
