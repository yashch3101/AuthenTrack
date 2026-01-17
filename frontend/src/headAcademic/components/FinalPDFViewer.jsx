import React from "react";
import { Download } from "lucide-react";

export default function FinalPDFViewer({ pdfUrl }) {

  // 🔥 Correct full URL builder
  const fullPdfUrl = pdfUrl
    ? pdfUrl.startsWith("http")
      ? pdfUrl
      : pdfUrl.includes("director_pdfs")
        ? `http://localhost:5000/${pdfUrl}`
        : `http://localhost:5000/pdf/${pdfUrl}`
    : null;

  return (
    <div
      className="
        p-6 rounded-2xl bg-[#0b1a2b]/50
        border border-cyan-400/30
        shadow-[0_0_40px_rgba(0,210,255,0.15)]
      "
    >
      <h2 className="text-lg font-semibold text-cyan-300 mb-3">
        Final PDF Viewer
      </h2>

      <div
        className="
          w-full h-[320px] bg-[#0d1f33]/40
          border border-cyan-300/20
          rounded-xl overflow-hidden flex items-center justify-center
        "
      >
        {/* No PDF Yet */}
        {!fullPdfUrl && (
          <p className="text-gray-400 text-sm text-center px-4">
            Final attendance PDF will appear here after coordinator submission.
          </p>
        )}

        {/* Show PDF */}
        {fullPdfUrl && (
          <iframe
            src={fullPdfUrl}
            className="w-full h-full rounded-xl"
            title="final-pdf"
          ></iframe>
        )}
      </div>

      {/* Download button */}
      {fullPdfUrl && (
        <button
          onClick={() => window.open(fullPdfUrl, "_blank")}
          className="
            w-full mt-5 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-cyan-400 to-blue-500
            shadow-[0_0_20px_rgba(0,210,255,0.4)]
          "
        >
          <Download className="w-4 h-4 inline-block mr-2" />
          Download PDF
        </button>
      )}
    </div>
  );
}