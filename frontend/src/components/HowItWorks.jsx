import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, AlertTriangle, Cpu, Send } from "lucide-react";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { icon: <Search size={28} />, title: "Monitor platforms" },
    { icon: <AlertTriangle size={28} />, title: "Detect suspicious content" },
    { icon: <Cpu size={28} />, title: "AI similarity checking" },
    { icon: <Send size={28} />, title: "Send alerts to admins" },
  ];

  return (
    <section className="relative w-full bg-[#030712] py-24 px-4 md:px-10">

      <div className="absolute inset-0 mx-auto max-w-6xl blur-[90px] opacity-30 bg-cyan-500/20 rounded-3xl"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >

        <div className="flex items-center justify-center gap-6 mb-16">

          <motion.div
            className="h-[2px] w-40 md:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                "0 0 10px rgba(0,255,255,0.3)",
                "0 0 30px rgba(0,255,255,0.7)",
                "0 0 10px rgba(0,255,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            How it <span className="text-cyan-400">works</span>
          </h2>

          <motion.div
            className="h-[2px] w-40 md:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                "0 0 10px rgba(0,255,255,0.3)",
                "0 0 30px rgba(0,255,255,0.7)",
                "0 0 10px rgba(0,255,255,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.25, duration: 0.6 }}
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
        </div>
      </motion.div>
    </section>
  );
}

