import React, { useRef } from "react";
import { Shield, AlertTriangle, Cpu } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function FeaturesSection() {
  const ref = useRef(null);

  // Scroll detection
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: <Shield size={40} />,
      title: "Real-Time Monitoring",
      desc: "AI-powered live monitoring of public channels.",
    },
    {
      icon: <AlertTriangle size={40} />,
      title: "Detect Suspicious Content",
      desc: "Instant alerts for leaked or suspicious exam content.",
    },
    {
      icon: <Cpu size={40} />,
      title: "AI Similarity Checking",
      desc: "Deep learning model to match question similarity.",
    },
  ];

  // Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.25, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section ref={ref} className="w-full bg-[#030712] py-20 px-4 md:px-10">
      {/* Heading Animation */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-white text-3xl md:text-4xl font-bold tracking-wide"
      >
        Our Key Features
      </motion.h2>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(0, 255, 255, 0.45)", // hover glow
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="
              bg-[#0A0F1E] 
              border border-[#0d1b2a] 
              rounded-2xl 
              p-8 
              cursor-pointer
              flex flex-col items-center text-center
              transition-all duration-300

              shadow-[0_0_15px_rgba(0,255,255,0.15)]   // ⭐ pre-glow always ON
              hover:border-cyan-400
              hover:shadow-[0_0_25px_rgba(0,255,255,0.45)] // ⭐ bright glow on hover
            "
          >
            <div className="text-cyan-400 mb-4">{item.icon}</div>

            <h3 className="text-white text-xl font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



