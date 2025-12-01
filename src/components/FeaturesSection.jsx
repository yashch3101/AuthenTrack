import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Neon Icons
import { MapPinCheck, UserCheck, FileCheck2, Workflow } from "lucide-react";

export default function FeaturesSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    {
      title: "Location Verification",
      desc: "Ensure student is present at event location",
      icon: <MapPinCheck size={32} color="#22eaff" />,
    },
    {
      title: "Multi-Level Approval",
      desc: "Coordinator + Director final verification",
      icon: <Workflow size={32} color="#22eaff" />,
    },
    {
      title: "Student Marks",
      desc: "Attendance",
      icon: <UserCheck size={32} color="#22eaff" />,
    },
    {
      title: "Digital PDF Reports",
      desc: "Signed attendance verify",
      icon: <FileCheck2 size={32} color="#22eaff" />,
    },
  ];

  return (
    <div className="mt-28 text-center">

      {/* NEON HEADING */}
      <h2
        data-aos="fade-up"
        className="
          text-3xl font-extrabold tracking-wider mb-14 
          bg-gradient-to-r from-white via-[#22eaff] to-white
          bg-clip-text text-transparent
          drop-shadow-[0_0_25px_#22eaff]
        "
      >
        SYSTEM FEATURES
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto px-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateX: -15, scale: 0.95 }}
whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
whileHover={{ scale: 1.05, rotateX: 0 }}

            className="
              border border-[#22eaff55] 
              hover:border-[#22eaff] 
              rounded-xl 
              p-6 
              flex items-center gap-4 
              bg-[#0B0F1A]
              transition-all duration-300 
              hover:shadow-[0_0_25px_#22eaffaa]
            "
            data-aos="fade-up"
          >
            {/* ICON */}
            <div className="p-4 rounded-xl bg-[#0f172a] shadow-[0_0_15px_#22eaff44] hover:shadow-[0_0_25px_#22eaffaa] transition-all duration-300">
              {item.icon}
            </div>

            {/* TEXT */}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}









