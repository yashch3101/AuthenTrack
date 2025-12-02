import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, PlusCircle, Send, MapPin, Users } from "lucide-react";

export default function Events() {
  const [showForm, setShowForm] = useState(false);

  const [events, setEvents] = useState([
    {
      id: "E-001",
      name: "Tech Innovation Summit",
      date: "2025-01-20",
      venue: "Auditorium Hall",
      status: "Pending Director Approval",
    },
    {
      id: "E-002",
      name: "Cultural Fest 2025",
      date: "2025-02-10",
      venue: "Main Ground",
      status: "Approved",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    venue: "",
    description: "",
  });

  const handleEventSubmit = () => {
    const push = {
      id: "E-" + (events.length + 1).toString().padStart(3, "0"),
      name: newEvent.name,
      date: newEvent.date,
      venue: newEvent.venue,
      status: "Pending Director Approval",
    };

    setEvents([...events, push]);
    setNewEvent({ name: "", date: "", venue: "", description: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-[#06121f]/70 border border-cyan-500/20 p-8 rounded-2xl 
    backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,255,0.15)]">

      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cyan-300">Events Management</h2>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cyan-500/20 text-cyan-300 
          border border-cyan-500/40 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition"
        >
          <PlusCircle size={18} />
          Create Event
        </button>
      </div>

      {/* EVENT CARDS */}
      <div className="space-y-5">
        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0b1b2a]/60 p-5 rounded-xl border border-cyan-500/20"
          >
            <h3 className="text-xl font-semibold text-cyan-200">{ev.name}</h3>

            <div className="text-gray-300 text-sm mt-2 flex flex-col gap-1">
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                {ev.date}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                {ev.venue}
              </p>

              <p className="flex items-center gap-2 mt-1">
                <Users size={16} className="text-cyan-400" />
                <span
                  className={`${
                    ev.status.includes("Approved")
                      ? "text-green-300"
                      : "text-yellow-300"
                  }`}
                >
                  {ev.status}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CREATE EVENT POPUP FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[99]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0b1b2a] p-8 rounded-2xl border border-cyan-500/30 shadow-xl"
          >
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Create Event</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#06121f] border border-cyan-500/20 text-white outline-none"
              />

              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#06121f] border border-cyan-500/20 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Venue"
                value={newEvent.venue}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, venue: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#06121f] border border-cyan-500/20 text-white outline-none"
              />

              <textarea
                placeholder="Description..."
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-[#06121f] border border-cyan-500/20 text-white outline-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleEventSubmit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold shadow-lg"
              >
                <Send size={18} />
                Submit to Director
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}