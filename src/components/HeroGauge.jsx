import React, { useEffect } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VibrantEdgeGlowCard() {
  const progress = useMotionValue(82); // Default static 82%

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Connect text and arc stroke to progress
  const textValue = progress; // we'll use get()
  const dashOffset = useTransform(progress, (v) => 314 - (314 * v) / 100);

  // Hover starts → 0 → 82 movement
  const handleHoverStart = () => {
    animate(progress, 0, { duration: 0 });
    animate(progress, 82, {
      duration: 1.7,
      ease: "easeInOut",
    });
  };

  // Hover ends → stay 82
  const handleHoverEnd = () => {
    animate(progress, 82, { duration: 0.3 });
  };

  return (
    <motion.div
      data-aos="fade-up"
      className="
        relative w-[330px] p-8 mx-auto
        rounded-3xl bg-[#05080f]
        border border-[#0a1624]
        overflow-hidden
        shadow-[0_0_35px_rgba(0,255,255,0.25)]
      "
    >
      {/* BACK AURA */}
      <div className="absolute -inset-10 rounded-3xl bg-cyan-500/20 blur-[70px]"></div>

      {/* BORDER NEON ANIMATION */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          background: [
            "conic-gradient(from 0deg, transparent 0%, cyan 15%, transparent 30%)",
            "conic-gradient(from 180deg, transparent 0%, cyan 15%, transparent 30%)",
            "conic-gradient(from 360deg, transparent 0%, cyan 15%, transparent 30%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        style={{
          padding: "5px",
          filter: "blur(10px)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* TITLE */}
      <p className="text-gray-300 text-sm mb-6 tracking-wider">Leak Probability</p>

      {/* GAUGE AREA */}
      <motion.div
        className="relative w-48 h-48 mx-auto cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {/* OUTER RING */}
        <div className="absolute inset-0 rounded-full bg-[#0f172a] border border-cyan-400/40 shadow-[0_0_30px_rgba(0,240,255,0.35)]"></div>

        {/* INNER PANEL */}
        <div className="absolute inset-4 rounded-full bg-[#07101c] border border-white/10"></div>

        {/* ORANGE ARC */}
        <svg width="190" height="190" className="absolute inset-0 m-auto" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#ff8800" />
              <stop offset="50%" stopColor="#ff2255" />
              <stop offset="100%" stopColor="#ff8800" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="60"
            cy="60"
            r="50"
            stroke="url(#arcGrad)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="314"
            style={{
              strokeDashoffset: dashOffset,
              transformBox: "fill-box",
              transformOrigin: "50% 50%",
            }}
            strokeLinecap="round"
            whileHover={{
              rotate: 360,
              pathLength: [0.4, 1, 0.4],
              filter: "drop-shadow(0 0 20px #ff3366)",
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </svg>

        {/* CENTER VALUE — FIXED VERSION */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white text-4xl font-extrabold"
          whileHover={{ scale: 1.12 }}
        >
          <motion.span style={{ textShadow: "0 0 18px cyan" }}>
            {textValue.get()}%
          </motion.span>
        </motion.div>
      </motion.div>

      {/* INFO SECTION */}
      <div className="mt-8 p-4 rounded-xl bg-[#0d1623] border border-white/10 text-gray-300 text-sm space-y-2">
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 bg-pink-500 rounded-full"></span>
          Possible leaked content detected
        </p>
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 bg-orange-400 rounded-full"></span>
          AI scanning...
        </p>
      </div>
    </motion.div>
  );
}


















