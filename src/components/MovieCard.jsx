import "./styles/MovieCard.css";

export default function MovieCard({ movie }) {
  const imagePath = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
<div className="movie-card">
  <img src={imagePath} alt={movie.title} />
  <div className="movie-info">
    <h3>{movie.title}</h3>
    <p>⭐ {movie.vote_average}</p>
  </div>
</div>
  );
}
