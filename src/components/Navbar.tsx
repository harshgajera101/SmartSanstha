import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white shadow-md">
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png"
          alt="SmartSanstha Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-bold">SmartSanstha</span>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link to="/learn" className="hover:text-yellow-300 transition">
          Learn
        </Link>
        <Link to="/games" className="hover:text-yellow-300 transition">
          Games
        </Link>
        <Link to="/quiz" className="hover:text-yellow-300 transition">
          Quiz
        </Link>
        <Link to="/chatbot" className="hover:text-yellow-300 transition">
          AI Chatbot
        </Link>
        <Link to="/dashboard" className="hover:text-yellow-300 transition">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
