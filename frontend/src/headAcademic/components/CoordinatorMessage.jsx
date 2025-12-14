import React from "react";

export default function CoordinatorMessage({ message }) {
  return (
    <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-300 mb-3">
        Message From Coordinator
      </h2>

      <div className="text-sm text-gray-300 leading-relaxed bg-[#011219]/50 p-4 rounded-lg">
        {message && message.trim() !== "" ? (
          <>
            {message}
          </>
        ) : (
          <>
            Dear Academic Head,
            <br />
            All student entries have been verified. Please review and approve the final attendance report.
          </>
        )}
      </div>
    </div>
  );
}
