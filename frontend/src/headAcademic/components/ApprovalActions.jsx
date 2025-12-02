import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ApprovalActions({ setShowConfirm, setApprovalType }) {
  return (
    <div className="bg-[#071122]/60 border border-cyan-500/20 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        Final Decision
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        Approve or reject final attendance.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setApprovalType("approve");
            setShowConfirm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600/40 rounded-lg"
        >
          <CheckCircle className="w-5 h-5" />
          Approve
        </button>

        <button
          onClick={() => {
            setApprovalType("reject");
            setShowConfirm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/40 rounded-lg"
        >
          <XCircle className="w-5 h-5" />
          Reject
        </button>
      </div>
    </div>
  );
}
