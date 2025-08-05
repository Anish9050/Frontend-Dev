import React from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

function appassign() {
  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: "8.8" },
    { title: "The Dark Knight", genre: "Action", rating: "9.0" },
    { title: "Interstellar", genre: "Sci-Fi", rating: "8.6" },
    { title: "Parasite", genre: "Thriller", rating: "8.6" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar appName="🎬 Movie Dashboard" />
      <main className="flex-grow container mx-auto p-6">
        <MovieList movies={movies} />
      </main>
      <Footer year={2025} developer="Your Name" />
    </div>
  );
}

export default appassign;
