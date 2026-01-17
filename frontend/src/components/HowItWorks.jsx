import React from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, Cpu, Send } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const heading = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function HowItWorks() {
  const steps = [
    { icon: <Search size={28} />, title: "Monitor platforms" },
    { icon: <AlertTriangle size={28} />, title: "Detect suspicious content" },
    { icon: <Cpu size={28} />, title: "AI similarity checking" },
    { icon: <Send size={28} />, title: "Send alerts to admins" },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-24 px-4 md:px-10">
      {/* soft background glow */}
      <div className="absolute inset-0 mx-auto max-w-6xl blur-[90px] opacity-30 bg-cyan-500/20 rounded-3xl"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* HEADING */}
        <motion.div
          variants={heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <div className="h-[2px] w-40 md:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            How it <span className="text-cyan-400">works</span>
          </h2>

          <div className="h-[2px] w-40 md:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
        </motion.div>

        {/* STEPS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="
                bg-[#0A0F1E] p-6 rounded-2xl border border-[#0d1b2a]
                shadow-[0_0_15px_rgba(0,255,255,0.12)]
                hover:shadow-[0_0_30px_rgba(0,255,255,0.45)]
                hover:border-cyan-400
                transition-all cursor-pointer text-center
                flex flex-col items-center gap-3
              "
            >
              <div className="text-cyan-400">{step.icon}</div>
              <p className="text-white text-sm font-medium">{step.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}