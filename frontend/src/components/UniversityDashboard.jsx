import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-[#020617] pt-32 px-6 text-white flex flex-col items-center">
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-14 text-center">
        University Dashboard
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(card.path)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="
              relative rounded-3xl p-[2px] cursor-pointer 
              hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]
            "
          >
            {/* Glow Border */}
            <div className={`rounded-3xl bg-gradient-to-br ${card.glow} p-[3px]`}>
              
              {/* Inner Box */}
              <div className="bg-[#070d1b] rounded-3xl p-10 h-full">
                <div className="flex flex-col items-center text-center gap-4">

                  {card.icon}

                  <h2 className="text-2xl font-semibold">{card.title}</h2>
                  <p className="text-gray-400 text-sm">{card.desc}</p>

                  <button
                    onClick={() => navigate(card.path)}
                    className="
                      mt-3 bg-cyan-600/20 border border-cyan-500 
                      text-cyan-300 px-4 py-2 rounded-lg 
                      hover:bg-cyan-600/30 transition
                    "
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
  );
}