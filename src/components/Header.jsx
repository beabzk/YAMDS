import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, X } from "lucide-react";

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchExpanded(false);
    }
  };

  return (
    <header className="bg-accent text-background py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        YAMDS
      </Link>
      <div className="flex items-center space-x-4">
        <div
          className={`relative ${
            isSearchExpanded ? "w-full md:w-auto" : "w-auto"
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-secondary text-background placeholder-background/70 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary ${
                isSearchExpanded ? "w-full" : "w-0 md:w-auto"
              } transition-all duration-300`}
            />
            <button
              type="button"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden ml-2"
            >
              {isSearchExpanded ? <X size={24} /> : <Search size={24} />}
            </button>
          </form>
        </div>
        <Link
          to="/favorites"
          className="text-background hover:text-background/70"
        >
          <Heart size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
