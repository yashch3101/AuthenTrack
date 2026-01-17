import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import backBtn from "../assets/back-button.png";

function UniversityParticles() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {[...Array(70)].map((_, i) => {
        const size = Math.random() * 4 + 2;
        const color = ["rgba(0,255,255,1)", "rgba(0,160,255,1)"][
          Math.floor(Math.random() * 2)
        ];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            animate={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              filter: "blur(1px)",
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function UniversityDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Academic Head",
      desc: "Manage academics, faculties & scheduling.",
      icon: <Users size={45} className="text-cyan-300" />,
      path: "/dashboard/university/academic-head/login",
      glow: "from-pink-500 to-purple-500",
    },
    {
      title: "Event Coordinator",
      desc: "Oversee events & handle event approvals.",
      icon: <CalendarCheck size={45} className="text-teal-300" />,
      path: "/dashboard/university/coordinator/login",
      glow: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden text-white">

      {/* 🔥 Moving Neon Particles */}
      <UniversityParticles />

      {/* 🔙 Back Button */}
      <motion.img
        src={backBtn}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        className="fixed top-5 left-5 z-50 w-12 h-12 cursor-pointer 
        rounded-full p-2 bg-[#0a0f1f]/70 backdrop-blur-md
        shadow-[0_0_20px_rgba(0,255,255,0.7)]"
      />

      {/* Center Glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-[1]">
        <div className="w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-32 px-6 flex flex-col items-center">

        <h1 className="text-4xl font-bold mb-14 text-center">
          University Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              onClick={() => navigate(card.path)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl p-[2px] cursor-pointer 
              hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            >
              {/* Glow Border */}
              <div
                className={`rounded-3xl bg-gradient-to-br ${card.glow} p-[3px]`}
              >
                <div className="bg-[#070d1b] rounded-3xl p-10 h-full">
                  <div className="flex flex-col items-center text-center gap-4">

                    {card.icon}

                    <h2 className="text-2xl font-semibold">{card.title}</h2>
                    <p className="text-gray-400 text-sm">{card.desc}</p>

                    <button
                      onClick={() => navigate(card.path)}
                      className="mt-3 bg-cyan-600/20 border border-cyan-500 
                      text-cyan-300 px-4 py-2 rounded-lg 
                      hover:bg-cyan-600/30 transition"
                    >
                      Open
                    </button>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}