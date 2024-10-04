import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../services/api";
import useStore from "../stores/store";
import { Heart, Star, Calendar, Clock, Film, Image } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const { searchQuery, currentPage, addFavorite, removeFavorite, isFavorite } =
    useStore(); // Custom hook to access global store
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch movie details, credits, and videos concurrently
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
        ]);
        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData.results);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleGoBack = () => {
    // Navigate back to the search results or home page
    if (searchQuery) {
      navigate(
        `/search?query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
      );
    } else {
      navigate("/");
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (isLoading) return <LoadingSpinner size={48} className="mt-8" />;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
    );
  if (!movie)
    return <div className="container mx-auto px-4 py-8">No movie found</div>;

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        &larr; Back to {searchQuery ? "Search Results" : "Home"}
      </button>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <Image size={28} />
            </div>
          )}
        </div>

        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <button
              onClick={handleFavoriteToggle}
              className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-200"
            >
              <Heart
                size={24}
                fill={isFavorite(movie.id) ? "red" : "none"}
                color={isFavorite(movie.id) ? "red" : "black"}
              />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-500 ml-2">
              ({movie.vote_count} votes)
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Calendar className="mr-2" />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" />
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center">
              <Film className="mr-2" />
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            </div>
          </div>

          <p className="text-lg mb-4">{movie.overview}</p>

          {credits && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Top Cast</h2>
              <div className="flex flex-wrap gap-4">
                {credits.cast.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2">
                        <Image size={28} />
                      </div>
                    )}
                    <p className="font-semibold">{actor.name}</p>
                    <p className="text-sm text-gray-500">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {trailer && (
        // Display the trailer if available
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <div
            className="relative"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
