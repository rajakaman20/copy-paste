import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          PasteBinX
        </Link>
        <div className="space-x-6 text-lg">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/Paste" className="text-gray-700 hover:text-blue-600 transition">
            All Pastes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
