// src/pages/EventAttendancePanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import backBtn from "../assets/back-button.png";

/**
 * EventAttendancePanel — Interactive version
 * Features:
 *  - Real-time search by name
 *  - Filter: All / Inside / Review
 *  - Sort: Name A→Z | Score High→Low | Status (Inside first)
 *  - Dynamic row count
 *  - Selected row highlights + right-side dynamic quick view
 *  - Blob background + back button (same as login)
 */

export default function EventAttendancePanel() {
  // dummy data (kept client-side)
  const initialStudents = [
    { id: 1, name: "Q-ID", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: true, status: "Inside", image: "https://i.pravatar.cc/150?img=11", score: 92 },
    { id: 2, name: "O-ID", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: true, status: "Inside", image: "https://i.pravatar.cc/150?img=12", score: 95 },
    { id: 3, name: "Marrol", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: true, status: "Inside", image: "https://i.pravatar.cc/150?img=13", score: 88 },
    { id: 4, name: "Fthnat", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: true, status: "Inside", image: "https://i.pravatar.cc/150?img=14", score: 96 },
    { id: 5, name: "Susreph", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: true, status: "Inside", image: "https://i.pravatar.cc/150?img=15", score: 91 },
    { id: 6, name: "Cue Mect", course: "CSE / 2nd", lecture: "10:00 AM", faceMatch: false, status: "Review", image: "https://i.pravatar.cc/150?img=16", score: 55 },
  ];

  const [students] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // UI controls
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | inside | review
  const [sortBy, setSortBy] = useState("name"); // name | score | status

  // stats (dummy)
  const stats = [
    { label: "Approved Students", value: 198 },
    { label: "Total Event Hours", value: "8 hrs" },
    { label: "Verified Entries", value: 215 },
    { label: "Location Failures", value: 3 },
  ];

  // set default selected student once on mount
  useEffect(() => {
    if (students.length > 0) setSelectedStudent(students[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filtered + searched + sorted list (memoized)
  const visibleStudents = useMemo(() => {
    let list = [...students];

    // search by name (case-insensitive)
    if (query.trim() !== "") {
      const q = query.trim().toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    // filter
    if (filter === "inside") {
      list = list.filter((s) => s.status.toLowerCase() === "inside");
    } else if (filter === "review") {
      list = list.filter((s) => s.status.toLowerCase() === "review");
    }

    // sort
    if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "score") {
      list.sort((a, b) => b.score - a.score); // desc
    } else if (sortBy === "status") {
      // inside first then review (stable)
      const order = { inside: 0, review: 1 };
      list.sort((a, b) => (order[a.status.toLowerCase()] ?? 2) - (order[b.status.toLowerCase()] ?? 2));
    }

    // ensure selectedStudent remains selected if still visible
    if (selectedStudent && !list.find((s) => s.id === selectedStudent.id)) {
      // if selected is filtered out, select first visible
      list.length > 0 && setSelectedStudent(list[0]);
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, query, filter, sortBy]);

  // row click handler
  const onRowClick = (stu) => {
    setSelectedStudent(stu);
    // optional: scroll right panel into view or show animation (handled by framer-motion)
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden p-8">

      {/* BACK BUTTON (same style as login) */}
      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.07 }}
        className="absolute top-6 left-6 z-50 w-12 h-12 cursor-pointer rounded-full
          shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,255,255,1)]
          transition-all duration-300 p-2 bg-[#0a0f1f]/60 backdrop-blur-md"
      />

      {/* BLOB BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.35, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: "rgba(0,150,255,0.9)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.6px)",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[520px] h-[520px] bg-blue-600/30 rounded-full blur-[120px]"></div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-300 drop-shadow-[0_0_12px_rgba(0,200,255,0.5)]">
            Event Attendance Panel
          </h1>

          <div className="flex items-center gap-4">
            <div className="bg-[#041622] px-3 py-2 rounded-lg border border-cyan-700/20 flex items-center gap-3">
              <img src="https://i.pravatar.cc/100?img=20" alt="coord" className="w-10 h-10 rounded-full ring-2 ring-cyan-400/40" />
              <div>
                <div className="text-cyan-200 font-semibold text-sm">Dr. Aris Thone</div>
                <div className="text-gray-400 text-xs">CSE Dept.</div>
              </div>
            </div>

            {/* row count */}
            <div className="text-sm text-slate-300 bg-[#041622] px-3 py-2 rounded-lg border border-cyan-700/10">
              <span className="text-cyan-300 font-semibold">{visibleStudents.length}</span>
              <span className="ml-2 text-slate-400">students shown</span>
            </div>
          </div>
        </div>

        {/* STATS (small) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((it, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="bg-[#041622] p-4 rounded-lg border border-cyan-700/20">
              <div className="text-sm text-slate-400">{it.label}</div>
              <div className="text-xl font-bold text-cyan-300">{it.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Controls: Search / Filter / Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between mb-6">
          {/* Left: search + filter */}
          <div className="flex items-center gap-3 w-full md:w-2/3">
            <div className="flex items-center bg-[#041622] px-3 py-2 rounded-xl border border-cyan-700/20 w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full bg-transparent outline-none text-white placeholder:text-slate-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-slate-400 text-sm px-2 py-1 rounded hover:text-cyan-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* filter buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "all" ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30" : "bg-[#041622] text-slate-300 border border-cyan-700/10"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("inside")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "inside" ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30" : "bg-[#041622] text-slate-300 border border-cyan-700/10"}`}
              >
                Inside
              </button>
              <button
                onClick={() => setFilter("review")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "review" ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30" : "bg-[#041622] text-slate-300 border border-cyan-700/10"}`}
              >
                Review
              </button>
            </div>
          </div>

          {/* Right: sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-sm text-slate-300">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#041622] px-3 py-2 rounded-lg border border-cyan-700/20 text-white outline-none"
            >
              <option value="name">Name A → Z</option>
              <option value="score">Score High → Low</option>
              <option value="status">Status (Inside → Review)</option>
            </select>
          </div>
        </div>

        {/* MAIN GRID: table + right quick view */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Table (span 2) */}
          <div className="lg:col-span-2 bg-[#041622] p-4 rounded-xl border border-cyan-700/20 shadow-xl">

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-cyan-700/30">
                    <th className="py-3 pl-3">Student</th>
                    <th>Course</th>
                    <th>Lecture</th>
                    <th>Face Match</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">No students found</td>
                    </tr>
                  ) : (
                    visibleStudents.map((s) => (
                      <motion.tr
                        key={s.id}
                        onClick={() => onRowClick(s)}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        whileHover={{ scale: 1.01 }}
                        className={`cursor-pointer border-b border-cyan-800/20 transition-all ${selectedStudent?.id === s.id ? "bg-cyan-600/10" : "hover:bg-cyan-600/5"}`}
                      >
                        <td className="py-3 pl-3 flex items-center gap-3">
                          <img src={s.image} alt={s.name} className="w-10 h-10 rounded-full ring-2 ring-cyan-500/20" />
                          <div className="text-white font-medium">{s.name}</div>
                        </td>
                        <td className="text-slate-300">{s.course}</td>
                        <td className="text-slate-300">{s.lecture}</td>
                        <td>
                          {s.faceMatch ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-400/20 text-sm">✓</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-400/20 text-sm">✕</span>
                          )}
                        </td>
                        <td>
                          {s.status === "Inside" ? (
                            <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-300 border border-green-500/20 text-sm">Inside</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/20 text-sm">Review</span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center text-sm text-cyan-300">Help / Support</div>
          </div>

          {/* RIGHT: Dynamic Quick View */}
          <div>
            {selectedStudent ? (
              <motion.div
                key={selectedStudent.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.28 }}
                className="bg-[#041622] p-6 rounded-xl border border-cyan-700/20 shadow-xl flex flex-col items-center"
              >
                <img src={selectedStudent.image} alt="" className="w-24 h-24 rounded-full ring-4 ring-cyan-600/30 mb-4 object-cover" />

                <div className="relative w-36 h-36 mb-4">
                  <svg className="absolute inset-0" viewBox="0 0 36 36">
                    <path stroke="#08313f" strokeWidth="3" fill="none" d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0 -32" />
                    <path stroke="#00eaff" strokeWidth="3" fill="none" strokeDasharray={`${selectedStudent.score},100`} strokeLinecap="round" d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0 -32" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    {selectedStudent.score}%
                  </div>
                </div>

                <div className="text-white font-semibold">{selectedStudent.name}</div>
                <div className="text-slate-400 text-sm mb-4">{selectedStudent.course}</div>

                <div className="w-full flex flex-col gap-2">
                  <button className="w-full py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30">
                    Mark as Reviewed
                  </button>
                  <button className="w-full py-2 bg-cyan-500 text-black font-semibold rounded-lg">
                    Export Class List
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#041622] p-6 rounded-xl border border-cyan-700/20 shadow-xl text-slate-400 text-center">
                No student selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


