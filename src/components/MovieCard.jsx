import "./styles/MovieCard.css";

/**
 * Tarjeta de pelicula con poster, titulo, puntuacion y fecha.
 * @param {{ movie: { title: string, vote_average: number, poster_path: string, release_date: string, overview: string }, index: number }} props
 */
export default function MovieCard({ movie, index = 0 }) {
  const imagePath = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  // Normaliza campos opcionales para evitar valores vacios en pantalla.
  const score = Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "N/D";
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "Sin fecha";
  const overview = movie.overview?.trim() || "Sin descripcion disponible.";

  return (
    <article
      className="movie-card"
      aria-label={`Pelicula ${movie.title}`}
      style={{ "--stagger": `${Math.min(index, 18) * 45}ms` }}
    >
      <img src={imagePath} alt={`Poster de ${movie.title}`} loading="lazy" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          <span>{releaseYear}</span>
          <span>{score} / 10</span>
        </p>
        <p className="movie-overview">{overview}</p>
      </div>
    </article>
  );
}
