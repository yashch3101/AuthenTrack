import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import neonEarth from "../assets/edu.png";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const word = {
  hidden: { y: 120, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      mass: 0.8
    }
  }
};

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15
    }
  }
};

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("studentToken");

  const line1 = "Smart Event".split(" ");
  const line2 = "Attendance".split(" ");
  const line3 = "System".split(" ");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full pb-24 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24"
    >
      {/* LEFT */}
      <div className="max-w-xl md:pt-10">

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-['Aclonica'] tracking-wide">

          <motion.div className="flex gap-4 overflow-hidden">
            {line1.map((w, i) => (
              <motion.span key={i} variants={word} className="text-white inline-block">
                {w}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="flex gap-4 text-[#14F1F9] overflow-hidden drop-shadow-[0_0_18px_rgba(20,241,249,0.8)]">
            {line2.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="flex gap-4 text-[#14F1F9] overflow-hidden">
            {line3.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </motion.div>

        </h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          className="text-gray-400 mt-6 text-lg leading-relaxed"
        >
          AI-powered face verification & location-based secure attendance
        </motion.p>

        {/* BULLETS */}
        <motion.ul variants={container} className="mt-7 space-y-3 text-gray-300">
          {["Face Recognition", "Location based Approval", "Director Digital Signing"].map((t, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-center gap-3">
              <span className="text-[#14F1F9] text-xl">✔</span> {t}
            </motion.li>
          ))}
        </motion.ul>

        {/* BUTTONS */}
        <motion.div variants={fadeUp} className="mt-10 flex gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold bg-[#14F1F9] text-black hover:opacity-90 transition"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          {!isLoggedIn && (
            <button
              className="px-6 py-3 rounded-lg font-semibold border border-[#14F1F9] text-[#14F1F9] hover:bg-[#14F1F9] hover:text-black transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </motion.div>
      </div>

      {/* IMAGE */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 16 }}
        className="flex justify-center"
      >
        <img
          src={neonEarth}
          alt="Hero"
          className="w-[420px] md:w-[550px] lg:w-[550px] object-contain mix-blend-lighten"
        />
      </motion.div>

    </motion.div>
  );
}