# YAMDS - Yet Another Movie Database Searcher

YAMDS (Yet Another Movie Database Searcher) is a movie search application built with React.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [API Integration](#api-integration)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Components](#components)
8. [State Management](#state-management)
9. [Styling](#styling)
10. [Deployment](#deployment)
11. [License](#license)

## Features

- **Movie Search**: Users can search for movies by title, with pagination.
- **Trending Movies**: Displays a curated list of currently trending movies.
- **Developer's Pick**: A manually curated list of selected movies featured on the homepage.
- **Movie Details**: Comprehensive information about each movie, including:
  - Plot summary
  - Cast and crew information
  - Genres
  - Ratings and vote count
  - Release date and runtime
  - Trailer (when available)
- **Favorites**: Users can mark movies as favorites and view their favorite list.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **React**: Frontend library for building the user interface.
- **Vite**: Build tool and development server.
- **Zustand**: State management library for managing global application state.
- **React Router**: For handling routing within the application.
- **Axios**: Promise-based HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TMDb API**: The Movie Database API for fetching movie data.
- **Lucide React**: Icon library for UI elements.

## Project Structure

```txt
yamds/
├── src/
│   ├── components/
│   │   ├── DarkModeToggle.jsx
│   │   ├── FavoritesList.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   └── Pagination.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── SearchPage.jsx
│   │   └── TrendingPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── stores/
│   │   └── store.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## API Integration

YAMDS integrates with the [TMDb API](https://www.themoviedb.org/documentation/api) to fetch movie data. API calls are handled via `Axios` and centralized in the `src/services/api.js` file. The main API functions include:

- `searchMovies`: Search for movies based on a query string.
- `getMovieDetails`: Fetch detailed information about a specific movie.
- `getTrendingMovies`: Retrieve a list of currently trending movies.
- `getMovieCredits`: Fetch cast and crew information for a movie.
- `getMovieVideos`: Retrieve video links (e.g., trailers) for a movie.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/beabzk/yamds.git
   cd yamds
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDb API key:

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open <http://localhost:5173> to view the application.

## Usage

- **Search**: Use the search bar in the header to look for movies.
- **Trending**: Click on "See all trending" on the homepage to view all trending movies.
- **Favorites**: Click the heart icon on a movie card to add/remove it from favorites.
- **Movie Details**: Click on a movie card to view detailed information about the movie.
- **Dark Mode**: Toggle the sun/moon icon in the header to switch between light and dark modes.

## Components

- `DarkModeToggle`: Allows users to switch between light and dark themes.
- `FavoritesList`: Displays the user's favorite movies.
- `Footer`: Contains attribution information.
- `Header`: Houses the navigation menu, search bar, and dark mode toggle.
- `LoadingSpinner`: Displayed during data fetching operations.
- `MovieCard`: Represents individual movie items in lists.
- `MovieList`: Renders a grid of MovieCard components.
- `Pagination`: Handles page navigation for search results and trending movies.

## State Management

Global state is managed using Zustand. The store (`src/stores/store.js`) handles:

- Search queries and results
- Favorite movies
- Dark mode preference
- Pagination state

## Styling

Tailwind CSS is used for styling, providing a utility-first approach to design. The `className` prop in components contains Tailwind utility classes for styling.

## Deployment

To deploy YAMDS on Vercel, follow these steps:

1. **Fork the Repository**: If you haven't already, fork the repository to your GitHub account.

2. **Sign Up / Log In to Vercel**: Go to [Vercel](https://vercel.com/) and sign up for an account or log in if you already have one.

3. **Import Project**:
   - Click on the "New Project" button.
   - Select "Import Git Repository".
   - Choose your forked repository from GitHub.

4. **Configure Project**:
   - During the import, Vercel will detect the framework (Vite) and set up the build and output settings automatically.
   - Ensure the build command is `npm run build` and the output directory is `dist`.

5. **Add Environment Variables**:
   - Go to the "Settings" tab of your project.
   - Under "Environment Variables", add your TMDb API key:

     ```plaintext
     VITE_TMDB_API_KEY=your_api_key_here
     ```

6. **Deploy**:
   - Click on the "Deploy" button to start the deployment process.
   - Vercel will build and deploy your project. Once completed, you will receive a live URL for your application.

7. **Visit Your Application**:
   - Open the provided URL to view your deployed YAMDS application.

For more detailed instructions, refer to the [Vercel documentation](https://vercel.com/docs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
