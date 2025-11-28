import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function HeroLeft() {
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  // ⭐ Toast only when user returns from OTP
  useEffect(() => {
    if (location.state?.enrolled) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, []);

  return (
    <div className="text-white space-y-6 max-w-xl relative" data-aos="fade-up">

      {/* ⭐ Success Toast */}
      {showToast && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="
            absolute -top-14 left-0 right-0 mx-auto w-fit 
            px-6 py-3 
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-white font-semibold rounded-xl 
            shadow-[0_0_20px_rgba(0,255,255,0.6)]
          "
        >
          You have been successfully enrolled!
        </motion.div>
      )}

      {/* ⭐ Tagline */}
      <div className="flex items-center gap-3">
        <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 text-xs rounded-full border border-cyan-400/30">
          NEW UPDATE
        </span>
        <span className="text-xs text-gray-400 tracking-wider">
          AI EXAM MONITORING
        </span>
      </div>

      {/* ⭐ Gradient Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          AI-Powered Exam Leak Detection
        </span>
        <br />
        Platform
      </h1>

      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        Real-time monitoring of public channels. AI leak prediction and insight alerts
        for universities.
      </p>

      {/* ⭐ Buttons */}
      <div className="flex gap-4 pt-2">

        {/* Scan Now */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          className="
            px-6 py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600
            shadow-[0_0_25px_rgba(0,200,255,0.6)]
            hover:shadow-[0_0_35px_rgba(0,200,255,1)]
            transition-all duration-300
          "
        >
          <Link to="/scan">Scan Now</Link>
        </motion.button>

        {/* Demo */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          className="
            px-6 py-3 rounded-lg font-semibold text-gray-200
            border border-cyan-400/40
            hover:border-cyan-400 hover:text-white
            transition-all
            shadow-[0_0_15px_rgba(0,200,255,0.3)]
          "
        >
          <Link to="/demo">Watch Demo</Link>
        </motion.button>
      </div>

      {/* ⭐ FEATURES WITH EXACT SVG ICONS */}
      <div className="flex flex-wrap gap-8 pt-6 text-sm text-gray-300">

        {/* Real-time Monitoring */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_cyan]">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Real-time Monitoring
        </div>

        {/* AI Leak Prediction */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_cyan]">
            <polygon points="12 2 22 20 2 20" />
          </svg>
          AI Leak Prediction
        </div>

        {/* Dashboard Alerts */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_cyan]">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          Dashboard Alerts
        </div>

      </div>
    </div>
  );
}





