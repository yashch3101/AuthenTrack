import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "University Dashboard",
      icon: <GraduationCap size={40} />,
      path: "/dashboard/university", // ⭐ Correct
      desc: "Manage exam monitoring, alerts & reports.",
    },
    {
      title: "Student Dashboard",
      icon: <Users size={40} />,
      path: "/attendance", // ⭐ Correct
      desc: "View attendance, alerts, and activity.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#020617] text-white flex items-center justify-center py-20 px-4"
    >
      {/* MAIN OUTER BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-3xl p-[6px] relative overflow-hidden"
      >
        {/* MOVING NEON BORDER */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                #ff00ff,
                #ff00ffaa,
                transparent,
                transparent,
                #00eaff,
                #00eaffaa,
                transparent
              )
            `,
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            padding: "3px",
          }}
        />

        {/* INNER CARD */}
        <div className="w-full h-full rounded-3xl bg-[#030A17] p-12 shadow-[0_0_40px_rgba(0,255,255,0.20)] relative overflow-hidden">

          {/* BACKGROUND GLOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.35, scale: 1.15 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 blur-[110px] bg-cyan-500/20 rounded-3xl"
          />

          {/* HEADING */}
          <h1 className="relative text-3xl md:text-4xl font-bold text-center mb-14 z-10">
            Choose Your Dashboard
          </h1>

          {/* CARDS GRID */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 z-10">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(card.path)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0, 255, 255, 0.40)",
                }}
                className="
                  bg-[#0A0F1E] p-10 rounded-2xl
                  cursor-pointer transition-all
                  relative overflow-hidden
                  flex flex-col items-center text-center gap-5
                "
              >
                {/* ROTATING BORDER */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #00ffff55, transparent, #00ffff22)",
                    mask: "linear-gradient(#000 calc(100% - 3px), transparent 0)",
                    WebkitMask:
                      "linear-gradient(#000 calc(100% - 3px), transparent 0)",
                  }}
                />

                {/* CONTENT */}
                <div className="relative z-10">
                  <div className="text-cyan-400 mb-3">{card.icon}</div>
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  <p className="text-gray-400 text-sm mt-2">{card.desc}</p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}



