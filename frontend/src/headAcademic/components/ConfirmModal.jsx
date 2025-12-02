import React from "react";
import { motion } from "framer-motion";

export default function ConfirmModal({
  approvalType,
  setShowConfirm,
  signatureImage,
  setApproved,
  setPdfUrl,
  setFinalPdfUrl,
  setShareUrl,
  setShowFinalPopup
}) {

  const handleApprove = () => {

    // Backend-generated signed PDF (dummy for now)
    const finalPdf = "/assets/final-approved-attendance.pdf";
    const shareLink = "https://event.com/final/XYZ123";

    setApproved(true);
    setPdfUrl(finalPdf);
    setFinalPdfUrl(finalPdf);
    setShareUrl(shareLink);

    // Show popup
    setShowFinalPopup(true);

    setShowConfirm(false);
  };

  const handleReject = () => {
    alert("Report rejected and sent to Coordinator.");
    setShowConfirm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          bg-[#071426] p-6 rounded-2xl border border-cyan-500/30 w-[360px]
        "
      >
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">
          {approvalType === "approve"
            ? "Confirm Final Approval"
            : "Reject Attendance"}
        </h2>

        <p className="text-gray-300 text-sm mb-4">
          {approvalType === "approve"
            ? "Once approved, the final report with signature will be generated."
            : "Rejection will notify the coordinator to revise and resubmit."}
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-gray-600/40 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={
              approvalType === "approve" ? handleApprove : handleReject
            }
            className={`
              px-4 py-2 rounded-lg
              ${approvalType === "approve"
                ? "bg-green-600/60"
                : "bg-red-600/60"}
            `}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}



