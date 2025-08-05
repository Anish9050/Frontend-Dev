import React from "react";

function MovieCard({ title, genre, rating }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{genre}</p>
      <p className="text-yellow-500 font-bold">⭐ {rating}</p>
    </div>
  );
}

export default MovieCard;
