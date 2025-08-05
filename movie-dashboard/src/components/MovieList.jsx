import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          genre={movie.genre}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}

export default MovieList;
