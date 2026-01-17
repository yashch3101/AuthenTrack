import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPinCheck, UserCheck, FileCheck2, Workflow } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const heading = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const card = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function FeaturesSection() {
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
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-40 text-center overflow-hidden"
    >
      <motion.h2
        variants={heading}
        className="
          text-3xl font-extrabold tracking-wider mb-16
          bg-gradient-to-r from-white via-[#22eaff] to-white
          bg-clip-text text-transparent
          drop-shadow-[0_0_30px_#22eaff]
        "
      >
        SYSTEM FEATURES
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-7xl mx-auto px-10">
        {features.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={card}
            className="
              border border-[#22eaff55]
              hover:border-[#22eaff]
              rounded-2xl
              p-8
              flex items-center gap-6
              bg-[#0B0F1A]
              transition-all duration-300
              hover:shadow-[0_0_35px_#22eaffaa]
            "
          >
            <div className="p-5 rounded-2xl bg-[#0f172a] shadow-[0_0_20px_#22eaff55]">
              {item.icon}
            </div>

            <div className="text-left">
              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}