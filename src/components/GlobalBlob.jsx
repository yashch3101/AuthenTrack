import React from "react";
import { motion } from "framer-motion";

export default function GlobalBlob() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">

      {/* ✨ BLUE / CYAN STARS */}
      {[...Array(90)].map((_, i) => {
        let size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={"blue_" + i}
            className="absolute rounded-full z-[0]"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: "rgba(0,160,255,0.9)", // blue star
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.7px)",
            }}
          />
        );
      })}

      {/* 🌸 PINK BLINKING BLOBS */}
      {[...Array(60)].map((_, i) => {
        let size = Math.random() * 4 + 2; // pink blobs slightly bigger
        return (
          <motion.div
            key={"pink_" + i}
            className="absolute rounded-full z-[0]"
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: "rgba(255, 0, 150, 0.8)", // pink blob
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












