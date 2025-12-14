import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {

  const isLoggedIn =
    localStorage.getItem("studentToken")

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#020617]/70 backdrop-blur-xl border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-semibold text-cyan-400 tracking-wide cursor-pointer">
            AuthenTrack
          </h1>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-gray-300 text-sm">
          <li className="cursor-pointer hover:text-cyan-300 transition">
            <Link to="/">Home</Link>
          </li>

          <li className="cursor-pointer hover:text-cyan-300 transition">
            <Link to="/features">Features</Link>
          </li>

          <li className="cursor-pointer hover:text-cyan-300 transition">
            <Link to="/how-it-works">How it works</Link>
          </li>

          <li className="cursor-pointer hover:text-cyan-300 transition">
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li className="cursor-pointer hover:text-cyan-300 transition">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Login Button */}
        {!isLoggedIn && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-5 py-2 text-sm border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition"
        >
          <Link to="/login">Login</Link>
        </motion.button>
        )}

      </div>
    </nav>
  );
}


