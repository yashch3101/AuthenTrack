import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import openEye from "../assets/open-eye.png";
import closeEye from "../assets/close-eye.png";
import backBtn from "../assets/back-button.png";

export default function AcademicHeadSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ⭐ Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secret, setSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!fullName || !email || !phone || !password || !confirm || !secret) {
      return alert("Please fill all fields");
    }

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("https://authentrack-backend.onrender.com/api/director/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          secretCode: secret,
        }),
      });

      const data = await res.json();
      console.log("DIRECTOR SIGNUP =>", data);

      if (data.message === "Director Registered Successfully") {
        alert("Account Created! Please login.");
        navigate("/dashboard/university/academic-head/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex items-center justify-center px-4">

      {/* BACK BUTTON */}
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

      {/* BACKGROUND STARS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(90)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1.5,
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: "rgba(0,180,255,0.9)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* CENTER BLUE BLUR */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full blur-[140px] bg-blue-600/25"></div>
      </div>

      {/* LEFT + RIGHT NEON LINES */}
      <div
        className="absolute left-[50%] -translate-x-[300px] top-0 h-full w-[6px] rounded-full"
        style={{
          background: "linear-gradient(#ff45d2,#7b5cff,#00eaff)",
          filter: "blur(4px)",
          opacity: 0.6,
        }}
      />

      <div
        className="absolute left-[50%] translate-x-[300px] top-0 h-full w-[6px] rounded-full"
        style={{
          background: "linear-gradient(#00eaff,#7b5cff,#ff45d2)",
          filter: "blur(4px)",
          opacity: 0.6,
        }}
      />

      {/* OUTER BORDER BOX */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md rounded-[28px] p-[3px]"
        style={{
          background:
            "linear-gradient(90deg,#ff3ecb,#7b5cff,#00eaff,#00d4ff)",
          boxShadow:
            "0 0 45px rgba(255,0,200,0.4),0 0 60px rgba(0,238,255,0.4)",
        }}
      >

        {/* INNER PANEL */}
        <div
          className="bg-[#071025]/90 rounded-2xl px-7 py-8 backdrop-blur-xl"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "inset 0 0 30px rgba(0,0,0,0.55),0 0 35px rgba(0,255,255,0.22)",
          }}
        >

          {/* TITLE */}
          <h1 className="text-[28px] font-bold text-center text-white">
            Academic Head Registration
          </h1>

          <p className="text-gray-400 text-center text-sm -mt-1 mb-6">
            Secure high-level access for academic approvals
          </p>

          {/* FORM FIELDS */}
          <div className="space-y-4">

            {/* Full Name */}
            <FieldIcon
              placeholder="Full Name"
              icon="👤"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Email */}
            <FieldIcon
              placeholder="Email Address"
              icon="✉️"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Phone */}
            <FieldIcon
              placeholder="Phone Number"
              icon="📞"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* PASSWORD */}
            <PasswordFieldIcon
              placeholder="Password"
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              icon={showPassword ? openEye : closeEye}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* CONFIRM PASSWORD */}
            <PasswordFieldIcon
              placeholder="Confirm Password"
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              icon={showConfirm ? openEye : closeEye}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {/* SECRET ACCESS CODE */}
            <div className="relative">
              <FieldIcon
                placeholder="Secret Access Code"
                icon="🛡️"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />

              <div
                className="
                  absolute right-0 top-1 text-[10px] px-2 py-[3px] 
                  rounded-md bg-[#182135] text-gray-300
                  border border-cyan-500/30
                  shadow-[0_0_12px_rgba(0,255,255,0.3)]
                "
              >
                Only academic heads<br />have access
              </div>
            </div>

            {/* SIGNUP BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSignup}
              disabled={loading}
              className="
                w-full py-3 mt-2 rounded-xl font-semibold text-white
                bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400
                shadow-[0_0_35px_rgba(255,0,200,0.7)]
                hover:shadow-[0_0_50px_rgba(0,200,255,1)]
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating Account..." : "Activate Academic Head Account"}
            </motion.button>
          </div>

          {/* FOOTER */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Already have access?{" "}
            <Link
              to="/dashboard/university/academic-head/login"
              className="text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

/* ICON FIELD ELEMENT */
function FieldIcon({ placeholder, icon, value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-gray-300 text-lg">{icon}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full pl-10 pr-3 py-3 bg-transparent text-white rounded-xl 
          border border-cyan-500/30 outline-none
          placeholder:text-gray-400
          focus:border-cyan-400
          shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]
        "
      />
    </div>
  );
}

/* PASSWORD FIELD ELEMENT */
function PasswordFieldIcon({ placeholder, show, onToggle, icon, value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-gray-300 text-lg">🔒</span>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full pl-10 pr-10 py-3 bg-transparent text-white rounded-xl 
          border border-cyan-500/30 outline-none
          placeholder:text-gray-400
          focus:border-cyan-400
          shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]
        "
      />
      <img
        src={icon}
        onClick={onToggle}
        className="absolute right-4 top-3 w-6 h-6 cursor-pointer"
      />
    </div>
  );
}