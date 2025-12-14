import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

import neonEarth from "../assets/edu.png";

export default function Hero() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("studentToken");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full pb-24 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24"
    >
      {/* LEFT CONTENT */}
      <div className="max-w-xl md:pt-10" data-aos="fade-right">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="text-white">Smart Event</span>
          <br />
          <span className="text-[#14F1F9]">Attendance System</span>
        </h1>

        <p className="text-gray-400 mt-5 text-lg leading-relaxed">
          AI-powered face verification & location-based secure attendance
        </p>

        {/* BULLET LIST */}
        <ul className="mt-7 space-y-3 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="text-[#14F1F9] text-xl">✔</span>
            Face Recognition
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[#14F1F9] text-xl">✔</span>
            Location based Approval
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[#14F1F9] text-xl">✔</span>
            Director Digital Signing
          </li>
        </ul>

        {/* BUTTONS */}
        <div className="mt-10 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg font-semibold bg-[#14F1F9] text-black hover:opacity-90 transition"
            onClick={() => navigate("/register")}
          >
            Get Started
          </motion.button>

          {!isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg font-semibold border border-[#14F1F9] text-[#14F1F9] hover:bg-[#14F1F9] hover:text-black transition"
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>
          )}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        data-aos="fade-left"
        className="flex justify-center"
      >
        <img
          src={neonEarth}
          alt="Hero Image"
          className="w-[420px] md:w-[550px] lg:w-[600px] object-contain"
        />
      </motion.div>
    </motion.div>
  );
}