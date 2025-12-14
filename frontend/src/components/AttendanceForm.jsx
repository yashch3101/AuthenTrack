import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Image as ImageIcon, CheckCircle } from "lucide-react";
import backBtn from "../assets/back-button.png";

const GlowLine = ({ className }) => (
  <motion.div
    className={className}
    animate={{
      opacity: [0.4, 1, 0.4],
      boxShadow: [
        "0 0 10px rgba(0,255,255,0.3)",
        "0 0 25px rgba(0,255,255,0.7)",
        "0 0 10px rgba(0,255,255,0.3)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
  />
);

const GlobalBlob = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {[...Array(90)].map((_, i) => {
      let size = Math.random() * 3 + 1;
      return (
        <motion.div
          key={"blue_" + i}
          className="absolute rounded-full z-0"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: "rgba(0,160,255,0.9)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(0.7px)"
          }}
        />
      );
    })}

    {[...Array(60)].map((_, i) => {
      let size = Math.random() * 4 + 2;
      return (
        <motion.div
          key={"pink_" + i}
          className="absolute rounded-full z-0"
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: "rgba(255,0,150,0.8)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(1px)"
          }}
        />
      );
    })}
  </div>
);

export default function AttendanceForm() {
  const [gps, setGps] = useState("-");
  const [liveImage, setLiveImage] = useState(null);
  const [registeredImage, setRegisteredImage] = useState(null);

  const [faceStatus, setFaceStatus] = useState("pending");
  const [matchScore, setMatchScore] = useState(null);
  const [faceDistance, setFaceDistance] = useState(null);
  const [locationStatus, setLocationStatus] = useState("pending");

  const [studentLat, setStudentLat] = useState(null);
  const [studentLng, setStudentLng] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [qid, setQid] = useState("");

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ⭐ FETCH LATEST EVENT
  useEffect(() => {
    const token = localStorage.getItem("studentToken");

    fetch("http://localhost:5000/api/student/event/latest", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setEventData(data.event))
      .catch(() => alert("No active event found"));
  }, []);

  // ⭐ FETCH REGISTRATION DETAILS
  useEffect(() => {
    if (!eventData?._id) return;

    fetch(
      `http://localhost:5000/api/student/attendance/registration-details?eventId=${eventData._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        setRegisteredImage(data.photoUrl);
        setFullName(data.fullName);
        setEmail(data.email);
        setCourse(data.course);
        setBranch(data.branch);
        setYear(data.year);
        setQid(data.qid);
      });
  }, [eventData]);

  // ⭐ GPS AUTO
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      setGps(`${p.coords.latitude.toFixed(4)}°, ${p.coords.longitude.toFixed(4)}°`);
    });
  }, []);

  // ⭐ CAPTURE FACE
  const captureFace = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement("canvas");
    canvas.width = 350;
    canvas.height = 350;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 350, 350);

    const imageData = canvas.toDataURL("image/jpeg");
    setLiveImage(imageData);

    stream.getTracks().forEach(track => track.stop());
  };

  // ⭐ FETCH LIVE LOCATION
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStudentLat(pos.coords.latitude);
        setStudentLng(pos.coords.longitude);
        setGps(`${pos.coords.latitude.toFixed(4)}°, ${pos.coords.longitude.toFixed(4)}°`);
      },
      () => alert("Please enable location permissions.")
    );
  };

  // ⭐ SUBMIT ATTENDANCE
  const submitAttendance = async () => {
    try {
      if (!eventData?._id) return alert("Event not loaded");
      if (!liveImage) return alert("Capture your face first!");
      if (!studentLat || !studentLng) return alert("Please fetch your live location!");

      const resImg = await fetch(liveImage);
      const blob = await resImg.blob();
      const file = new File([blob], "live.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("livePhoto", file);
      formData.append("eventId", eventData._id);
      formData.append("studentLat", studentLat);
      formData.append("studentLng", studentLng);

      const res = await fetch("http://localhost:5000/api/student/attendance/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("studentToken")}` },
        body: formData
      });

      const data = await res.json();

      setFaceStatus(data.attendance.faceMatched ? "verified" : "failed");
      setMatchScore(data.attendance.matchScore);
      setFaceDistance(data.attendance.distance);

      setLocationStatus(data.attendance.locationMatched ? "verified" : "failed");

      setRegisteredImage(data.attendance.registeredPhotoUrl);
    } catch (err) {
      console.log("Submit Attendance Error:", err);
    }
  };

  const inputBase = {
    width: "100%",
    padding: "10px 15px",
    background: "#0c2333",
    border: "1px solid rgba(0,255,255,0.25)",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#d9faff",
    outline: "none",
    boxShadow: "inset 0 0 12px rgba(0,255,255,0.15)"
  };

  const buttonGradient = {
    background: "linear-gradient(90deg, #00eaff, #ff1fbf)",
    boxShadow: "0 0 25px rgba(255,0,200,0.5)"
  };

  return (
    <div className="min-h-screen bg-[#050D17] text-white flex justify-center px-4 py-10 relative overflow-hidden">

      <GlobalBlob />

      <motion.img
        src={backBtn}
        onClick={() => window.history.back()}
        whileHover={{ scale: 1.12 }}
        className="fixed top-4 left-4 z-50 w-12 h-12 cursor-pointer rounded-full 
        bg-[#06131c]/85 p-2 shadow-[0_0_30px_rgba(0,255,255,0.8)]"
      />

      <div className="w-full max-w-[900px] relative z-[5]">

        <motion.h1 className="text-center text-4xl font-bold text-cyan-500 mt-4">
          Event Attendance Verification
        </motion.h1>

        <motion.p className="text-center text-gray-400 text-sm mb-10">
          Authenticate your face and submit your attendance
        </motion.p>

        {/* FACE BOX */}
        <motion.div className="relative bg-[#081523] rounded-2xl px-8 py-8 border border-cyan-500/80 backdrop-blur-sm">

          <h2 className="text-center text-cyan-500 font-semibold mb-6 text-lg">
            Face Recognition Box
          </h2>

          <div className="grid grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full flex items-center justify-center bg-[#0d2433] border border-cyan-400">
                {liveImage ? (
                  <img src={liveImage} className="w-36 h-36 rounded-full object-cover" />
                ) : (
                  <p className="text-cyan-200 text-xs">Align your face</p>
                )}
              </div>

              <motion.button
                onClick={captureFace}
                whileHover={{ scale: 1.07 }}
                className="mt-5 px-7 py-2.5 rounded-full font-semibold text-white text-sm"
                style={buttonGradient}
              >
                Capture Face
              </motion.button>
            </div>

            {/* EVENT INFO */}
            <div className="text-sm space-y-3 pt-3">
              <p><b className="text-cyan-300">Event Name:</b> {eventData?.eventName}</p>
              <p><b className="text-cyan-300">Event Date & Time:</b> {eventData?.eventDate}</p>
              <p><b className="text-cyan-300">Venue:</b> {eventData?.eventVenue}</p>
              <p><b className="text-cyan-300">Coordinator:</b> {eventData?.createdBy?.fullName}</p>
            </div>

            {/* RIGHT IMAGES */}
            <div className="flex flex-col items-center gap-5">

              <div className="w-24 h-24 rounded-xl bg-[#0c2333] flex items-center justify-center border border-cyan-300">
                {liveImage ? (
                  <img src={liveImage} className="w-20 h-20 rounded-lg object-cover" />
                ) : (
                  <>
                    <ImageIcon className="text-cyan-300" />
                    <span className="text-xs">Live</span>
                  </>
                )}
              </div>

              <div className="w-24 h-24 rounded-xl bg-[#0c2333] flex items-center justify-center border border-cyan-300">
                {registeredImage ? (
                  <img src={registeredImage} className="w-20 h-20 rounded-lg object-cover" />
                ) : (
                  <>
                    <ImageIcon className="text-cyan-300" />
                    <span className="text-xs">Uploaded</span>
                  </>
                )}
              </div>

              {faceStatus === "verified" && (
                <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg">
                  Face Verified
                </span>
              )}

              {faceStatus === "failed" && (
                <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg">
                  Not Verified
                </span>
              )}

              {matchScore !== null && (
                <p className="text-xs text-cyan-300 mt-1">
                  Match Score: {(matchScore * 100).toFixed(2)}%
                </p>
              )}

              {faceDistance !== null && (
                <p className="text-xs text-cyan-300">
                  Face Distance: {faceDistance.toFixed(3)}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* STUDENT DETAILS */}
        <motion.div className="relative bg-[#081523] border border-cyan-400/30 rounded-2xl px-8 py-8 mt-8 backdrop-blur-sm">

          <h2 className="text-center text-cyan-200 font-semibold mb-6 text-lg">
            STUDENT DETAILS
          </h2>

          <div className="grid grid-cols-2 gap-8">

            <div className="text-sm space-y-4">

              <div>
                <p className="text-gray-400 text-xs mb-1">GPS Coordinates</p>
                <p className="text-cyan-200 font-medium">{gps}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-1">Location Badge</p>
                <motion.button
                  onClick={getMyLocation}
                  whileHover={{ scale: 1.07 }}
                  className="px-4 py-2 text-sm text-white rounded-lg"
                  style={buttonGradient}
                >
                  Fetch My Location
                </motion.button>
              </div>

              {locationStatus === "verified" && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={16} />
                  <span>Location Status: Verified</span>
                </div>
              )}

              {locationStatus === "failed" && (
                <div className="flex items-center gap-2 text-red-400">
                  <CheckCircle size={16} />
                  <span>Location Status: Not Matched</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <input value={fullName} style={inputBase} disabled />
              <input value={email} style={inputBase} disabled />
              <select style={inputBase} disabled><option>{course}</option></select>
              <select style={inputBase} disabled><option>{branch}</option></select>
              <select style={inputBase} disabled><option>{year}</option></select>
              <select style={inputBase} disabled><option>{qid}</option></select>
            </div>

          </div>

          <motion.button
            onClick={submitAttendance}
            whileHover={{ scale: 1.07 }}
            className="mt-8 px-6 py-3 bg-cyan-500 rounded-xl text-white font-semibold mx-auto block shadow-lg"
          >
            Submit Attendance
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
}