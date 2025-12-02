import React from "react";
import { Mail, Github, Instagram } from "lucide-react";
import anshiPic from "../assets/anshi.jpg";
import yashPic from "../assets/yash.jpg";
import supriyaPic from "../assets/supriya.jpg";
import shreyaPic from "../assets/shreya.jpg";

export default function AboutTeam() {
  const team = [
    {
      name: "Er. Supriya Kumari",
      role: "Frontend Developer",
      img: supriyaPic,
    },
    {
      name: "Er. Anshi Srivastava",
      role: "Ai/Ml Engineer",
      img: anshiPic,
    },
    {
      name: "Er. Shreya Bajpai",
      role: "Backend developer engineer ",
      img: shreyaPic,
    },
    {
      name: "Er. Yash Chaurasia",
      role: "Web Developer, App Developer, Ai/Ml engineer",
      img: yashPic,
    },
  ];

  return (
    <div className="relative text-white py-24 px-6">

      
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-6 h-64 bg-cyan-500 rounded-r-xl opacity-80"></div>

      
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-6 h-64 bg-pink-500 rounded-l-xl opacity-80"></div>

      <h2 className="text-center text-4xl font-extrabold mb-16 tracking-wide">
        OUR PERFECT TEAM
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-12 max-w-6xl mx-auto">

        {team.map((member, idx) => (
          <div key={idx} className="text-center">

            
            <div className="flex justify-center">
              <img
                src={member.img}
                alt={member.name}
                className="
                  w-40 h-40 rounded-full object-cover 
                  border-4 border-cyan-400/50
                "
              />
            </div>

            <h3 className="mt-5 text-2xl font-bold">{member.name}</h3>

            <p className="text-pink-400 font-semibold text-sm mt-1">
              {member.role}
            </p>

            <p className="text-gray-400 text-sm mt-3 max-w-sm mx-auto">
              Sample text. Click to select the text box. Click again or double click to start editing.
            </p>

            <div className="flex justify-center gap-6 mt-4 text-xl">
              <Mail className="hover:text-cyan-400 cursor-pointer" />
              <Github className="hover:text-cyan-400 cursor-pointer" />
              <Instagram className="hover:text-cyan-400 cursor-pointer" />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}




