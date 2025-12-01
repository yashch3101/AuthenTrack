// AttendanceForm.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Image as ImageIcon, CheckCircle, Clock } from "lucide-react";
import backBtn from "../assets/back-button.png";

// ⭐ Reusable breathing glow line
const GlowLine = ({ className }) => (
  <motion.div
    className={className}
    animate={{
      opacity: [0.4, 1, 0.4],
      boxShadow: [
        "0 0 10px rgba(0,255,255,0.3)",
        "0 0 25px rgba(0,255,255,0.7)",
        "0 0 10px rgba(0,255,255,0.3)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

// ⭐ ADDING GLOBAL BLOB HERE (YOUR UI WILL NOT CHANGE)
const GlobalBlob = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

    {/* ✨ BLUE / CYAN STARS */}
    {[...Array(90)].map((_, i) => {
      let size = Math.random() * 3 + 1;
      return (
        <motion.div
          key={"blue_" + i}
          className="absolute rounded-full z-0"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: "rgba(0,160,255,0.9)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(0.7px)"
          }}
        />
      );
    })}

    {/* 🌸 PINK PARTICLES */}
    {[...Array(60)].map((_, i) => {
      let size = Math.random() * 4 + 2;
      return (
        <motion.div
          key={"pink_" + i}
          className="absolute rounded-full z-0"
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: "rgba(255,0,150,0.8)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(1px)"
          }}
        />
      );
    })}
  </div>
);

export default function AttendanceForm() {
  const [gps, setGps] = useState("30.0083°, 77.7649°");

  // ⭐ INIT AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((p) => {
      setGps(`${p.coords.latitude.toFixed(4)}°, ${p.coords.longitude.toFixed(4)}°`);
    });
  }, []);

  const inputBase = {
    width: "100%",
    padding: "10px 15px",
    background: "#0c2333",
    border: "1px solid rgba(0,255,255,0.25)",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#d9faff",
    outline: "none",
    boxShadow: "inset 0 0 12px rgba(0,255,255,0.15)"
  };

  const buttonGradient = {
    background: "linear-gradient(90deg, #00eaff, #ff1fbf)",
    boxShadow: "0 0 25px rgba(255,0,200,0.5)"
  };

  return (
    <div className="min-h-screen bg-[#050D17] text-white flex justify-center px-4 py-10 relative overflow-hidden">
      
      {/* ⭐ GLOBAL PARTICLE BLOB ADDED */}
      <GlobalBlob />

      {/* ⭐ ROTATING CYAN MAIN BLOB */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
        className="absolute -top-56 left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full opacity-25 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #00eaff, #0066ff, transparent)"
        }}
      />

      {/* ⭐ SMALL PINK SIDE BLOB */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        className="absolute top-20 left-8 w-[380px] h-[380px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #ff1fbf, #a8008f, transparent)"
        }}
      />

      {/* ⭐ RIGHT SIDE PURPLE GLOW BLOB */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #b400ff, #5500ff, transparent)"
        }}
      />

      {/* ⭐ Back Button */}
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.12 }}
        className="fixed top-4 left-4 z-50 w-12 h-12 cursor-pointer rounded-full 
        bg-[#06131c]/85 p-2 shadow-[0_0_30px_rgba(0,255,255,0.8)]"
      />

      {/* ⭐ UI START (UNCHANGED) */}
      <div className="w-full max-w-[900px] relative z-[5]">

        <motion.h1
          className="text-center text-4xl font-bold text-cyan-500 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Event Attendance Verification
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Authenticate your face and submit your attendance
        </motion.p>

        {/* ⭐ FACE BOX (UNCHANGED) */}
        <motion.div
          data-aos="fade-up"
          className="relative bg-[#081523] rounded-2xl px-8 py-8 border border-cyan-500/80 backdrop-blur-sm"
        >
          <GlowLine className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-cyan-500/80" />
          <GlowLine className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-cyan-300/80" />

          <h2 className="text-center text-cyan-500 font-semibold mb-6 text-lg">
            Face Recognition Box
          </h2>

          <div className="grid grid-cols-3 gap-8">

            {/* ⭐ Face Circle */}
            <div className="flex flex-col items-center">
              <div
                className="w-36 h-36 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: "#0d2433",
                  border: "2px solid rgba(0,200,255,0.6)",
                  boxShadow:
                    "0 0 40px rgba(0,200,255,0.35), inset 0 0 25px rgba(0,200,255,0.25)"
                }}
              >
                <p className="text-cyan-200 text-xs leading-[1.6] mb-1">
                  Align your face
                </p>
                <p className="text-cyan-200 text-xs leading-[1.6] mt-1">
                  and click Capture
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.07 }}
                className="mt-5 px-7 py-2.5 rounded-full font-semibold text-white text-sm"
                style={buttonGradient}
              >
                Capture Face
              </motion.button>
            </div>

            {/* ⭐ Event Details */}
            <div className="text-sm space-y-3 pt-3">
              <p><b className="text-cyan-300">Event Name:</b> AI Robotics Workshop</p>
              <p><b className="text-cyan-300">Event Date & Time:</b> 2024-10-26, 3 PM</p>
              <p><b className="text-cyan-300">Venue:</b> Auditorium B</p>
              <p><b className="text-cyan-300">Coordinator:</b> Dr. Anya Sharma</p>
            </div>

            {/* ⭐ Right Boxes */}
            <div className="flex flex-col items-center gap-5">

              <motion.div
                whileHover={{ scale: 1.07 }}
                className="w-24 h-24 rounded-xl bg-[#0c2333]
                flex flex-col items-center justify-center border border-cyan-300/60 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
              >
                <ImageIcon className="text-cyan-300" />
                <span className="text-xs mt-1">Live Attendance</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.07 }}
                className="w-24 h-24 rounded-xl	bg-[#0c2333]
                flex flex-col items-center justify-center border border-cyan-300/60 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
              >
                <ImageIcon className="text-cyan-300" />
                <span className="text-xs mt-1">Uploaded</span>
              </motion.div>

              <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg shadow-[0_0_12px_rgba(0,255,0,0.4)]">
                Face Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* ⭐ STUDENT DETAILS (UNCHANGED) */}
        <motion.div
          data-aos="fade-up"
          className="relative bg-[#081523] border border-cyan-400/30 rounded-2xl px-8 py-8 mt-8 backdrop-blur-sm"
        >

          <GlowLine className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-cyan-300/40" />
          <GlowLine className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-cyan-300/40" />

          <h2 className="text-center text-cyan-200 font-semibold mb-6 text-lg">
            STUDENT DETAILS
          </h2>

          <div className="grid grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="text-sm space-y-4">

              <div>
                <p className="text-gray-400 text-xs mb-1">GPS Coordinates</p>
                <p className="text-cyan-200 font-medium">
                  {gps} <span className="text-gray-500">(Auto-Filled)</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-cyan-300" size={15} />
                <span>2 PM – 4 PM</span>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Location Badge</p>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  className="px-4 py-2 text-sm text-white rounded-lg"
                  style={buttonGradient}
                >
                  Fetch My Location
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={16} />
                <span>Location Status: Verified</span>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Subjects Attended</p>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  className="px-4 py-2 text-sm text-white rounded-lg"
                  style={buttonGradient}
                >
                  Fetch My Location
                </motion.button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <input placeholder="Name" style={inputBase} />
              <input placeholder="Email" style={inputBase} />
              <select style={inputBase}><option>B-Tech</option></select>
              <select style={inputBase}><option>CSE</option></select>
              <select style={inputBase}><option>101</option></select>
              <select style={inputBase}><option>Machine Learning, Robotics</option></select>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}













