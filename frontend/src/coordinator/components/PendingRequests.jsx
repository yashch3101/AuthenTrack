import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function PendingRequests({ data, onApprove, onReject }) {

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

        {data.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0b1b2a]/60 border border-cyan-500/20 rounded-xl p-6 shadow-lg"
          >

            {/* TOP ROW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Student Info */}
              <div className="space-y-2">
                <h3 className="text-cyan-300 font-semibold">Student Info</h3>

                <div className="text-gray-300 text-sm">
                  <p><span className="text-cyan-400">ID:</span> {student.id}</p>
                  <p><span className="text-cyan-400">Name:</span> {student.name}</p>
                  <p><span className="text-cyan-400">Course:</span> {student.course}</p>
                  <p><span className="text-cyan-400">Year:</span> {student.year}</p>
                </div>

                <p className="text-sm mt-2 text-cyan-400">
                  Face Match Score: {student.faceMatch}
                </p>
              </div>

              {/* Photos */}
              <div className="flex flex-col items-center">
                <div className="flex gap-4">
                  <img src={student.photo1} className="w-20 h-20 rounded-xl border border-cyan-500/20" />
                  <img src={student.photo2} className="w-20 h-20 rounded-xl border border-cyan-500/20" />
                </div>

                <div className="mt-4">
                  <div className="w-16 h-16 rounded-full border-4 border-cyan-400 
                    flex items-center justify-center text-cyan-300 font-bold text-lg 
                    shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                    {student.faceMatch}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 justify-center">
                <button
                  onClick={() => onApprove(student)}
                  className="flex items-center justify-center gap-2 bg-green-600/20 
                  border border-green-500/40 py-2 rounded-xl text-green-300 
                  hover:bg-green-600/30 transition"
                >
                  <Check size={18} /> Approve
                </button>

                <button
                  onClick={() => onReject(student)}
                  className="flex items-center justify-center gap-2 bg-red-600/20 
                  border border-red-500/40 py-2 rounded-xl text-red-300 
                  hover:bg-red-600/30 transition"
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="mt-6 border-t border-cyan-500/10 pt-4">
              <div className="grid grid-cols-3 text-sm text-gray-400">

                <div>
                  <p className="text-cyan-300 font-semibold">Event Time</p>
                  <p>{student.time}</p>
                </div>

                <div>
                  <p className="text-cyan-300 font-semibold">Location Match</p>
                  <p className={student.location === "Match" ? "text-green-300" : "text-red-300"}>
                    {student.location}
                  </p>
                </div>

                <div>
                  <p className="text-cyan-300 font-semibold">Subjects</p>
                  <div className="flex gap-2 mt-1">
                    {student.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="bg-cyan-600/20 px-2 py-1 rounded-md border border-cyan-400/20 text-cyan-300"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}

