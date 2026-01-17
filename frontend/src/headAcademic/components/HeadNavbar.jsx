import React, { useEffect, useState } from "react";
import { Bell, Settings, LogOut, User } from "lucide-react";

export default function HeadNavbar() {

  const [director, setDirector] = useState(null);

  useEffect(() => {
    fetchDirectorDetails();
  }, []);

  async function fetchDirectorDetails() {
    try {
      const token = localStorage.getItem("directorToken");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/director/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setDirector(data.director);
      }
    } catch (err) {
      console.log("DIRECTOR FETCH ERROR →", err);
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("directorToken");
    window.location.href = "/director-login";
  };

  return (
    <div
      className="w-full flex items-center justify-between px-6 py-4
      bg-[#071426]/50 backdrop-blur-xl border-b border-cyan-500/20
      shadow-[0_0_25px_rgba(0,255,255,0.2)] rounded-xl mb-6"
    >
      {/* LEFT TITLE */}
      <h1 className="text-2xl font-bold text-cyan-300">
        Academic Head Dashboard
      </h1>

      {/* RIGHT PROFILE SECTION */}
      <div className="flex items-center gap-6">

        {/* NAME & ROLE */}
        <div className="text-right">
          <p className="font-semibold text-cyan-200">
            {director?.fullName || "Loading..."}
          </p>
          <p className="text-xs text-gray-400">
            {director?.role || "Academic Head"}
          </p>
        </div>

        {/* PROFILE ICON */}
        <div className="p-2 rounded-full bg-[#0a162e] border border-cyan-500/40">
          <User className="w-6 h-6 text-cyan-300" />
        </div>

        {/* NOTIFICATION */}
        <Bell className="w-6 h-6 text-cyan-300 cursor-pointer hover:text-white" />

        {/* SETTINGS */}
        <Settings className="w-6 h-6 text-cyan-300 cursor-pointer hover:text-white" />

        {/* LOGOUT */}
        <LogOut
          onClick={handleLogout}
          className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-300"
        />
      </div>
    </div>
  );
}
