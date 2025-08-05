import React from "react";

function Navbar({ appName }) {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">{appName}</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="px-3 py-1 rounded-lg text-black"
      />
    </nav>
  );
}

export default Navbar;
