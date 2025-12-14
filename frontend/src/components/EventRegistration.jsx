import React, { useEffect, useState } from "react";
import { Mail, Phone, Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backBtn from "../assets/back-button.png";

function LocalBlob() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(90)].map((_, i) => {
        let size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={"blue_" + i}
            className="absolute rounded-full"
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: "rgba(0,160,255,0.9)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.7px)",
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
    AOS.init({ duration: 800, once: true });

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

  // ⭐ CHECK IF STUDENT ALREADY REGISTERED FOR THIS EVENT
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full flex items-center justify-center px-6 relative overflow-hidden bg-black"
    >
      <LocalBlob />

      <motion.img
        src={backBtn}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 w-12 h-12 z-50 cursor-pointer p-2 rounded-full bg-[#0a0f1f]/60"
      />

      {!eventData ? (
        <p className="text-white text-xl">Loading event...</p>
      ) : (
        <motion.div className="relative z-20 w-full max-w-3xl bg-[#07131C] border border-cyan-500/40 rounded-3xl p-8">
          {/* ⭐ ALREADY REGISTERED MESSAGE */}
          {alreadyRegistered && (
            <p className="text-red-400 text-center text-lg font-semibold mb-4">
              You have already registered for this event.
            </p>
          )}

          <h1 className="text-4xl font-extrabold text-cyan-300 text-center mb-1">
            {eventData.title || eventData.eventName}
          </h1>

          <p className="text-gray-400 text-center mb-8">
            {eventData.tagline || eventData.description || ""}
          </p>

          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-cyan-400" />
            <span className="text-sm">
              Date: <b>{eventData.date || eventData.eventDate}</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-cyan-400" />
            <span className="text-sm">
              Venue: <b>{eventData.venue || eventData.eventVenue}</b>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-cyan-400" />
            <span className="text-sm">
              Coordinator:{" "}
              <b>
                {eventData.coordinatorName || eventData.createdBy?.fullName}
              </b>
            </span>
          </div>

          {/* --- FORM (UNCHANGED UI) --- */}
          <label
            htmlFor="photoInput"
            className="col-span-2 w-full border-2 border-dashed border-cyan-400/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer"
          >
            {preview ? (
              <img
                src={preview}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1829/1829580.png"
                  className="w-10 opacity-70"
                />
                <p className="text-cyan-300 mt-2 text-sm font-medium">
                  Upload Your Photo
                </p>
              </>
            )}
            <input
              type="file"
              id="photoInput"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
              placeholder="Full Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
              placeholder="Email"
            />

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
            >
              <option>Course</option>
              <option>B.Tech</option>
              <option>BCA</option>
              <option>MCA</option>
            </select>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
            >
              <option>Branch</option>
              <option>CSE</option>
              <option>ECE</option>
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
            >
              <option>Year</option>
              <option>First</option>
              <option>Second</option>
            </select>

            <select
              value={qid}
              onChange={(e) => setQid(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white"
            >
              <option>Q-ID</option>
              <option>101</option>
              <option>102</option>
            </select>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-[#0b2331] p-3 rounded-md text-white col-span-2"
              placeholder="Phone Number"
            />
          </div>

          <motion.button
            onClick={handleSubmit}
            className="w-full mt-8 py-3 bg-gradient-to-r from-cyan-300 to-blue-500 text-black rounded-lg"
            disabled={alreadyRegistered}
          >
            {alreadyRegistered
              ? "Already Registered"
              : loading
              ? "Submitting..."
              : "Submit Registration"}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}