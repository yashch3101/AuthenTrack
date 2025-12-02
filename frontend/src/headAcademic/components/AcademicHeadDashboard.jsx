import React, { useState } from "react";

import HeadNavbar from "./HeadNavbar";
import EventSummary from "./EventSummary";
import CoordinatorMessage from "./CoordinatorMessage";
import FinalPDFViewer from "./FinalPDFViewer";
import SignatureBox from "./SignatureBox";
import ApprovalActions from "./ApprovalActions";
import ConfirmModal from "./ConfirmModal";
import FinalReportPopup from "./FinalReportPopup";

export default function AcademicHeadDashboard() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [approvalType, setApprovalType] = useState(null);

    const [approved, setApproved] = useState(false);
    const [signatureImage, setSignatureImage] = useState(null);

    // PDF + share link will be set after final approval
    const [pdfUrl, setPdfUrl] = useState(null);
    const [finalPdfUrl, setFinalPdfUrl] = useState(null);
    const [shareUrl, setShareUrl] = useState("");

    // POPUP FOR FINAL REPORT
    const [showFinalPopup, setShowFinalPopup] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 pb-20">

        <HeadNavbar />

        {/* PAGE TITLE */}
        <div className="text-center mt-10 mb-12">
            <h1 className="text-4xl font-bold text-cyan-300 tracking-wide">
            Final Attendance Approval
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
            Review, sign, and finalize the event attendance report
            </p>
        </div>

        {/* MAIN BOX */}
        <div
            className="
            max-w-7xl mx-auto p-10 rounded-3xl 
            border border-cyan-400/40 
            bg-[#071524]/50 backdrop-blur-xl
            shadow-[0_0_70px_rgba(0,210,255,0.25)]
            "
        >
            <div className="grid grid-cols-12 gap-10">

            {/* LEFT SIDE */}
            <div className="col-span-12 md:col-span-4 space-y-8">
                <EventSummary />
                <CoordinatorMessage />
            </div>

            {/* CENTER PDF */}
            <div className="col-span-12 md:col-span-5 flex flex-col">
                <FinalPDFViewer pdfUrl={pdfUrl} />
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-12 md:col-span-3 space-y-8">
                <SignatureBox
                signatureImage={signatureImage}
                setSignatureImage={setSignatureImage}
                />

                <ApprovalActions
                setShowConfirm={setShowConfirm}
                setApprovalType={setApprovalType}
                setApproved={setApproved}
                />

                {approved && (
                <button
                    className="
                    w-full py-3 rounded-xl font-semibold
                    bg-blue-600/30 border border-blue-400/40
                    text-cyan-200 hover:bg-blue-600/50
                    transition-all
                    "
                    onClick={() => setShowFinalPopup(true)}
                >
                    View Final Approved Report
                </button>
                )}
            </div>
            </div>
        </div>

        {/* CONFIRM MODAL */}
        {showConfirm && (
            <ConfirmModal
            approvalType={approvalType}
            setShowConfirm={setShowConfirm}
            signatureImage={signatureImage}
            setApproved={setApproved}
            setPdfUrl={setPdfUrl}
            setFinalPdfUrl={setFinalPdfUrl}
            setShareUrl={setShareUrl}
            setShowFinalPopup={setShowFinalPopup}
            />
        )}

        {/* FINAL REPORT POPUP */}
        {showFinalPopup && (
            <FinalReportPopup
            pdfUrl={finalPdfUrl}
            shareUrl={shareUrl}
            onClose={() => setShowFinalPopup(false)}
            />
        )}
        </div>
    );
    }