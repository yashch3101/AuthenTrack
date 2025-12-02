import React from "react";
import { X, Check } from "lucide-react";

export default function ApprovedList({ approved, onClose, onSubmit }) {
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
            {/* LEFT SIDE: IMAGE + TEXT */}
            <div className="flex items-center gap-3">
              {/* PHOTO CIRCLE */}
              <img
                src={s.photo1}
                className="w-12 h-12 rounded-full border border-green-500/40 shadow-md"
              />

              <div>
                <h3 className="text-green-300 font-semibold">{s.name}</h3>
                <p className="text-gray-400 text-sm">{s.course}</p>
                <p className="text-gray-500 text-xs">{s.id}</p>
              </div>
            </div>

            {/* RIGHT VERIFIED BOX */}
            <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-500/40 flex items-center justify-center">
              <Check size={18} className="text-green-300" />
            </div>
          </div>
        ))}

      </div>

      {/* SUBMIT BUTTON */}
      {approved.length > 0 && (
        <button
          onClick={onSubmit}  // ⭐ SUBMIT → PDF PAGE + AUTOGEN
          className="w-full mt-5 py-3 bg-green-500 text-black font-semibold rounded-xl 
          hover:bg-green-400 transition shadow-[0_0_15px_rgba(0,255,0,0.4)]"
        >
          Submit to Director
        </button>
      )}

    </div>
  );
}