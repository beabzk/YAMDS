import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFavoritesStore from "../stores/favoritesStore";
import { Heart } from "lucide-react";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(movie.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Prevent navigating to movie details
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div
      className="movie-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </Link>
      {isHovered && (
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-opacity duration-300 ease-in-out"
        >
          <Heart
            size={24}
            fill={favorite ? "red" : "none"}
            color={favorite ? "red" : "black"}
          />
        </button>
      )}
    </div>
  );
};

export default MovieCard;
