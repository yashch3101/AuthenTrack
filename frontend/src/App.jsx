import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import GlobalBlob from "./components/GlobalBlob";

import HeroSection from "./components/Home";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import Dashboard from "./components/Dashboard";
import AboutTeam from "./components/AboutTeam";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import EventRegistration from "./components/EventRegistration";
import AttendanceForm from "./components/AttendanceForm";

import UniversityDashboard from "./components/UniversityDashboard";
import AcademicHeadLogin from "./pages/AcademicHeadLogin";
import AcademicHeadSignup from "./pages/AcademicHeadSignup";
import AcademicHeadDashboard from "./headAcademic/components/AcademicHeadDashboard";
import CoordinatorLogin from "./pages/CoordinatorLogin";
import CoordinatorSignup from "./pages/CoordinatorSignup";
import CoordinatorDashboard from "./coordinator/CoordinatorDashboard";

import PageMotion from "./components/PageMotion";
import SmoothScroll from "./SmoothScroll";

function App() {
  const location = useLocation();
  const isUniversity = location.pathname.startsWith("/dashboard/university");

  const hideNavbar =
    [
      "/login",
      "/signup",
      "/verify-otp",
      "/register",
      "/attendance",
      "/dashboard/university/coordinator/login",
      "/dashboard/university/coordinator/signup",
      "/dashboard/university/coordinator/dashboard",
      "/dashboard/university/academic-head/login",
      "/dashboard/university/academic-head/signup",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/university/academic-head/dashboard");

  if (!isUniversity) {
    return (
      <>
        <SmoothScroll />
        <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
          <GlobalBlob />
          {!hideNavbar && <Navbar />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              {/* Landing Page */}
              <Route
                path="/"
                element={
                  <>
                    <PageMotion>
                      <div className="w-full">

                        <section id="home" className="pt-32">
                          <div className="max-w-7xl mx-auto px-6">
                            <HeroSection />
                          </div>
                        </section>

                        <section id="features">
                          <FeaturesSection />
                        </section>

                        <section id="how">
                          <HowItWorks />
                        </section>

                        {/* Dashboard preview on Home */}
                        <section id="dashboard">
                          <Dashboard />
                        </section>

                        <section id="team">
                          <AboutTeam />
                        </section>

                      </div>
                    </PageMotion>

                    {/* Footer OUTSIDE PageMotion to remove lag */}
                    <Footer />
                  </>
                }
              />

              {/* Full Dashboard Page */}
              <Route
                path="/dashboard"
                element={
                  <PageMotion>
                    <Dashboard />
                  </PageMotion>
                }
              />

              {/* Forms & Auth */}
              <Route path="/register" element={<PageMotion><EventRegistration /></PageMotion>} />
              <Route path="/attendance" element={<PageMotion><AttendanceForm /></PageMotion>} />
              <Route path="/login" element={<PageMotion><Login /></PageMotion>} />
              <Route path="/signup" element={<PageMotion><Signup /></PageMotion>} />
              <Route path="/verify-otp" element={<PageMotion><VerifyOTP /></PageMotion>} />

            </Routes>
          </AnimatePresence>
        </div>
      </>
    );
  }

  return (
    <>
      <SmoothScroll />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/dashboard/university" element={<PageMotion><UniversityDashboard /></PageMotion>} />

          {/* Coordinator */}
          <Route path="/dashboard/university/coordinator/login" element={<PageMotion><CoordinatorLogin /></PageMotion>} />
          <Route path="/dashboard/university/coordinator/signup" element={<PageMotion><CoordinatorSignup /></PageMotion>} />
          <Route path="/dashboard/university/coordinator/dashboard" element={<PageMotion><CoordinatorDashboard /></PageMotion>} />

          {/* Academic Head */}
          <Route path="/dashboard/university/academic-head/login" element={<PageMotion><AcademicHeadLogin /></PageMotion>} />
          <Route path="/dashboard/university/academic-head/signup" element={<PageMotion><AcademicHeadSignup /></PageMotion>} />
          <Route path="/dashboard/university/academic-head/dashboard" element={<PageMotion><AcademicHeadDashboard /></PageMotion>} />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;