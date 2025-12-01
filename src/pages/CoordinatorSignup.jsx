import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import backBtn from "../assets/back-button.png";
import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";

export default function CoordinatorSignup() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ⭐ File Input Ref (ID Proof)
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      {/* ⭐ Back Button */}
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.1 }}
        className="
          absolute top-6 left-6 z-50
          w-12 h-12 cursor-pointer 
          rounded-full p-2 
          bg-[#0a0f1f]/60 backdrop-blur-md
          shadow-[0_0_20px_rgba(0,255,255,0.6)]
          hover:shadow-[0_0_35px_rgba(0,255,255,1)]
          transition-all duration-300
        "
      />

      {/* ⭐ Stars + Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "rgba(0,200,255,0.9)",
              filter: "blur(1px)"
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px]"></div>
        </div>
      </div>

      {/* ⭐ SIGNUP CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg bg-[#0a0f1f]/90 backdrop-blur-xl
        p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-cyan-300 text-center">
          Coordinator Registration
        </h2>

        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Create your access to manage events and attendance
        </p>

        {/* FORM */}
        <div className="space-y-5">

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
            rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
            rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          {/* Department */}
          <input
            type="text"
            placeholder="Department"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
            rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          {/* Employee ID */}
          <input
            type="text"
            placeholder="Employee ID / Coordinator ID"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
            rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          {/* ⭐ Upload ID Proof */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Upload Box (Click → open file picker) */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-cyan-500/40 rounded-xl bg-[#0a0f1f] p-5 
              flex flex-col items-center justify-center text-cyan-300 cursor-pointer 
              hover:bg-cyan-500/10 transition"
            >
              <div className="text-xl mb-1">⬆</div>
              <p className="text-xs">Upload ID Proof</p>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
            />

            {/* Visible input box */}
            <input
              type="file"
              className="w-full border border-cyan-500/30 rounded-xl bg-[#0a0f1f] 
              text-gray-400 p-3 cursor-pointer"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
              rounded-xl text-white focus:border-cyan-400 outline-none"
            />
            <img
              src={showConfirmPassword ? openEye : closeEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3 w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 
              rounded-xl text-white focus:border-cyan-400 outline-none"
            />
            <img
              src={showPassword ? openEye : closeEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 
            shadow-[0_0_25px_rgba(0,200,255,0.7)]
            hover:shadow-[0_0_35px_rgba(0,200,255,1)]
            transition-all duration-300"
          >
            Create Coordinator Account
          </motion.button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/dashboard/university/coordinator/login" className="text-cyan-300">
            Login
          </Link>
        </p>

        <p className="text-center text-cyan-400 text-xs mt-3">
          Only authorized faculty members may register.
        </p>

      </motion.div>
    </div>
  );
}

