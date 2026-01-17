import React, { useEffect, useState } from "react";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backBtn from "../assets/back-button.png";

function EventParticles() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {[...Array(70)].map((_, i) => {
        const size = Math.random() * 4 + 2;

        const color = [
          "rgba(0,255,255,1)",   // neon cyan
          "rgba(0,160,255,1)",   // neon blue
        ][Math.floor(Math.random() * 2)];

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() * 60 - 30);
        const endY = startY + (Math.random() * 60 - 30);

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${startX}vw`,
              y: `${startY}vh`,
              opacity: 0.8,
            }}
            animate={{
              x: `${endX}vw`,
              y: `${endY}vh`,
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              filter: "blur(1px)",
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function EventRegistration() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Course");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("Year");
  const [qid, setQid] = useState("Q-ID");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // ⭐ FETCH LATEST EVENT AUTOMATICALLY
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    axios
      .get("http://localhost:5000/api/student/event/latest", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEventData(res.data.event);
      })
      .catch((err) => {
        console.log(err);
        alert("No active event found");
      });
  }, []);

  useEffect(() => {
    if (!eventData) return;

    const token = localStorage.getItem("studentToken");

    axios
      .get(
        `http://localhost:5000/api/student/event/check?eventId=${eventData._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.alreadyRegistered) {
          setAlreadyRegistered(true);
        } else {
          setAlreadyRegistered(false);
        }
      })
      .catch((err) => console.log(err));
  }, [eventData]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);

    if (file) {
      const imgURL = URL.createObjectURL(file);
      setPreview(imgURL);
    }
  };

  const handleSubmit = async () => {
    if (alreadyRegistered)
      return alert("You are already registered for this event!");

    if (!selectedPhoto) return alert("Please upload your photo");
    if (!eventData) return alert("Event not loaded yet");

    setLoading(true);

    try {
      const token = localStorage.getItem("studentToken");

      const formData = new FormData();
      formData.append("photo", selectedPhoto);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("course", course);
      formData.append("branch", branch);
      formData.append("year", year);
      formData.append("qid", qid);
      formData.append("phone", phone);
      formData.append("eventId", eventData._id);

      await axios.post(
        "http://localhost:5000/api/student/event/register",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Registration Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, scale: 0.98 }}
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center px-6 relative overflow-hidden bg-black"
    >
      {/* 🔥 Moving neon background */}
      <EventParticles />

      {/* Back */}
      <motion.img
        src={backBtn}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 w-12 h-12 z-50 cursor-pointer p-2 rounded-full bg-[#0a0f1f]/60"
      />

      {/* Side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[520px] w-[160px] bg-gradient-to-b from-transparent via-pink-500/40 to-transparent blur-[50px]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[520px] w-[160px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent blur-[50px]" />

      {!eventData ? null : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative z-20 w-full max-w-3xl rounded-3xl p-[2px]"
          style={{
            background: "linear-gradient(90deg,#ff3ecb,#7b5cff,#00eaff)",
            boxShadow: "0 0 25px rgba(0,200,255,0.5)",
          }}
        >
          <div className="bg-[#07131C] rounded-3xl p-8">
            <h1 className="text-4xl font-extrabold text-cyan-300 text-center">
              {eventData.title || eventData.eventName}
            </h1>

            <p className="text-gray-400 text-center mb-6">
              {eventData.tagline || eventData.description}
            </p>

            <div className="flex justify-center flex-wrap gap-6 mb-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-cyan-400" />
                {eventData.date || eventData.eventDate}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400" />
                {eventData.venue || eventData.eventVenue}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-cyan-400" />
                {eventData.coordinatorName || eventData.createdBy?.fullName}
              </div>
            </div>

            {/* Photo Upload */}
            <label className="w-full border-2 border-dashed border-cyan-400/40 rounded-xl p-4 flex flex-col items-center cursor-pointer">
              {preview ? (
                <img src={preview} className="w-24 h-24 rounded-lg object-cover" />
              ) : (
                <p className="text-cyan-300">Upload Photo</p>
              )}
              <input type="file" className="hidden" onChange={handlePhotoUpload} />
            </label>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {[
                ["Full Name", fullName, setFullName],
                ["Email", email, setEmail],
                ["Course", course, setCourse],
                ["Branch", branch, setBranch],
                ["Year", year, setYear],
                ["Q-ID", qid, setQid],
              ].map(([ph, val, set], i) => (
                <input
                  key={i}
                  placeholder={ph}
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="bg-transparent border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400"
                />
              ))}
              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 col-span-2"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={alreadyRegistered}
              className="w-full mt-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"
            >
              {alreadyRegistered
                ? "Already Registered"
                : loading
                ? "Submitting..."
                : "Submit Registration"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}