import React from "react";
import { motion } from "framer-motion";
import wave from "../assets/footer-wave.png";

export default function Footer() {
  return (
    <div
      className="relative w-full text-white mt-32 overflow-hidden"
      style={{
        backgroundImage: `url(${wave})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundSize: "cover",
      }}
    >
      {/* Dark overlay so text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-[#020617]/90 z-0" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: Math.random() > 0.5 ? "#22d3ee" : "#ec4899",
              opacity: 0.8,
              filter: "blur(1px)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center pt-40 pb-32 px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Made With ❤️ By{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Our Team Hack Elite
          </span>
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-sm">
          Building futuristic neon dashboards & intelligent systems for the next generation.
        </p>

        <div className="mt-8 flex justify-center gap-8 text-2xl">
          <i className="fa-brands fa-instagram hover:text-pink-400 transition" />
          <i className="fa-brands fa-github hover:text-cyan-400 transition" />
          <i className="fa-regular fa-envelope hover:text-blue-400 transition" />
        </div>

        <p className="text-gray-400 text-xs mt-12">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}