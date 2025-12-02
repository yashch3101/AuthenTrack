import React from "react";
import { FileText } from "lucide-react";

export default function EventSummary() {
  return (
    <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        Event Summary
      </h2>

      <ul className="space-y-3 text-sm text-gray-200">

        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Event Name</div>
            <div className="font-medium">AI Robotics Workshop</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Venue</div>
            <div className="font-medium">Auditorium B</div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Coordinator</div>
            <div className="font-medium">Dr. Anya Sharma</div>
          </div>
        </li>

        <li className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-[#04131a]/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400">Approved Students</div>
            <div className="font-bold text-xl text-cyan-300">212</div>
          </div>

          <div className="bg-[#04131a]/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400">Verified Submissions</div>
            <div className="font-bold text-xl text-cyan-300">215</div>
          </div>
        </li>

      </ul>
    </div>
  );
}
