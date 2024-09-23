# YAMDS - Yet Another Movie Database Searcher

YAMDS (Yet Another Movie Database Searcher) is a movie search application built with React, Axios, and Tailwind CSS. It allows users to search for movies, view trending films, and check out a "Developer's Pick" section. The movie data is fetched from [TMDb API](https://developers.themoviedb.org/3).

## Features

- **Movie Search**: Users can search for movies by title and get a list of results.
- **Trending Movies**: Displays trending movies.
- **Developer's Pick**: A manually curated list of selected movies featured on the homepage.
- **Movie Details**: View more information about each movie, including plot summary, cast, genres, and ratings.

## Tech Stack

- **React**: Frontend framework used for building the UI.
- **Axios**: Used for fetching data from TMDb API.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **TMDb API**: The source for movie data.

<!-- ## Live Demo

[Click here to see the live demo](#)

## Screenshots

![YAMDS Home Page](./screenshots/home-page.png)
![Movie Search](./screenshots/movie-search.png)
![Movie Details](./screenshots/movie-details.png) -->

## API Integration

This app uses the [TMDb API](https://www.themoviedb.org/documentation/api) to fetch movie data. You will need to sign up for a free API key to use TMDb.

In the project, API calls are handled via `Axios` and stored in the `src/services/api.js` file.

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/beabzk/yamds.git>
cd yamds
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDb API key:

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open <http://localhost:5173> to view the application.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
