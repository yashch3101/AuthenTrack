import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";
import backBtn from "../assets/back-button.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://authentrack-backend.onrender.com/api/student/auth/login",
        { email, password }
      );

      localStorage.setItem("studentToken", res.data.token);

      alert("Login Successful ✔");

      navigate("/register", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      <motion.img
        src={backBtn}
        onClick={() => (window.location.href = "/")}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,1)] transition-all duration-300 p-2 bg-[#0a0f1f]/60 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md bg-[#0a0f1f]/90 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>

        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Login to continue your monitoring dashboard.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                placeholder="••••••••"
              />

              <img
                src={showPassword ? openEye : closeEye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 w-6 h-6 cursor-pointer select-none"
                alt="toggle password"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogin}
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,200,255,0.7)] hover:shadow-[0_0_35px_rgba(0,200,255,1)] transition-all duration-300"
          >
            Login
          </motion.button>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="!text-cyan-400 hover:!text-cyan-300 font-semibold transition-all duration-300 cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}