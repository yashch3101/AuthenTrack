import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function EventAttendancePanel({ onStudentDetected }) {

  const initialStudents = [
    {
      id: 1,
      name: "Q-ID",
      course: "CSE / 2nd",
      lecture: "10:00 AM",
      faceMatch: true,
      location: "Match",
      status: "Inside",
      image: "https://i.pravatar.cc/150?img=11",
      score: 92,
    },
    {
      id: 2,
      name: "Q-ID",
      course: "CSE / 2nd",
      lecture: "10:00 AM",
      faceMatch: true,
      location: "Mismatch",
      status: "Review",
      image: "https://i.pravatar.cc/150?img=12",
      score: 55,
    },
    {
      id: 3,
      name: "Marrol",
      course: "CSE / 2nd",
      lecture: "10:00 AM",
      faceMatch: true,
      location: "Match",
      status: "Inside",
      image: "https://i.pravatar.cc/150?img=13",
      score: 88,
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    if (students.length > 0) setSelectedStudent(students[0]);
  }, []);

  const visibleStudents = useMemo(() => {
    let list = [...students];

    if (query.trim() !== "") {
      const q = query.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (filter === "inside") list = list.filter((s) => s.status === "Inside");
    if (filter === "review") list = list.filter((s) => s.status === "Review");

    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "score") list.sort((a, b) => b.score - a.score);
    if (sortBy === "status") {
      const order = { Inside: 0, Review: 1 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }

    return list;
  }, [students, query, filter, sortBy]);

  const detectNewStudent = () => {
    const newId = "LIVE-" + Math.floor(1000 + Math.random() * 9000);

    const newStudent = {
      id: newId,
      name: `Student ${newId}`,
      course: "BCA / 1st",
      year: "1st",
      lecture: "10:00 AM",
      faceMatch: `${60 + Math.floor(Math.random() * 40)}%`,
      photo1: "https://i.pravatar.cc/150?img=54",
      photo2: "https://i.pravatar.cc/150?img=47",
      image: "https://i.pravatar.cc/150?img=66",
      location: Math.random() > 0.2 ? "Match" : "Mismatch",
      status: Math.random() > 0.3 ? "Inside" : "Review",
      score: 60 + Math.floor(Math.random() * 40),
      subjects: ["Event"],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setStudents((prev) => [newStudent, ...prev]);

    if (onStudentDetected) onStudentDetected(newStudent);
  };

  const handleMarkReviewed = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "Inside",
              location: "Match",
              faceMatch: true,
              score: 85,
            }
          : s
      )
    );
  };
  const handleExport = () => {
    alert("Export Class List called (backend generate karega)");
  };

  return (
    <div className="relative p-4 md:p-6">

      {/* Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.3, 1] }}
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
          <div className="w-[420px] h-[420px] bg-blue-600/20 rounded-full blur-[110px]"></div>
        </div>
      </div>

      {/* PANEL */}
      <div className="relative z-10 bg-[#041622]/70 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-cyan-700/30 shadow-xl">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">Live Attendance Panel</h1>

          <button
            onClick={detectNewStudent}
            className="px-3 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
          >
            + Simulate Live Entry
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between mb-6">
          <div className="flex items-center gap-3 w-full md:w-2/3">
            <div className="flex items-center bg-[#041622] px-3 py-2 rounded-xl border border-cyan-700/20 w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full bg-transparent outline-none text-white"
              />
            </div>

            <div className="flex gap-2">
              {["all", "inside", "review"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    filter === f
                      ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                      : "bg-[#041622] text-slate-300 border border-cyan-700/10"
                  }`}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-300">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#041622] px-3 py-2 rounded-lg border border-cyan-700/20 text-white"
            >
              <option value="name">Name A→Z</option>
              <option value="score">Score High→Low</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* TABLE + RIGHT PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* TABLE */}
          <div className="lg:col-span-2 bg-[#041622] p-4 rounded-xl border border-cyan-700/20 shadow-xl overflow-x-auto">

            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-cyan-700/30">
                  <th className="py-3 pl-3">Student</th>
                  <th>Course</th>
                  <th>Lecture</th>
                  <th>Face</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {visibleStudents.map((s) => (
                  <motion.tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    whileHover={{ scale: 1.01 }}
                    className={`cursor-pointer border-b border-cyan-800/20 ${
                      selectedStudent?.id === s.id
                        ? "bg-cyan-600/10"
                        : "hover:bg-cyan-600/5"
                    }`}
                  >
                    <td className="py-3 pl-3 flex items-center gap-3">
                      <img src={s.image} className="w-10 h-10 rounded-full" />
                      <div className="text-white">{s.name}</div>
                    </td>

                    <td className="text-slate-300">{s.course}</td>
                    <td className="text-slate-300">{s.lecture}</td>

                    {/* Face Match */}
                    <td>
                      {s.faceMatch ? (
                        <span className="px-2 py-1 rounded-full bg-green-600/20 text-green-300 border border-green-500/30 text-xs">
                          Match
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-xs">
                          Fail
                        </span>
                      )}
                    </td>

                    {/* Location */}
                    <td>
                      {s.location === "Match" ? (
                        <span className="px-2 py-1 rounded-full bg-green-600/20 text-green-300 border border-green-500/30 text-xs">
                          Match
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-xs">
                          Mismatch
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td>
                      {s.status === "Inside" ? (
                        <span className="px-2 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/20 text-xs">
                          Inside
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-500/20 text-xs">
                          Review
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT QUICK VIEW */}
          <div>
            {selectedStudent ? (
              <motion.div
                key={selectedStudent.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#041622] p-6 rounded-xl border border-cyan-700/20 shadow-xl flex flex-col items-center"
              >
                <img
                  src={selectedStudent.image}
                  className="w-24 h-24 rounded-full mb-4"
                />

                {/* Score Circle */}
                <div className="relative w-36 h-36 mb-4">
                  <svg className="absolute inset-0" viewBox="0 0 36 36">
                    <path
                      stroke="#08313f"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2a16 16 0 1 1 0 32"
                    />
                    <path
                      stroke="#00eaff"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${selectedStudent.score},100`}
                      strokeLinecap="round"
                      d="M18 2a16 16 0 1 1 0 32"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    {selectedStudent.score}%
                  </div>
                </div>

                <div className="text-white font-semibold">{selectedStudent.name}</div>
                <div className="text-slate-400 text-sm mb-4">{selectedStudent.course}</div>

                {/* BUTTONS */}
                <div className="w-full grid gap-2">

                  {selectedStudent.status === "Review" && (
                    <button
                      className="py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30"
                      onClick={() => handleMarkReviewed(selectedStudent.id)}
                    >
                      Mark as Reviewed
                    </button>
                  )}

                  <button
                    className="py-2 bg-cyan-500 text-black rounded-lg font-semibold"
                    onClick={handleExport}
                  >
                    Export Class List
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="bg-[#041622] p-6 rounded-xl border border-cyan-700/20 text-center text-slate-400">
                No student selected
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}