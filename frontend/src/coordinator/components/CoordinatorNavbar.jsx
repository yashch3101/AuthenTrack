import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  MoreVertical,
  LayoutDashboard,
  Clock,
  CheckCircle,
  Calendar,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function CoordinatorNavbar({ onSelect }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const [coordinator, setCoordinator] = useState({
    fullName: "",
    department: "",
    photo: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const stored = localStorage.getItem("coordinator");
    if (stored) {
      setCoordinator(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    function close(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("coordinator");

    window.location.href = "/dashboard/university/coordinator/login";
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0a0f1f]/70 backdrop-blur-xl z-50 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Profile */}
        <div className="flex items-center gap-3">
          <img
            src={
              coordinator.photo
                ? coordinator.photo
                : "https://i.pravatar.cc/100?img=48"
            }
            className="w-12 h-12 rounded-full border border-cyan-400/40"
          />

          <div>
            <h3 className="text-white font-semibold">
              {coordinator.fullName || "Coordinator"}
            </h3>
            <p className="text-gray-400 text-xs">
              {coordinator.department || "Department"}
            </p>
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="hidden md:flex items-center bg-[#041622] px-4 py-2 rounded-xl border border-cyan-500/30 w-96">
          <Search size={18} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search…"
            className="bg-transparent w-full text-white outline-none placeholder-gray-500"
          />
        </div>

        {/* MENU BUTTON */}
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="p-3 rounded-full cursor-pointer border border-cyan-500/30 hover:bg-cyan-500/10 transition-all relative"
        >
          <MoreVertical size={20} className="text-cyan-300" />

          {openMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-3 w-64 rounded-xl bg-[#06121f]/95 shadow-[0_0_25px_rgba(0,255,255,0.25)] backdrop-blur-xl border border-cyan-500/40 overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300" />

              {/* ITEMS */}
              <NavItem
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
                onClick={() => {
                  onSelect("dashboard");
                  setOpenMenu(false);
                }}
              />

              <NavItem
                icon={<Clock size={18} />}
                text="Pending Requests"
                onClick={() => {
                  onSelect("pending");
                  setOpenMenu(false);
                }}
              />

              <NavItem
                icon={<CheckCircle size={18} />}
                text="Approved List"
                onClick={() => {
                  onSelect("approved");
                  setOpenMenu(false);
                }}
              />

              <NavItem
                icon={<Calendar size={18} />}
                text="Events"
                onClick={() => {
                  onSelect("events");
                  setOpenMenu(false);
                }}
              />

              <NavItem
                icon={<FileText size={18} />}
                text="Final PDF"
                onClick={() => {
                  onSelect("pdf");
                  setOpenMenu(false);
                }}
              />

              <NavItem
                icon={<Settings size={18} />}
                text="Settings"
                onClick={() => {
                  onSelect("settings");
                  setOpenMenu(false);
                }}
              />

              {/* LOGOUT */}
              <NavItem
                icon={<LogOut size={18} />}
                text="Logout"
                onClick={logout}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-300 
      hover:text-cyan-300 hover:bg-cyan-500/10 border-b border-cyan-500/10 
      transition-all last:border-none"
    >
      <span className="text-cyan-300">{icon}</span>
      <span>{text}</span>
    </div>
  );
}