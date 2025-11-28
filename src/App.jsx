import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import HeroLeft from "./components/HeroLeft";
import HeroGauge from "./components/HeroGauge";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import Dashboard from "./components/Dashboard";   // ⭐ DASHBOARD COMPONENT

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const hideNavbar = ["/login", "/signup", "/verify-otp"].includes(
    location.pathname
  );

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {!hideNavbar && <Navbar />}

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <div className="max-w-7xl mx-auto px-6 pt-32 grid md:grid-cols-2 gap-12">
                <HeroLeft />
                <HeroGauge />
              </div>

              <FeaturesSection />
              <HowItWorks />

              {/* ⭐ JUST AFTER HOW IT WORKS → SHOW THE 2-CARD DASHBOARD */}
              <Dashboard />

            </>
          }
        />

        {/* OTHER ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </div>
  );
}

export default App;












