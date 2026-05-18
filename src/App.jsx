import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

// Configuracion base de la API de TMDb.
const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "05cec95783888bef673c8e68bcf9d6c8";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastQuery, setLastQuery] = useState("populares");

  /**
   * Obtiene peliculas desde TMDb por tipo de consulta.
   * @param {Object} options
   * @param {string} [options.endpoint] Endpoint directo de la API.
   * @param {string} [options.query] Texto de busqueda de peliculas.
   */
  const fetchMovies = async ({ endpoint, query } = {}) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const url = endpoint
        ? `${API_URL}${endpoint}`
        : `${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("No fue posible conectar con el servicio de peliculas.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setMovies([]);
      setErrorMessage(error.message || "Se produjo un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  // Carga inicial de peliculas populares.
  useEffect(() => {
    fetchMovies({ endpoint: `/movie/popular?api_key=${API_KEY}&language=es-ES` });
  }, []);

  // Ejecuta la busqueda manual desde la barra.
  const handleSearch = (query) => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    setLastQuery(cleanQuery);
    fetchMovies({ query: cleanQuery });
  };

  // Restablece la vista de peliculas populares.
  const handleReset = () => {
    setLastQuery("populares");
    fetchMovies({ endpoint: `/movie/popular?api_key=${API_KEY}&language=es-ES` });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <p className="app-kicker">Catalogo de cine</p>
        <h1 className="app-title">Movie Explorer</h1>
        <p className="app-description">
          Busca titulos, explora tendencias y consulta calificaciones de peliculas en tiempo real.
        </p>
      </header>

      <section className="search-wrapper" aria-label="Buscador de peliculas">
        <SearchBar onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />
      </section>

      <section className="results-meta" aria-live="polite">
        <p>
          Mostrando resultados de: <strong>{lastQuery}</strong>
        </p>
      </section>

      {isLoading ? (
        <p className="status-message">Cargando peliculas...</p>
      ) : errorMessage ? (
        <p className="status-message error">{errorMessage}</p>
      ) : movies.length > 0 ? (
        <section className="movies-grid" aria-label="Resultados de peliculas">
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </section>
      ) : (
        <p className="status-message">No se encontraron resultados para tu busqueda.</p>
      )}
    </div>
  );
}

export default App;
