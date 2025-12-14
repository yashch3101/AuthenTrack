import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CoordinatorNavbar from "./components/CoordinatorNavbar";
import PendingRequests from "./components/PendingRequests";
import ApprovedList from "./components/ApprovedList";
import Events from "./components/Events";
import PdfGenerator from "./components/PdfGenerator";

export default function CoordinatorDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [eventId, setEventId] = useState(null);

  const token = localStorage.getItem("token");

  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [verifiedEntries] = useState(0);
  const [locationFailures] = useState(0);
  const [suspiciousAttempts] = useState(0);
  const [totalEventHours] = useState("8 hrs");

  // -----------------------------
  // ⭐ 1. Load Pending
  // -----------------------------
  const loadPending = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/coordinator/review/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setPending(data.pending || []);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // ⭐ 2. Load Verified
  // -----------------------------
  const loadApproved = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/coordinator/review/verified",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setApproved(data.verified || []);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // ⭐ 3. Run on Page Load
  // -----------------------------
  useEffect(() => {
    loadPending();
    loadApproved();
  }, []);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch("http://localhost:5000/api/coordinator/event/latest");
        const data = await res.json();
        if (data.success) {
          setEventId(data.event._id);
        }
      } catch (err) {
        console.log("EVENT LOAD ERROR", err);
      }
    }
    fetchEvent();
  }, []);

  // -----------------------------
  // ⭐ 4. APPROVE (OPTIONAL: used by ApprovedList)
  // -----------------------------
  const handleApprove = async (student) => {
    try {
      await fetch(
        `http://localhost:5000/api/coordinator/review/approve/${student._id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      loadPending();
      loadApproved();
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // ⭐ 5. REJECT (OPTIONAL: used by ApprovedList)
  // -----------------------------
  const handleReject = async (student) => {
    try {
      await fetch(
        `http://localhost:5000/api/coordinator/review/reject/${student._id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      loadPending();
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // ⭐ 6. Remove approved (UI only)
  // -----------------------------
  const handleRemoveApproved = (id) => {
    setApproved((prev) => prev.filter((s) => s._id !== id));
  };

  // -----------------------------
  // ⭐ 7. PDF GENERATION
  // -----------------------------
  const openPdfAndGenerate = () => {
    setActiveSection("pdf");

    setTimeout(() => {
      const ev = new CustomEvent("generate-pdf");
      window.dispatchEvent(ev);
    }, 300);
  };

  // Check Approved panel open
  const isApprovedPanelOpen = activeSection === "approved";

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[900px] h-[900px] bg-cyan-500/25 blur-[200px] absolute 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <CoordinatorNavbar onSelect={setActiveSection} />

      <div className="pt-32 max-w-7xl mx-auto px-6 pb-24 relative">

        {/* STATS */}
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
            <Events />
          </motion.div>
        )}

        {activeSection === "pending" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PendingRequests
              data={pending}
              refresh={() => {
                loadPending();
                loadApproved();
              }}
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
            <PdfGenerator approved={approved} eventId={eventId} />
          </motion.div>
        )}

      </div>

      {/* APPROVED SIDE PANEL */}
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
          eventId={eventId}
          onClose={() => setActiveSection("pending")}
          onSubmit={() => openPdfAndGenerate(eventId)}
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