import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../stores/store";
import { Heart, Star, Calendar } from "lucide-react";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useStore();
  const favorite = isFavorite(movie.id);

  // Handle the favorite toggle button click
  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent navigating to movie details
    if (favorite) {
      removeFavorite(movie.id); // Remove from favorites if already a favorite
    } else {
      addFavorite(movie); // Add to favorites if not already a favorite
    }
  };

  return (
    <div
      className="movie-card relative bg-background rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative aspect-w-2 aspect-h-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 dark:text-white">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 mr-1" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFavoriteToggle} // Handle favorite toggle on button click
        className={`absolute top-2 right-2 p-2 rounded-full transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0" // Show button only when hovered
        } ${favorite ? "bg-red-500" : "bg-white"}`} // Change button color based on favorite status
      >
        <Heart
          size={20}
          fill={favorite ? "white" : "none"}
          color={favorite ? "white" : "black"}
        />
      </button>
    </div>
  );
};

export default MovieCard;
