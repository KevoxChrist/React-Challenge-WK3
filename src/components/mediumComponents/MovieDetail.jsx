import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      setLoading(true);
      setError(null);

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
        ]);

        if (!movieResponse.ok) {
          throw new Error("Movie not found");
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail">
        <Link to="/medium" className="back-link">
          ← Back to Search
        </Link>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const director = credits?.crew?.find((person) => person.job === "Director");
  const cast = credits?.cast?.slice(0, 8) || [];

  return (
    <div className="movie-detail">
      {movie.backdrop_path && (
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
          }}
        />
      )}

      <div className="detail-content">
        <Link to="/medium" className="back-link">
          ← Back to Search
        </Link>

        <div className="movie-header">
          <div className="poster-container">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="detail-poster"
              />
            ) : (
              <div className="no-poster-large">No Image</div>
            )}
          </div>

          <div className="movie-main-info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            <div className="meta-info">
              <span className="year">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
              {movie.runtime > 0 && (
                <span className="runtime">{movie.runtime} min</span>
              )}
              <span className="rating">
                <span className="star">★</span> {movie.vote_average?.toFixed(1)}
                <span className="vote-count">
                  ({movie.vote_count?.toLocaleString()} votes)
                </span>
              </span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {director && (
              <p className="director">
                <strong>Director:</strong> {director.name}
              </p>
            )}

            {movie.overview && (
              <div className="overview">
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            )}
          </div>
        </div>

        {cast.length > 0 && (
          <div className="cast-section">
            <h3>Top Cast</h3>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-card">
                  {actor.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="cast-photo"
                    />
                  ) : (
                    <div className="no-photo">No Photo</div>
                  )}
                  <div className="cast-info">
                    <p className="actor-name">{actor.name}</p>
                    <p className="character">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="additional-info">
          {movie.budget > 0 && (
            <p>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </p>
          )}
          {movie.revenue > 0 && (
            <p>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </p>
          )}
          {movie.production_companies?.length > 0 && (
            <p>
              <strong>Production:</strong>{" "}
              {movie.production_companies.map((c) => c.name).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
