import React, { useEffect } from "react";
import useStore from "../stores/store";
import MovieCard from "./MovieCard";

const FavoritesList = () => {
  const { favorites } = useStore();
  const { clearSearch } = useStore();

  useEffect(() => {
    clearSearch();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
