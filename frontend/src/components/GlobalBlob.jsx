import React from "react";
import { motion } from "framer-motion";

export default function GlobalBlob() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {[...Array(150)].map((_, i) => {

       const size = Math.random() * 3 + 1.5;
        const color = [
          "rgba(0,255,255,1)",
          "rgba(0,160,255,1)",
          "rgba(255,0,180,1)",
        ][Math.floor(Math.random() * 3)];

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() * 80 - 40);
        const endY = startY + (Math.random() * 80 - 40);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${startX}vw`,
              y: `${startY}vh`,
              opacity: 0.9,
            }}
            animate={{
              x: `${endX}vw`,
              y: `${endY}vh`,
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              filter: "blur(1.2px)",
              boxShadow: `0 0 12px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}