import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import FavoritesList from "./components/FavoritesList";
import TrendingPage from "./pages/TrendingPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/trending/:page" element={<TrendingPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
