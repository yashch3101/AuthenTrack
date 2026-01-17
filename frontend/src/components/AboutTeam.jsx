import React from "react";
import { Mail, Github, Instagram } from "lucide-react";
import { motion } from "framer-motion";

import anshiPic from "../assets/anshi.jpg";
import yashPic from "../assets/yash.jpg";
import supriyaPic from "../assets/supriya.jpg";
import shreyaPic from "../assets/shreya.jpg";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutTeam() {
  const team = [
    {
      name: "Er. Supriya Kumari",
      role: "Frontend Developer",
      img: supriyaPic,
    },
    {
      name: "Er. Anshi Srivastava",
      role: "AI / ML Engineer",
      img: anshiPic,
    },
    {
      name: "Er. Shreya Bajpai",
      role: "Backend Developer",
      img: shreyaPic,
    },
    {
      name: "Er. Yash Chaurasia",
      role: "Web, App & AI/ML Engineer",
      img: yashPic,
    },
  ];

  return (
    <motion.div
      id="contact"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative text-white py-24 px-6 overflow-hidden"
    >
      {/* Side bars */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-6 h-64 bg-cyan-500 rounded-r-xl opacity-80" />
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-6 h-64 bg-pink-500 rounded-l-xl opacity-80" />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center text-4xl font-extrabold mb-16 tracking-wide"
      >
        OUR PERFECT TEAM
      </motion.h2>

      {/* Grid */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 max-w-6xl mx-auto"
      >
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            variants={card}
            className="text-center"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-cyan-400/50"
              />
            </div>

            {/* Name */}
            <h3 className="mt-5 text-2xl font-bold">
              {member.name}
            </h3>

            {/* Role */}
            <p className="text-pink-400 font-semibold text-sm mt-1">
              {member.role}
            </p>

            {/* Description */}
            <p className="text-gray-400 text-sm mt-3 max-w-sm mx-auto">
              Sample text. Click to select the text box. Click again or double click to start editing.
            </p>

            {/* Icons */}
            <div className="flex justify-center gap-6 mt-4 text-xl">
              <Mail className="hover:text-cyan-400 cursor-pointer transition" />
              <Github className="hover:text-cyan-400 cursor-pointer transition" />
              <Instagram className="hover:text-cyan-400 cursor-pointer transition" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}