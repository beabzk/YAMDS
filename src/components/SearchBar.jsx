import React, { useState } from "react";

const SearchBar = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="border p-2 rounded text-text bg-background"
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-primary text-background rounded hover:bg-accent"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
