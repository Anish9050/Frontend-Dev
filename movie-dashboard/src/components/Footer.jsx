import React from "react";

function Footer({ year, developer }) {
  return (
    <footer className="bg-gray-800 text-white text-center p-3">
      © {year} {developer} | All Rights Reserved
    </footer>
  );
}

export default Footer;
