import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import HeadNavbar from "./HeadNavbar";
import EventSummary from "./EventSummary";
import CoordinatorMessage from "./CoordinatorMessage";
import FinalPDFViewer from "./FinalPDFViewer";
import SignatureBox from "./SignatureBox";
import ApprovalActions from "./ApprovalActions";
import ConfirmModal from "./ConfirmModal";
import FinalReportPopup from "./FinalReportPopup";

export default function AcademicHeadDashboard() {

    const { eventId: routeEventId } = useParams();
    const [eventId, setEventId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showConfirm, setShowConfirm] = useState(false);
    const [approvalType, setApprovalType] = useState(null);

    const [approved, setApproved] = useState(false);
    const [signatureImage, setSignatureImage] = useState(null);

    const [eventData, setEventData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [finalPdfUrl, setFinalPdfUrl] = useState(null);
    const [shareUrl, setShareUrl] = useState("");

    const [showFinalPopup, setShowFinalPopup] = useState(false);

    useEffect(() => {
    async function init() {
        // 1. URL me ID hai?
        if (routeEventId) {
            setEventId(routeEventId);
            localStorage.setItem("currentEventId", routeEventId);
            setLoading(false);
            return;
        }

        // 2. Agar localStorage me ID hai → confirm karo ke event exist bhi karta hai
        const saved = localStorage.getItem("currentEventId");

        if (saved) {
            const token = localStorage.getItem("directorToken");

            const res = await fetch(
                `http://localhost:5000/api/director/event/${saved}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await res.json();

            if (data.success && data.event) {
                setEventId(saved);
                setLoading(false);
                return;
            } else {
                // ❌ Old invalid ID → remove it
                localStorage.removeItem("currentEventId");
            }
        }

        // 3. Latest event fetch
        fetchLatestEvent();
    }

    init();
}, [routeEventId]);


    // --------------------------------------------------
    async function fetchLatestEvent() {
    try {
        const token = localStorage.getItem("directorToken");

        const res = await fetch(
            "http://localhost:5000/api/director/event/latest-event",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        const data = await res.json();

        if (data.success && data.event) {
            setEventId(data.event._id);
            localStorage.setItem("currentEventId", data.event._id);
        } else {
            setEventId(null);
        }

    } catch (err) {
        console.log("LATEST EVENT FETCH ERROR →", err);
    }

    setLoading(false);
}


    // --------------------------------------------------
    //  🔥 EVENT DETAILS + FINAL PDF FETCHER
    // --------------------------------------------------
    useEffect(() => {
        if (eventId) fetchEventData();
    }, [eventId]);

    async function fetchEventData() {
        try {
            const token = localStorage.getItem("directorToken");

            const res = await fetch(
                `http://localhost:5000/api/director/event/${eventId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await res.json();
            if (data.success) {
                setEventData(data.event);
                setPdfUrl(data.event.finalPdfUrl || null);
            }
        } catch (err) {
            console.log("EVENT LOAD ERROR →", err);
        }
    }

    // --------------------------------------------------
    //  🔥 UI STATES
    // --------------------------------------------------
    if (loading) {
        return (
            <div className="text-white text-center mt-20">
                <h2 className="text-xl">Loading event details...</h2>
            </div>
        );
    }

    if (!eventData) {
    return <div className="text-white text-center mt-20">Loading event...</div>;
}

    // --------------------------------------------------
    //  🔥 MAIN UI
    // --------------------------------------------------
    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 pb-20">

            <HeadNavbar />

            <div className="text-center mt-10 mb-12">
                <h1 className="text-4xl font-bold text-cyan-300 tracking-wide">
                    Final Attendance Approval
                </h1>
                <p className="text-gray-400 mt-1 text-sm">
                    Review, sign, and finalize the event attendance report
                </p>
            </div>

            <div
                className="max-w-7xl mx-auto p-10 rounded-3xl 
                border border-cyan-400/40 
                bg-[#071524]/50 backdrop-blur-xl
                shadow-[0_0_70px_rgba(0,210,255,0.25)]"
            >

                <div className="grid grid-cols-12 gap-10">

                    {/* LEFT */}
                    <div className="col-span-12 md:col-span-4 space-y-8">
                        <EventSummary eventData={eventData} />
                        <CoordinatorMessage message={eventData?.coordinatorMessage} />
                    </div>

                    {/* CENTER PDF */}
                    <div className="col-span-12 md:col-span-5 flex flex-col">
                        <FinalPDFViewer pdfUrl={pdfUrl} />
                    </div>

                    {/* RIGHT */}
                    <div className="col-span-12 md:col-span-3 space-y-8">
                        <SignatureBox
                            signatureImage={signatureImage}
                            setSignatureImage={setSignatureImage}
                        />

                        <ApprovalActions
                            setShowConfirm={setShowConfirm}
                            setApprovalType={setApprovalType}
                        />

                        {approved && (
                            <button
                                className="w-full py-3 rounded-xl font-semibold bg-blue-600/30 border border-blue-400/40 text-cyan-200 hover:bg-blue-600/50 transition-all"
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
                    eventId={eventId}
                />
            )}

            {/* FINAL POPUP */}
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
