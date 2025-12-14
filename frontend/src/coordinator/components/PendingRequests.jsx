import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function PendingRequests({ data = [], refresh }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(null);

  const handleApproveBackend = async (student) => {
    try {
      setLoading(student._id);

      const res = await fetch(
        `http://localhost:5000/api/coordinator/review/approve/${student._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      console.log("APPROVED:", json);

      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const handleRejectBackend = async (student) => {
    try {
      setLoading(student._id);

      const res = await fetch(
        `http://localhost:5000/api/coordinator/review/reject/${student._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      console.log("REJECTED:", json);

      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-10 w-full bg-[#06121f]/60 border border-cyan-500/20 rounded-2xl 
      p-6 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)]">

      <h2 className="text-xl font-bold text-cyan-300 mb-6">
        SECTION 1 — PENDING REQUESTS TABLE
      </h2>

      <div className="space-y-6">

        {data.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No Pending Requests 🙂
          </p>
        )}

        {data.map((student) => (
          <motion.div
            key={student._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0b1b2a]/60 border border-cyan-500/20 rounded-xl p-6 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* STUDENT INFO */}
              <div className="space-y-2">
                <h3 className="text-cyan-300 font-semibold">Student Info</h3>

                <div className="text-gray-300 text-sm">
                  <p><span className="text-cyan-400">ID:</span> {student.studentId}</p>
                  <p><span className="text-cyan-400">Name:</span> {student.fullName}</p>
                  <p><span className="text-cyan-400">Course:</span> {student.course}</p>
                  <p><span className="text-cyan-400">Year:</span> {student.year}</p>
                </div>

                <p className="text-sm mt-2 text-cyan-400">
                  Face Match Score: {student.matchScore?.toFixed(2)}
                </p>
              </div>

              {/* PHOTOS */}
              <div className="flex flex-col items-center">
                <div className="flex gap-4">
                  <img
                    src={student.livePhotoUrl}
                    className="w-20 h-20 rounded-xl border border-cyan-500/20 object-cover"
                  />
                  <img
                    src={student.registeredPhotoUrl}
                    className="w-20 h-20 rounded-xl border border-cyan-500/20 object-cover"
                  />
                </div>

                <div className="mt-4">
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-400 
                    flex items-center justify-center text-cyan-300 font-bold text-lg">
                    {(student.matchScore * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-4 justify-center">
                <button
                  disabled={loading === student._id}
                  onClick={() => handleApproveBackend(student)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl
                    ${
                      loading === student._id
                        ? "bg-green-500/10 text-green-400 cursor-wait"
                        : "bg-green-600/20 text-green-300 border border-green-500/40"
                    }
                  `}
                >
                  <Check size={18} />
                  {loading === student._id ? "Approving..." : "Approve"}
                </button>

                <button
                  disabled={loading === student._id}
                  onClick={() => handleRejectBackend(student)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl
                    ${
                      loading === student._id
                        ? "bg-red-500/10 text-red-400 cursor-wait"
                        : "bg-red-600/20 text-red-300 border border-red-500/40"
                    }
                  `}
                >
                  <X size={18} />
                  {loading === student._id ? "Rejecting..." : "Reject"}
                </button>
              </div>

            </div>

            {/* BOTTOM ROW */}
            <div className="mt-6 border-t border-cyan-500/10 pt-4">
              <div className="grid grid-cols-3 text-sm text-gray-400">

                <div>
                  <p className="text-cyan-300 font-semibold">Distance</p>
                  <p>{student.distanceMeters?.toFixed(2)} m</p>
                </div>

                <div>
                  <p className="text-cyan-300 font-semibold">Location Match</p>
                  <p className={student.locationMatched ? "text-green-300" : "text-red-300"}>
                    {student.locationMatched ? "Matched" : "Not Matched"}
                  </p>
                </div>

              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}