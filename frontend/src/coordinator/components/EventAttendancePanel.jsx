import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function EventAttendancePanel({ onStudentDetected }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const token = localStorage.getItem("token");

  const loadLiveAttendance = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/coordinator/attendance/live",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      console.log("LIVE DATA =>", data);

      if (data.students) {
        const formatted = data.students.map((s) => ({
          _id: s._id,
          name: s.fullName || s.name || "Unknown",
          course: s.course || "N/A",
          lecture: s.time || "N/A",
          score: Math.round((s.matchScore || 0) * 100),
          faceMatch: s.matchScore >= 0.6,
          location: s.locationMatched ? "Match" : "Mismatch",
          status: s.status || "Review",
          image: s.livePhotoUrl || s.registeredPhotoUrl || "",
        }));

        setStudents(formatted);
        if (formatted.length > 0) setSelectedStudent(formatted[0]);
      }
    } catch (err) {
      console.log("Error loading live attendance:", err);
    }
  };

  useEffect(() => {
    loadLiveAttendance();
  }, []);

  const handleMarkReviewed = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/coordinator/attendance/review/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      console.log("Reviewed =>", data);

      if (data.success) {
        setStudents((prev) =>
          prev.map((s) =>
            s._id === id
              ? { ...s, status: "Inside", faceMatch: true, location: "Match" }
              : s
          )
        );

        if (selectedStudent?._id === id) {
          setSelectedStudent({
            ...selectedStudent,
            status: "Inside",
            faceMatch: true,
            location: "Match",
          });
        }
      }
    } catch (err) {
      console.log("Error marking reviewed:", err);
    }
  };

  const handleExport = async () => {
    try {
      await fetch("http://localhost:5000/api/coordinator/attendance/export", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Class List Export started. Check backend downloads.");
    } catch (err) {
      console.log("Export error:", err);
    }
  };

  const detectNewStudent = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/coordinator/attendance/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ test: true }),
        }
      );

      const data = await res.json();
      console.log("New Student =>", data);

      if (data.student) {
        const s = data.student;

        const formatted = {
          _id: s._id,
          name: s.fullName || s.name || "Unknown",
          course: s.course || "N/A",
          lecture: s.time || "N/A",
          score: Math.round((s.matchScore || 0) * 100),
          faceMatch: s.matchScore >= 0.6,
          location: s.locationMatched ? "Match" : "Mismatch",
          status: s.status || "Review",
          image: s.livePhotoUrl || s.registeredPhotoUrl || "",
        };

        setStudents((prev) => [formatted, ...prev]);
        if (onStudentDetected) onStudentDetected(formatted);
      }
    } catch (err) {
      console.log("Error new entry:", err);
    }
  };

  const visibleStudents = useMemo(() => {
    let list = [...students];

    if (query.trim() !== "") {
      list = list.filter((s) =>
        (s.name || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter === "inside") list = list.filter((s) => s.status === "Inside");
    if (filter === "review") list = list.filter((s) => s.status === "Review");

    if (sortBy === "name")
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    if (sortBy === "score") list.sort((a, b) => b.score - a.score);
    if (sortBy === "status") {
      const order = { Inside: 0, Review: 1 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }

    return list;
  }, [students, query, filter, sortBy]);

  return (
    <div className="relative p-4 md:p-6">
      {/* BG SAME */}
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

      {/* MAIN PANEL – SAME UI */}
      <div className="relative z-10 bg-[#041622]/70 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-cyan-700/30 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">
            Live Attendance Panel
          </h1>

          <button
            onClick={detectNewStudent}
            className="px-3 py-2 bg-cyan-500 text-black rounded-lg font-semibold"
          >
            + Simulate Live Entry
          </button>
        </div>

        {/* SEARCH + FILTER + SORT UI SAME */}
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

        {/* TABLE + RIGHT PANEL SAME */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table */}
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
                    key={s._id}
                    onClick={() => setSelectedStudent(s)}
                    whileHover={{ scale: 1.01 }}
                    className={`cursor-pointer border-b border-cyan-800/20 ${
                      selectedStudent?._id === s._id
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

          {/* RIGHT QUICK VIEW (unchanged) */}
          <div>
            {selectedStudent ? (
              <motion.div
                key={selectedStudent._id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#041622] p-6 rounded-xl border border-cyan-700/20 shadow-xl flex flex-col items-center"
              >
                <img
                  src={selectedStudent.image}
                  className="w-24 h-24 rounded-full mb-4"
                />

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

                <div className="text-white font-semibold">
                  {selectedStudent.name}
                </div>
                <div className="text-slate-400 text-sm mb-4">
                  {selectedStudent.course}
                </div>

                <div className="w-full grid gap-2">
                  {selectedStudent.status === "Review" && (
                    <button
                      className="py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30"
                      onClick={() => handleMarkReviewed(selectedStudent._id)}
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
