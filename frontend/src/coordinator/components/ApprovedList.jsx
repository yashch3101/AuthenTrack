import React, { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

export default function ApprovedList({ onClose, onSubmit }) {
  const [approved, setApproved] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadApproved() {
      try {
        const res = await fetch(
          "https://authentrack-backend.onrender.com/api/coordinator/review/verified",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Approved Loaded =>", data);

        if (data.verified) setApproved(data.verified);
      } catch (err) {
        console.log("Error loading approved:", err);
      }
    }

    loadApproved();
  }, []);

  const removeApproved = async (id) => {
    try {
      const res = await fetch(
        `https://authentrack-backend.onrender.com/api/coordinator/review/reject/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Removed =>", data);

      if (data.message) {
        setApproved((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.log("Error removing:", err);
    }
  };

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-300">Approved List</h2>

        <X
          size={24}
          className="cursor-pointer text-gray-400 hover:text-red-400"
          onClick={onClose}
        />
      </div>

      {/* EMPTY */}
      {approved.length === 0 && (
        <p className="text-gray-400 text-sm mt-10 text-center">
          No approvals yet
        </p>
      )}

      {/* APPROVED ENTRIES */}
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">

        {approved.map((s, i) => (
          <div
            key={i}
            className="bg-[#0c1a27]/60 p-4 rounded-lg border border-green-500/20 
            flex items-center justify-between shadow-[0_0_12px_rgba(0,255,0,0.15)]"
          >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <img
                src={s.registeredPhotoUrl}
                className="w-12 h-12 rounded-full border border-green-500/40 shadow-md object-cover"
              />

              <div>
                <h3 className="text-green-300 font-semibold">{s.fullName}</h3>
                <p className="text-gray-400 text-sm">{s.course}</p>
                <p className="text-gray-500 text-xs">{s.studentId}</p>
              </div>
            </div>

            {/* RIGHT VERIFIED BOX */}
            <div className="flex flex-col items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/40 flex items-center justify-center">
                <Check size={18} className="text-green-300" />
              </div>

              <button
                onClick={() => removeApproved(s._id)}
                className="text-red-400 text-xs hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* SUBMIT BUTTON */}
      {approved.length > 0 && (
        <button
          onClick={onSubmit}
          className="w-full mt-5 py-3 bg-green-500 text-black font-semibold rounded-xl 
          hover:bg-green-400 transition shadow-[0_0_15px_rgba(0,255,0,0.4)]"
        >
          Submit to Director
        </button>
      )}

    </div>
  );
}