import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "05cec95783888bef673c8e68bcf9d6c8";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Carga inicial de películas populares
  useEffect(() => {
    fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Búsqueda
  const handleSearch = (query) => {
    if (!query.trim()) return;
    setLoading(true);
    fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🎬 Movie Explorer</h1>
      
      {/* 🔍 Barra de búsqueda */}
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 🔄 Estado de carga o contenido */}
      {loading ? (
        <p className="loading">Cargando películas...</p>
      ) : movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="loading">No se encontraron resultados</p>
      )}
    </div>
  );
}

export default App;
