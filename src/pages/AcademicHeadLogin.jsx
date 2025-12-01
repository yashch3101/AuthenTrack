import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";
import backBtn from "../assets/back-button.png";

export default function AcademicHeadLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);

  // Neon Shield Icon (until you replace with PNG)
  const ShieldIcon = ({ className = "w-16 h-16" }) => (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="gA" x1="0" x2="1">
          <stop offset="0" stopColor="#ff3ecb" />
          <stop offset="0.55" stopColor="#7b5cff" />
          <stop offset="1" stopColor="#00eaff" />
        </linearGradient>
      </defs>
      <path
        d="M32 3l19 7v12c0 16-9 24-19 28-10-4-19-12-19-28V10l19-7z"
        stroke="url(#gA)"
        strokeWidth="1.6"
        fill="rgba(255,255,255,0.02)"
      />
      <path
        d="M22 28c2.5 3 6 5 10 5s7.5-2 10-5"
        stroke="url(#gA)"
        strokeWidth="1.2"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      {/* ⭐ BACK BUTTON (same as Coordinator UI) */}
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.1 }}
        className="
          absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full 
          shadow-[0_0_20px_rgba(0,255,255,0.6)]
          hover:shadow-[0_0_35px_rgba(0,255,255,1)]
          transition-all duration-300 p-2
          bg-[#0a0f1f]/60 backdrop-blur-md
        "
      />

      {/* ⭐ BACKGROUND — EXACT SAME AS COORDINATOR */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(110)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: "rgba(0,150,255,0.9)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[140px]"></div>
        </div>
      </div>

      {/* ⭐ OUTER NEON WRAPPER + STRONG GLOW */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          relative w-full max-w-md rounded-[30px] p-[4px]
          shadow-[0_0_55px_rgba(255,0,221,0.4),0_0_80px_rgba(0,238,255,0.4)]
        "
        style={{
          background:
            "linear-gradient(90deg,#ff3ecb,#7b5cff,#00eaff,#00d4ff)",
        }}
      >

        {/* Inner Panel */}
        <div
          className="bg-[#071025]/90 rounded-2xl px-8 py-10 backdrop-blur-xl"
          style={{
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: `
              inset 0 0 35px rgba(0,0,0,0.6),
              0 0 40px rgba(0, 255, 255, 0.25)
            `,
          }}
        >

          {/* Heading + icon */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="p-2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,62,203,0.15), rgba(0,234,255,0.15))",
                boxShadow:
                  "0 6px 40px rgba(0,234,255,0.25), inset 0 0 20px rgba(255,62,203,0.2)",
              }}
            >
              <ShieldIcon className="w-14 h-14" />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-white">
                Academic Head Login
              </h1>
              <p className="text-gray-400 text-sm">
                Authorized personnel only
              </p>
            </div>
          </div>

          {/* ⭐ FORM */}
          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="
                  w-full p-3 rounded-lg bg-transparent
                  border border-cyan-500/30 text-white 
                  placeholder:text-gray-400 focus:border-cyan-400
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="
                    w-full p-3 rounded-lg bg-transparent
                    border border-cyan-500/30 text-white 
                    placeholder:text-gray-400 focus:border-cyan-400
                  "
                />
                <img
                  src={showPassword ? openEye : closeEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 w-6 h-6 cursor-pointer select-none"
                />
              </div>
            </div>

            {/* Access Code */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                Secret Access Code
              </label>
              <div className="relative">
                <input
                  type={showAccessCode ? "text" : "password"}
                  placeholder="Secret Access Code"
                  className="
                    w-full p-3 rounded-lg bg-transparent
                    border border-cyan-500/30 text-white 
                    placeholder:text-gray-400 focus:border-cyan-400
                  "
                />
                <img
                  src={showAccessCode ? openEye : closeEye}
                  onClick={() => setShowAccessCode(!showAccessCode)}
                  className="absolute right-4 top-3 w-6 h-6 cursor-pointer select-none"
                />
              </div>
            </div>

            {/* Role + Forgot */}
            <div className="flex items-center justify-between">
              <span className="
                px-3 py-1 bg-cyan-600/30 text-cyan-300 text-xs 
                rounded-lg border border-cyan-500/40
              ">
                Role: Academic Head
              </span>
              <span className="text-gray-400 text-xs cursor-pointer hover:text-cyan-300 transition">
                Forgot Password?
              </span>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="
                w-full py-3 mt-2 rounded-xl font-semibold text-white
                bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 
                shadow-[0_0_35px_rgba(255,0,200,0.8)]
                hover:shadow-[0_0_50px_rgba(0,200,255,1)]
                transition-all duration-300
              "
            >
              Login as Academic Head
            </motion.button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            New Academic Head?{" "}
            <Link
              to="/dashboard/university/academic-head/signup"
              className="text-cyan-300 hover:text-cyan-200"
            >
              Request Access
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}


