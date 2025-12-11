import { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieSearch.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchMovies(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searchMovies(e);
    }
  }

  return (
    <div className="movie-search">
      <h1>Movie Search</h1>

      <form onSubmit={searchMovies} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <div className="loading">Loading movies...</div>}

      {!loading && hasSearched && movies.length === 0 && (
        <p className="no-results">No movies found for "{query}"</p>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <Link
            to={`/medium/movie/${movie.id}`}
            key={movie.id}
            className="movie-card"
          >
            <div className="movie-poster">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </p>
              <div className="movie-rating">
                <span className="star">★</span>
                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
