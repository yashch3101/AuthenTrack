import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backBtn from "../assets/back-button.png";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);
  // TIMER LOGIC

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  // HANDLE OTP INPUT

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  // VERIFY OTP

  const verify = () => {
    if (otp.join("") === "1234") {
      setSuccess(true);

      setTimeout(() => {
        navigate("/", {
          replace: true,
          state: { enrolled: true }
        });
      }, 600);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative">

      {/* 🔙 BACK BUTTON */}
      <motion.img
        src={backBtn}
        onClick={() => navigate("/", { replace: true })}
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 left-6 w-12 h-12 cursor-pointer rounded-full p-2
                bg-[#0a0f1f]/60 backdrop-blur-md
                  shadow-[0_0_20px_rgba(0,255,255,0.6)]
                  hover:shadow-[0_0_35px_rgba(0,255,255,1)]
                  transition-all duration-300"
      />

      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"></div>
      </div>

      {/* OTP CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-md p-10 rounded-3xl 
                  bg-white/10 backdrop-blur-2xl 
                  border border-white/20 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white text-center">Verify OTP</h2>

        <p className="text-gray-300 text-center text-sm mt-2 mb-8">
          Enter the 4-digit code sent to your phone.
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              maxLength={1}
              ref={(el) => (inputRefs.current[i] = el)}
              value={otp[i]}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 text-center text-2xl text-white 
                        bg-white/10 border border-white/20 
                        rounded-xl focus:border-cyan-400 
                        focus:outline-none"
            />
          ))}
        </div>

        {/* TIMER / RESEND */}
        <div className="text-center text-gray-300 mb-6">
          {canResend ? (
            <button
              className="text-cyan-400 hover:underline"
              onClick={() => {
                setTimer(30);
                setCanResend(false);
              }}
            >
              Resend Code
            </button>
          ) : (
            <span>Resend OTP in {timer}s</span>
          )}
        </div>

        {/* VERIFY BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={verify}
          className="w-full py-3 bg-gradient-to-r 
                    from-cyan-500 to-blue-600 
                    text-white rounded-xl font-semibold 
                    shadow-lg"
        >
          Verify OTP
        </motion.button>

        {/* SUCCESS TEXT */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center text-green-400 text-lg font-semibold"
          >
            ✔ OTP Verified Successfully!
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}