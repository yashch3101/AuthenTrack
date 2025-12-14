import React from "react";
import { FileText } from "lucide-react";

export default function EventSummary({ eventData }) {
  if (!eventData) {
    return (
      <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 text-center text-gray-400">
        Loading event details...
      </div>
    );
  }

  return (
    <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        Event Summary
      </h2>

      <ul className="space-y-3 text-sm text-gray-200">

        {/* Event Name */}
        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Event Name</div>
            <div className="font-medium">{eventData.eventName}</div>
          </div>
        </li>

        {/* Venue */}
        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Venue</div>
            <div className="font-medium">{eventData.eventVenue}</div>
          </div>
        </li>

        {/* Coordinator Name */}
        <li className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-cyan-300 mt-1" />
          <div>
            <div className="text-xs text-gray-400">Coordinator</div>
            <div className="font-medium">
              {eventData.createdBy?.fullName || "Unknown"}
            </div>
          </div>
        </li>

        {/* Approved Students + Verified Submissions */}
        <li className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-[#04131a]/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400">Approved Students</div>
            <div className="font-bold text-xl text-cyan-300">
              {eventData.approvedStudents || 0}
            </div>
          </div>

          <div className="bg-[#04131a]/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400">Verified Submissions</div>
            <div className="font-bold text-xl text-cyan-300">
              {eventData.verifiedCount || 0}
            </div>
          </div>
        </li>

      </ul>
    </div>
  );
}
