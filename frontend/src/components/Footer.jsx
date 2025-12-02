import React from "react";

export default function Footer() {
  return (
    <div className="relative w-full bg-[#020617] text-white overflow-hidden mt-32">

      <div className="absolute inset-0 opacity-60">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#grad1)"
            fillOpacity="0.35"
            d="
              M0,160L60,149C120,139,240,117,360,122.7C480,128,600,160,720,186.7C840,213,960,235,1080,245.3C1200,256,1320,256,1380,256L1440,256L1440,320L1380,320C1320,320,1200,320,
              1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z
            "
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
              M0,160L60,149C120,139,240,117,360,122.7C480,128,600,160,720,186.7C840,213,960,235,1080,245.3C1200,256,1320,256,1380,256L1440,256L1440,320L0,320Z;

              M0,192L50,181C100,171,200,149,300,149.3C400,149,500,171,600,176C700,181,800,160,900,170.7C1000,181,1100,224,1200,240C1300,256,1400,245,1440,240L1440,320L0,320Z;

              M0,160L60,149C120,139,240,117,360,122.7C480,128,600,160,720,186.7C840,213,960,235,1080,245.3C1200,256,1320,256,1380,256L1440,256L1440,320L0,320Z
              "
            />
          </path>

          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 animate-pulse shadow-[0_0_25px_#06b6d4]"></div>

      <div className="relative z-10 text-center py-16">
        <h2 className="text-3xl font-bold mb-3">
          Made With ❤️ By <span className="text-pink-400">Our Team Hack Elite</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Building futuristic neon dashboards & intelligent systems for the next generation.
        </p>

        <div className="mt-6 flex justify-center gap-6 text-2xl">
          <i className="fa-brands fa-instagram hover:text-pink-400 transition"></i>
          <i className="fa-brands fa-github hover:text-cyan-400 transition"></i>
          <i className="fa-regular fa-envelope hover:text-blue-400 transition"></i>
        </div>

        <p className="text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </div>
  );
}
