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
import AcademicHeadDashboard from "./headAcademic/components/AcademicHeadDashboard";

// ⭐ Coordinator Pages
import CoordinatorLogin from "./pages/CoordinatorLogin";
import CoordinatorSignup from "./pages/CoordinatorSignup";

import CoordinatorDashboard from "./coordinator/CoordinatorDashboard";

// ⭐ Event Attendance Panel
import EventAttendancePanel from "./coordinator/components/EventAttendancePanel";

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

    // Academic Head
    "/dashboard/university/academic-head/login",
    "/dashboard/university/academic-head/signup",
    "/dashboard/university/academic-head/dashboard",  // ⭐ ADDED

    // Coordinator
    "/dashboard/university/coordinator/login",
    "/dashboard/university/coordinator/signup",
    "/dashboard/university/coordinator/panel",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen text-white relative bg-[#020617]">

      {/* BACKGROUND */}
      <GlobalBlob />

      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* HOME PAGE */}
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

        {/* MAIN ROUTES */}
        <Route path="/register" element={<EventRegistration />} />
        <Route path="/attendance" element={<AttendanceForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/university" element={<UniversityDashboard />} />

        {/* ⭐ Academic Head */}
        <Route
          path="/dashboard/university/academic-head/login"
          element={<AcademicHeadLogin />}
        />
        <Route
          path="/dashboard/university/academic-head/signup"
          element={<AcademicHeadSignup />}
        />
        <Route
          path="/dashboard/university/academic-head/dashboard"
          element={<AcademicHeadDashboard />}  // ⭐ VERY IMPORTANT
        />

        {/* ⭐ Coordinator */}
        <Route
          path="/dashboard/university/coordinator/login"
          element={<CoordinatorLogin />}
        />
        <Route
          path="/dashboard/university/coordinator/signup"
          element={<CoordinatorSignup />}
        />
        <Route
          path="/dashboard/university/coordinator/dashboard"
          element={<CoordinatorDashboard />}
        />

        {/* ⭐ Coordinator Panel */}
        <Route
          path="/dashboard/university/coordinator/panel"
          element={<EventAttendancePanel />}
        />

        {/* Global Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

      </Routes>
    </div>
  );
}

export default App;
