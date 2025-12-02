import React, { useState } from "react";
import { motion } from "framer-motion";

import CoordinatorNavbar from "./components/CoordinatorNavbar";
import PendingRequests from "./components/PendingRequests";
import ApprovedList from "./components/ApprovedList";
import Events from "./components/Events";
import PdfGenerator from "./components/PdfGenerator";
import EventAttendancePanel from "./components/EventAttendancePanel";

export default function CoordinatorDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const initialPending = [
    {
      id: "Q-12345",
      name: "Anya Sharma",
      course: "B.Tech CSE",
      year: "2nd Year",
      faceMatch: "92%",
      photo1: "https://i.pravatar.cc/150?img=13",
      photo2: "https://i.pravatar.cc/150?img=14",
      location: "Match",
      time: "10:00 AM",
      subjects: ["DBMS", "Java"],
    },
    {
      id: "Q-87341",
      name: "Amit Marrow",
      course: "BCA",
      year: "1st Year",
      faceMatch: "88%",
      photo1: "https://i.pravatar.cc/150?img=15",
      photo2: "https://i.pravatar.cc/150?img=16",
      location: "Mismatch",
      time: "11:00 AM",
      subjects: ["AI", "Python"],
    },
  ];

  const [pending, setPending] = useState(initialPending);
  const [approved, setApproved] = useState([]);

  const [verifiedEntries, setVerifiedEntries] = useState(0);
  const [locationFailures, setLocationFailures] = useState(0);
  const [suspiciousAttempts, setSuspiciousAttempts] = useState(0);
  const [totalEventHours] = useState("8 hrs");

  const addIncomingStudent = (student) => {
    if (!pending.find((s) => s.id === student.id) && !approved.find((s) => s.id === student.id)) {
      setPending((prev) => [student, ...prev]);
    }

    setVerifiedEntries((v) => v + 1);

    if (student.location?.toLowerCase() !== "match") {
      setLocationFailures((v) => v + 1);
    }

    if (Number(student.faceMatch?.replace("%", "")) < 60) {
      setSuspiciousAttempts((v) => v + 1);
    }
  };

  const handleApprove = (student) => {
    setApproved((prev) => [student, ...prev]);
    setPending((prev) => prev.filter((p) => p.id !== student.id));
  };

  const handleReject = (student) => {
    setPending((prev) => prev.filter((p) => p.id !== student.id));
  };

  const handleRemoveApproved = (id) => {
    setApproved((prev) => prev.filter((s) => s.id !== id));
  };

  const openPdfAndGenerate = () => {
    setActiveSection("pdf");

    setTimeout(() => {
      const ev = new CustomEvent("generate-pdf");
      window.dispatchEvent(ev);
    }, 300);
  };

  const isApprovedPanelOpen = activeSection === "approved";

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-cyan-500/25 blur-[200px] absolute 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <CoordinatorNavbar onSelect={setActiveSection} />

      <div className="pt-32 max-w-7xl mx-auto px-6 pb-24 relative">

        {/* 6 STATS BOXES */}
        {activeSection !== "pdf" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">

            <StatBox label="Pending Requests" value={pending.length} color="cyan" />
            <StatBox label="Approved Students" value={approved.length} color="green" />
            <StatBox label="Suspicious Attempts" value={suspiciousAttempts} color="rose" />
            <StatBox label="Verified Entries" value={verifiedEntries} color="cyan" />
            <StatBox label="Location Failures" value={locationFailures} color="yellow" />
            <StatBox label="Total Event Hours" value={totalEventHours} color="blue" />

          </div>
        )}

        {/* SECTIONS */}
        {activeSection === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EventAttendancePanel onStudentDetected={addIncomingStudent} />
          </motion.div>
        )}

        {activeSection === "pending" && (
          <motion.div
            animate={{ x: isApprovedPanelOpen ? -160 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <PendingRequests
              data={pending}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </motion.div>
        )}

        {activeSection === "events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Events />
          </motion.div>
        )}

        {activeSection === "pdf" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PdfGenerator approved={approved} />
          </motion.div>
        )}

      </div>

      {/* APPROVED LIST SLIDE PANEL */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: isApprovedPanelOpen ? 0 : 400 }}
        transition={{ duration: 0.35 }}
        className="fixed top-28 right-0 w-[380px] h-[80vh] bg-[#06121f]/95 
          border-l border-cyan-500/30 shadow-xl backdrop-blur-xl 
          rounded-l-2xl p-4 overflow-y-auto"
      >
        <ApprovedList
          approved={approved}
          onClose={() => setActiveSection("pending")}
          onSubmit={openPdfAndGenerate}
          onRemove={handleRemoveApproved}
        />
      </motion.div>

    </div>
  );
}

function StatBox({ label, value, color }) {
  const colorClasses = {
    cyan: "border-cyan-500/20 text-cyan-300",
    green: "border-green-500/30 text-green-300",
    rose: "border-rose-500/30 text-rose-300",
    yellow: "border-yellow-500/30 text-yellow-300",
    blue: "border-blue-500/30 text-blue-300",
  };

  return (
    <div className={`bg-[#06121f]/70 p-4 rounded-xl border ${colorClasses[color]} text-center`}>
      <p className="text-sm text-gray-400">{label}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}