import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import backBtn from "../assets/back-button.png";
import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";

export default function CoordinatorSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
    idProof: null,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setForm({ ...form, idProof: e.target.files[0] });

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.idProof) {
      alert("Please upload ID Proof");
      return;
    }

    const fd = new FormData();
    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("department", form.department);
    fd.append("employeeId", form.employeeId);
    fd.append("password", form.password);
    fd.append("idProof", form.idProof);

    try {
      const res = await fetch(
        "https://authentrack-backend.onrender.com/api/coordinator/auth/register",
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup Failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Coordinator Account Created Successfully!");
      navigate("/dashboard/university/coordinator/login");
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full p-2 bg-[#0a0f1f]/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,1)] transition-all duration-300"
      />

      {/* STAR BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "rgba(0,200,255,0.9)",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg bg-[#0a0f1f]/90 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,180,255,0.4)]"
      >
        <h2 className="text-3xl font-bold text-cyan-300 text-center">
          Coordinator Registration
        </h2>

        <div className="space-y-5 mt-10">
          {/* TEXT INPUTS */}
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          <input
            type="text"
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
          />

          {/* FILE UPLOAD SECTION */}
          <div className="grid grid-cols-2 gap-3">
            {/* Upload Button */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-cyan-500/40 rounded-xl bg-[#0a0f1f] p-5 flex flex-col items-center justify-center text-cyan-300 cursor-pointer hover:bg-cyan-500/10 transition"
            >
              <div className="text-xl mb-1">⬆</div>
              <p className="text-xs">Upload ID Proof</p>
            </div>

            {/* HIDDEN FILE INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFile}
              className="hidden"
            />

            {/* FILE NAME DISPLAY */}
            <div
              className="w-full border border-cyan-500/30 rounded-xl bg-[#0a0f1f] text-gray-400 p-3"
            >
              {form.idProof ? form.idProof.name : "Choose file"}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
            />
            <img
              src={showPassword ? openEye : closeEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 w-6 h-6 cursor-pointer"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-[#0a0f1f] border border-cyan-500/30 rounded-xl text-white focus:border-cyan-400 outline-none"
            />
            <img
              src={showConfirmPassword ? openEye : closeEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3 w-6 h-6 cursor-pointer"
            />
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmit}
            className="w-full py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 shadow-[0_0_25px_rgba(0,200,255,0.7)] hover:shadow-[0_0_35px_rgba(0,200,255,1)] transition-all duration-300"
          >
            Create Coordinator Account
          </motion.button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/dashboard/university/coordinator/login"
            className="text-cyan-300"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}