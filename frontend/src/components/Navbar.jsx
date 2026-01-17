import React from "react";
import { motion } from "framer-motion";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("studentToken");

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/login");
    window.location.reload();
  };

  const navItem =
    "relative font-['Comic_Neue'] text-white font-bold text-[20px] uppercase tracking-wide cursor-pointer transition-all duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:!text-cyan-400 hover:after:w-full";

  const activeNav = "!text-cyan-400 after:w-full";

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#020617]/70 backdrop-blur-xl py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* 🔥 Neon Logo */}
        <Link to="/" className="flex items-center">
          <svg width="360" height="70" viewBox="0 0 360 70" overflow="visible">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <text
              x="15%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Orbitron"
              fontSize="38"
              fontWeight="700"
              letterSpacing="3"
              fill="white"
              stroke="url(#neonGradient)"
              strokeWidth="3"
              filter="url(#neonGlow)"
            >
              AUTHENTRACK
            </text>
          </svg>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10">
          <li onClick={() => scrollTo("home")} className={navItem}>Home</li>
          <li onClick={() => scrollTo("features")} className={navItem}>Features</li>
          <li onClick={() => scrollTo("how")} className={navItem}>How it works</li>

          <li>
            <NavLink to="/dashboard" className={({ isActive }) => `${navItem} ${isActive ? activeNav : ""}`}>
              Dashboard
            </NavLink>
          </li>

          <li onClick={() => scrollTo("team")} className={navItem}>Contact</li>
        </ul>

        {!isLoggedIn ? (
          <motion.button whileHover={{ scale: 1.05 }} className="px-5 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/20">
            <Link to="/login">Login</Link>
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout} className="px-5 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/20">
            Logout
          </motion.button>
        )}
      </div>
    </nav>
  );
}