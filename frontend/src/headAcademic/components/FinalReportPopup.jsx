import React from "react";
import { Download, Link as LinkIcon, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalReportPopup({ pdfUrl, shareUrl, onClose }) {
  
  const handleDownload = () => {
    if (!pdfUrl) return alert("PDF not generated yet!");
    window.open(pdfUrl, "_blank");
  };

  const handleSend = () => {
    alert("Final report sent to Coordinator.");
  };

  return (
    <div className="
      fixed inset-0 bg-black/60 backdrop-blur-sm z-50 
      flex items-center justify-center
    ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="
          w-[520px] p-8 rounded-3xl 
          bg-[#0b1a2d]/80 backdrop-blur-xl
          border border-cyan-400/30
          shadow-[0_0_60px_rgba(0,200,255,0.25)]
          text-white text-center
        "
      >

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-cyan-300">
          Final Report Generated
        </h2>

        <p className="text-gray-400 text-sm mt-1 mb-6">
          Signed and verified by Academic Head
        </p>

        {/* PDF PREVIEW */}
        <div
          className="
            w-full h-[260px] mb-6 rounded-xl
            border border-cyan-500/30
            shadow-[0_0_25px_rgba(0,200,255,0.15)]
            bg-[#04101d]/60 overflow-hidden
          "
        >
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded-xl"
              title="final-pdf-preview"
            ></iframe>
          ) : (
            <p className="text-gray-500 text-sm opacity-70 p-6">
              PDF preview will appear once backend uploads it.
            </p>
          )}
        </div>

        {/* SHARE LINK BOX */}
        <div
          className="
            p-4 rounded-xl mb-5
            bg-[#0e2238]/60 border border-cyan-400/30
          "
        >
          <label className="text-gray-300 text-sm">Shareable Link</label>

          <div className="flex mt-2">
            <input
              className="
                flex-1 px-3 py-2 rounded-lg bg-[#071726]
                text-gray-300 border border-cyan-500/20 text-sm
              "
              value={shareUrl}
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="
                ml-3 px-4 py-2 rounded-lg bg-cyan-600/50
                hover:bg-cyan-600 text-white text-sm
                flex items-center gap-2
              "
            >
              <LinkIcon className="w-4 h-4" /> Copy
            </button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-6">

          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            className="
              flex-1 py-3 mr-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-400 to-blue-500
              shadow-[0_0_20px_rgba(0,200,255,0.5)]
            "
          >
            <Download className="w-4 h-4 inline-block mr-2" />
            Download PDF
          </button>

          {/* SEND */}
          <button
            onClick={handleSend}
            className="
              flex-1 py-3 ml-3 rounded-xl font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500
              shadow-[0_0_20px_rgba(255,0,150,0.5)]
            "
          >
            <Send className="w-4 h-4 inline-block mr-2" />
            Send
          </button>

        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-400 hover:text-white"
        >
          Close
        </button>

      </motion.div>
    </div>
  );
}