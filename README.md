# Movie Explorer

Aplicación web para explorar películas populares y realizar búsquedas por título usando The Movie Database API (TMDb).

## Resumen

Movie Explorer es una SPA desarrollada con React y Vite enfocada en una experiencia de consulta rápida, visual y responsive. El proyecto incluye manejo de estados de carga y error, componentes reutilizables y una base de estilos moderna con enfoque en legibilidad y jerarquía visual.

## Funcionalidades

- Consulta inicial de películas populares.
- Búsqueda por título en tiempo real a través de TMDb.
- Tarjetas con póster, año de lanzamiento, calificación y resumen.
- Estados de interfaz para carga, error y resultados vacíos.
- Diseño responsive para escritorio, tablet y móvil.
- Estructura de componentes clara y mantenible.

## Tecnologías

- React 19
- Vite 7
- JavaScript (ES Modules)
- CSS modular por componente
- ESLint 9

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- API Key de TMDb


## Estructura del proyecto

```text
src/
	App.jsx
	App.css
	index.css
	main.jsx
	components/
		MovieCard.jsx
		SearchBar.jsx
		styles/
			MovieCard.css
			SearchBar.css
public/
```

## Arquitectura y decisiones

- Separación de responsabilidades entre vista principal y componentes de dominio.
- Consumo de API centralizado en la vista principal.
- Propagación de datos mediante props explícitas.
- Estilos organizados por alcance: global, layout y componente.
- Uso de JSDoc para documentar componentes y props en español.

## Accesibilidad

- Uso de elementos semánticos (header, section, article).
- Etiquetas asociadas a campos de formulario.
- Regiones con aria-live para comunicar cambios de estado.
- Contrastes y tamaños de texto orientados a lectura cómoda.


## Autor

Camilo Sánchez

