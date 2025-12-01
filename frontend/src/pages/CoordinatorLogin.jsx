import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";
import backBtn from "../assets/back-button.png";

export default function CoordinatorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // ⭐ abhi ke liye demo → direct panel par jaayega
    navigate("/dashboard/university/coordinator/panel");
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      {/* ⭐ BACK BUTTON */}
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full 
        shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,1)]
        transition-all duration-300 p-2 bg-[#0a0f1f]/60 backdrop-blur-md"
      />

      {/* ⭐ Background Stars + Glow */}
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

      {/* ⭐ Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md bg-[#0a0f1f]/90 backdrop-blur-xl p-10 rounded-3xl 
        border border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        
        <h2 className="text-3xl font-bold text-cyan-300 text-center">
          Coordinator Login Panel
        </h2>

        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Access your event dashboard
        </p>

        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl 
              text-white focus:outline-none focus:border-cyan-400"
              placeholder="Email Address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl 
                text-white focus:outline-none focus:border-cyan-400"
                placeholder="Password"
              />

              <img
                src={showPassword ? openEye : closeEye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 w-6 h-6 cursor-pointer select-none"
              />
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-cyan-600/30 text-cyan-300 text-xs rounded-lg border border-cyan-500/40">
              Role: Coordinator
            </span>

            <span className="text-gray-400 text-xs cursor-pointer hover:text-cyan-300 transition">
              Forgot Password?
            </span>
          </div>

          {/* ⭐ Login Button → Now with Navigation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogin}
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 
            shadow-[0_0_25px_rgba(0,200,255,0.7)] hover:shadow-[0_0_35px_rgba(0,200,255,1)]
            transition-all duration-300"
          >
            Login
          </motion.button>
        </div>

        {/* ⭐ Signup Redirect */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          New Coordinator?{" "}
          <Link
            to="/dashboard/university/coordinator/signup"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all"
          >
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}





