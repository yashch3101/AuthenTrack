import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import backBtn from "../assets/back-button.png";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      {/* 🔙 Neon Back Button (FIXED) */}
      <motion.img
        src={backBtn}
        onClick={() => navigate("/", { replace: true })}   // ⭐ FIXED
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer 
                   rounded-full p-2 bg-[#0a0f1f]/60 backdrop-blur-md
                   shadow-[0_0_20px_rgba(0,255,255,0.6)]
                   hover:shadow-[0_0_35px_rgba(0,255,255,1)]
                   transition-all duration-300"
      />

      {/* 🌫 Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px]" />
        </div>
      </div>

      {/* 🔷 Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md bg-[#0a0f1f]/90 backdrop-blur-xl 
                   p-10 rounded-3xl border border-white/10 
                   shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Create an Account
        </h2>

        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Join the AI-powered exam monitoring system.
        </p>

        {/* ⭐ Input Fields */}
        <div className="space-y-5">

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
                       rounded-xl text-white focus:outline-none focus:border-cyan-400"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
                       rounded-xl text-white focus:outline-none focus:border-cyan-400"
          />

          {/* Mobile */}
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
                       rounded-xl text-white focus:outline-none focus:border-cyan-400"
          />

          {/* Passwords */}
          <div className="flex gap-3">
            <input
              type="password"
              placeholder="Password"
              className="w-1/2 p-3 bg-[#0a0f1f] border border-cyan-500/30 
                         rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-1/2 p-3 bg-[#0a0f1f] border border-cyan-500/30 
                         rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-cyan-500"
            />
            <p className="text-gray-400 text-sm">
              I agree to the{" "}
              <span className="text-cyan-400 cursor-pointer">Terms of Service</span>{" "}
              &{" "}
              <span className="text-cyan-400 cursor-pointer">Privacy Policy</span>
            </p>
          </div>

          {/* ⭐ Create Account */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/verify-otp", { replace: true })}   // ⭐ FIXED
            className="
              w-full py-3 mt-2 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 
              shadow-[0_0_25px_rgba(0,200,255,0.7)]
              hover:shadow-[0_0_35px_rgba(0,200,255,1)]
              transition-all duration-300
            "
          >
            Create Account
          </motion.button>

        </div>

        {/* ⭐ Footer */}
        <p className="text-center mt-8 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 font-semibold transition-all duration-300"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}







