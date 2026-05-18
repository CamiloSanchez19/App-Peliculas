import { useState } from "react";
import "./styles/SearchBar.css";

/**
 * Barra de busqueda reutilizable para consultar peliculas por titulo.
 * @param {{ onSearch: (query: string) => void, onReset: () => void, isLoading: boolean }} props
 */
export default function SearchBar({ onSearch, onReset, isLoading }) {
  const [query, setQuery] = useState("");

  // Envia la consulta al componente padre solo si existe texto valido.
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  // Limpia el campo y restablece la lista inicial.
  const handleClear = () => {
    setQuery("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label htmlFor="movie-query" className="sr-only">
        Buscar pelicula por titulo
      </label>
      <input
        id="movie-query"
        type="text"
        placeholder="Buscar pelicula..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" disabled={isLoading}>
        Buscar
      </button>
      <button type="button" className="secondary" onClick={handleClear} disabled={isLoading}>
        Ver populares
      </button>
    </form>
  );
}
