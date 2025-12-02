import React, { useEffect } from "react";
import { Mail, Phone, Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

import backBtn from "../assets/back-button.png";

function LocalBlob() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(90)].map((_, i) => {
        let size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={"blue_" + i}
            className="absolute rounded-full"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: "rgba(0,160,255,0.9)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.7px)",
            }}
          />
        );
      })}

      {[...Array(60)].map((_, i) => {
        let size = Math.random() * 4 + 2;
        return (
          <motion.div
            key={"pink_" + i}
            className="absolute rounded-full"
            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: "rgba(255, 0, 150, 0.8)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
          />
        );
      })}
    </div>
  );
}

export default function EventRegistration() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex items-center justify-center px-6 relative overflow-hidden bg-black"
    >
      <LocalBlob />

      <motion.img
        src={backBtn}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        className="
          absolute top-6 left-6 z-50
          w-12 h-12 
          cursor-pointer 
          rounded-full 
          shadow-[0_0_20px_rgba(0,255,255,0.6)]
          hover:shadow-[0_0_35px_rgba(0,255,255,1)]
          transition-all duration-300
          p-2
          bg-[#0a0f1f]/60 
          backdrop-blur-md
        "
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[700px] h-[700px] bg-cyan-400/30 blur-[200px] rounded-full z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-20 w-full max-w-3xl bg-[#07131C] border border-cyan-500/40 
          rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,255,0.35)]"
      >
        <h1 className="text-4xl font-extrabold text-cyan-300 text-center mb-1">
          Event Registration
        </h1>

        <p className="text-gray-400 text-center mb-8 -mt-1">
          Fill your details to register for this event
        </p>

        <div
          className="w-full bg-[#0A1D29] border border-cyan-400/30 
            rounded-xl p-5 shadow-[0_0_22px_rgba(0,255,255,0.12)] mb-7"
        >
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 text-gray-200">

            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-cyan-400" />
              <span className="text-sm">Date: <b>2024-10-26</b></span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-cyan-400" />
              <span className="text-sm">Venue: <b>Auditorium B</b></span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-cyan-400" />
              <span className="text-sm">Event: <b>AI Robotics Workshop</b></span>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="col-span-2 w-full border-2 border-dashed border-cyan-400/40 
            rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer 
            hover:bg-cyan-400/10 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1829/1829580.png"
              alt="upload"
              className="w-10 opacity-70"
            />
            <p className="text-cyan-300 mt-2 text-sm font-medium">Upload Your Photo</p>
          </motion.div>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full bg-[#0b2331] p-3 rounded-md border border-cyan-500/30 
              text-white placeholder-gray-400 text-sm"
          />

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-cyan-300" size={18} />
            <input
              type="email"
              placeholder="user.email@google.com"
              className="w-full bg-[#0b2331] p-3 pl-11 rounded-md border border-cyan-500/30 
                text-white placeholder-gray-400 text-sm"
            />
          </div>

          <select className="bg-[#0b2331] p-3 rounded-md border border-cyan-500/30 text-white text-sm">
            <option>Course</option>
            <option>B.Tech</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>

          <select className="bg-[#0b2331] p-3 rounded-md border border-cyan-500/30 text-white text-sm">
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
          </select>

          <select className="bg-[#0b2331] p-3 rounded-md border border-cyan-500/30 text-white text-sm">
            <option>Year</option>
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
          </select>

          <select className="bg-[#0b2331] p-3 rounded-md border border-cyan-500/30 text-white text-sm">
            <option>Q-ID</option>
            <option>101</option>
            <option>102</option>
          </select>

          <div className="relative col-span-2">
            <Phone className="absolute left-3 top-3 text-cyan-300" size={18} />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full bg-[#0b2331] p-3 pl-11 rounded-md border border-cyan-500/30 
                text-white placeholder-gray-400 text-sm"
            />
          </div>

        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-300 to-blue-500 
            text-black font-semibold rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:opacity-90"
          onClick={() => navigate("/dashboard")}
        >
          Submit Registration
        </motion.button>

      </motion.div>
    </motion.div>
  );
}