import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function PdfGenerator({ approved = [], eventId }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const generatePDF = async () => {
    if (approved.length === 0) {
      return alert("No approved students available.");
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://authentrack-backend.onrender.com/api/coordinator/pdf/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
            approvedList: approved,
            eventId: eventId,
          }),
        }
      );

      const data = await response.json();
      console.log("PDF RESPONSE => ", data);

      if (data.success) {
        alert("PDF Generated & Sent Successfully ✔");

        if (data.pdfUrl) {
          window.open(data.pdfUrl, "_blank");
        }
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.log("PDF ERROR => ", err);
      alert("Server error while generating PDF");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#06121f]/70 border border-cyan-500/30 rounded-2xl p-8 
      backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.25)] mt-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText size={28} className="text-cyan-300" />
        <h1 className="text-2xl font-bold text-cyan-300">
          Final PDF – Verified Attendance List
        </h1>
      </div>

      <div className="mt-4">
        <label className="text-gray-300">Message to Director (optional)</label>
        <textarea
          className="w-full bg-[#041622] border border-cyan-500/20 rounded-xl p-4 
          mt-2 text-white outline-none placeholder-gray-400"
          placeholder="Add an optional note for the Director..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-cyan-300 mb-3">
          Approved Students ({approved.length})
        </h2>

        {approved.length === 0 ? (
          <div className="text-gray-400 text-sm mt-3">
            No approved students available.
          </div>
        ) : (
          <div className="space-y-4">
            {approved.map((s, i) => (
              <div
                key={i}
                className="bg-[#0b1b2a]/50 border border-cyan-500/20 rounded-xl p-4 
                flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={s.livePhotoUrl || s.registeredPhotoUrl}
                    className="w-14 h-14 rounded-xl border border-cyan-500/20"
                  />
                  <div>
                    <p className="text-white font-semibold">{s.name}</p>
                    <p className="text-gray-400 text-sm">{s.course}</p>
                    <p className="text-cyan-300">Face Match: {(s.matchScore * 100).toFixed(0)}%</p>
                  </div>
                </div>

                <span className="px-3 py-1 text-sm bg-green-600/20 
                text-green-300 border border-green-500/30 rounded-lg">
                  Approved
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          onClick={generatePDF}
          className={`px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 
            text-black font-semibold rounded-xl flex items-center gap-3
            shadow-[0_0_25px_rgba(0,255,255,0.5)]
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Download size={20} />
          {loading ? "Generating PDF..." : "Generate PDF & Send"}
        </motion.button>
      </div>
    </motion.div>
  );
}
