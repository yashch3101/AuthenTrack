import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Home";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import Dashboard from "./components/Dashboard";
import UniversityDashboard from "./components/UniversityDashboard";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import AboutTeam from "./components/AboutTeam";

import EventRegistration from "./components/EventRegistration";
import AttendanceForm from "./components/AttendanceForm";

import GlobalBlob from "./components/GlobalBlob";
import Footer from "./components/Footer";

import { Routes, Route, useLocation } from "react-router-dom";

// ⭐ Academic Head Pages
import AcademicHeadLogin from "./pages/AcademicHeadLogin";
import AcademicHeadSignup from "./pages/AcademicHeadSignup";

// ⭐ Coordinator Pages
import CoordinatorLogin from "./pages/CoordinatorLogin";
import CoordinatorSignup from "./pages/CoordinatorSignup";

// ⭐ NEW — Event Attendance Panel (Coordinator Dashboard Screen)
import EventAttendancePanel from "./pages/EventAttendancePanel";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ⭐ Pages WITHOUT NAVBAR
  const hideNavbar = [
    "/login",
    "/signup",
    "/verify-otp",
    "/register",
    "/attendance",

    "/dashboard/university/academic-head/login",
    "/dashboard/university/academic-head/signup",

    "/dashboard/university/coordinator/login",
    "/dashboard/university/coordinator/signup",

    // ⭐ PANEL ALSO WITHOUT NAVBAR
    "/dashboard/university/coordinator/panel",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen text-white relative bg-[#020617]">
      
      {/* GLOBAL BLOB BACKGROUND */}
      <GlobalBlob />

      {/* SHOW NAVBAR ONLY WHEN ALLOWED */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ⭐ HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <div className="max-w-7xl mx-auto px-6 pt-32">
                <HeroSection />
              </div>

              <FeaturesSection />
              <HowItWorks />
              <Dashboard />
              <AboutTeam />
              <Footer />
            </>
          }
        />

        {/* ⭐ MAIN ROUTES */}
        <Route path="/register" element={<EventRegistration />} />
        <Route path="/attendance" element={<AttendanceForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/university" element={<UniversityDashboard />} />

        {/* ⭐ ACADEMIC HEAD ROUTES */}
        <Route
          path="/dashboard/university/academic-head/login"
          element={<AcademicHeadLogin />}
        />
        <Route
          path="/dashboard/university/academic-head/signup"
          element={<AcademicHeadSignup />}
        />

        {/* ⭐ COORDINATOR ROUTES */}
        <Route
          path="/dashboard/university/coordinator/login"
          element={<CoordinatorLogin />}
        />
        <Route
          path="/dashboard/university/coordinator/signup"
          element={<CoordinatorSignup />}
        />

        {/* ⭐ NEW -> COORDINATOR DASHBOARD PANEL ROUTE */}
        <Route
          path="/dashboard/university/coordinator/panel"
          element={<EventAttendancePanel />}
        />

        {/* ⭐ GLOBAL AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

      </Routes>
    </div>
  );
}

export default App;





























