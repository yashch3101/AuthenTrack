import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backBtn from "../assets/back-button.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://authentrack-backend.onrender.com/api/student/auth/signup",
        {
          fullName: formData["Full Name"],
          email: formData["Email Address"],
          mobile: formData["Mobile Number"],
          password: formData["Password"],
          confirmPassword: formData["Confirm Password"],
        }
      );

      alert("Signup Successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      <motion.img
        src={backBtn}
        onClick={() => navigate("/", { replace: true })}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full p-2 bg-[#0a0f1f]/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,1)] transition-all duration-300"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md bg-[#0a0f1f]/90 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Create an Account
        </h2>

        <p className="text-gray-400 text-center text-sm mt-2 mb-8">
          Join the AI-powered exam monitoring system.
        </p>

        <div className="space-y-5">

          <input type="text" placeholder="Full Name" onChange={handleChange}
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30  rounded-xl text-white focus:outline-none focus:border-cyan-400" />

          <input type="email" placeholder="Email Address" onChange={handleChange}
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30  rounded-xl text-white focus:outline-none focus:border-cyan-400" />

          <input type="tel" placeholder="Mobile Number" onChange={handleChange}
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30  rounded-xl text-white focus:outline-none focus:border-cyan-400" />

          <div className="flex gap-3">
            <input type="password" placeholder="Password" onChange={handleChange}
              className="w-1/2 p-3 bg-[#0a0f1f] border border-cyan-500/30  rounded-xl text-white focus:outline-none focus:border-cyan-400" />

            <input type="password" placeholder="Confirm Password" onChange={handleChange}
              className="w-1/2 p-3 bg-[#0a0f1f] border border-cyan-500/30  rounded-xl text-white focus:outline-none focus:border-cyan-400" />
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1 accent-cyan-500" />
            <p className="text-gray-400 text-sm">
              I agree to the{" "}
              <span className="text-cyan-400 cursor-pointer">Terms of Service</span>{" "}
              &{" "}
              <span className="text-cyan-400 cursor-pointer">Privacy Policy</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSignup}
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,200,255,0.7)] hover:shadow-[0_0_35px_rgba(0,200,255,1)] transition-all duration-300"
          >
            Create Account
          </motion.button>

        </div>

        <p className="text-center mt-8 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 font-semibold transition-all duration-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}