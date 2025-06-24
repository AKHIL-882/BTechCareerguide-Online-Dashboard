import React, { useState } from "react";
import { useSignup } from "../../Api";
import { useLogin } from "../../Api";
import OfferingSection from "./OfferingSection";
import Testimonials from "./Testimonials";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import StatsSection from "./StatsSection";
import Footer from "./Footer";
import { validate } from "./Validation";
import Header from "./Header";
import GetStarted from "./GetStarted";
import AuthForm from "./AuthForm";
import CopyRightFooter from "./CopyRightFooter";
import HomepageJobs from "./HomepageJobs";
import AboutUsSection from "./AboutUsSection";
import Faq from "./Faq";
import { useHomeData } from "../../Api";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "1234567890",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);
  const { handleLogin, loading: loginLoading } = useLogin();
  const { handleSignup, loading: signupLoading } = useSignup();
  const { data, loading, error } = useHomeData();
  const jobs = data?.jobs;
  const social = data?.social;
  const testimonials = data?.testimonials;
  const stats = data?.stats;
  const companies = data?.companies;

  const [isLogin, setIsLogin] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [giggleCounter, setGiggleCounter] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData, setValidationError, setIsLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const error = validate(formData.email, formData.password);
    error
      ? setValidationError(error)
      : handleLogin(formData, setValidationError);
  };

  const handleGetStartedClick = () => {
    setGiggleCounter((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <ScrollToTopButton colorCode="bg-violet-800" />
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <section id="home">
        <main className="relative flex flex-col lg:flex-row justify-center lg:space-x-16 items-center px-6 pb-16 bg-white lg:h-screen pt-12">
          {/* Left Section */}
          <GetStarted handleGetStartedClick={handleGetStartedClick} />
          {/* Right Section */}
          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            formData={formData}
            handleChange={handleChange}
            handleLoginSubmit={handleLoginSubmit}
            handleSignupSubmit={handleSignupSubmit}
            validationError={validationError}
            setValidationError={setValidationError}
            message={message}
            setMessage={setMessage}
            loginLoading={loginLoading}
            signupLoading={signupLoading}
            giggleCounter={giggleCounter}
          />

          <div className="absolute bottom-4 inset-x-0 flex justify-center md:justify-start left-2 z-10 overflow-hidden">
            <div className="animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 13l-7 7-7-7M19 5l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </main>
      </section>
      <section id="trending">
        <HomepageJobs jobshome={jobs} companies={companies} />
      </section>
      <section id="about">
        <AboutUsSection social={social} />
      </section>
      <section id="services">
        <OfferingSection />
      </section>
      <StatsSection stats={stats} />
      <section id="testimonials">
        <Testimonials testimonials={testimonials} />
      </section>
      <section id="faqs">
        <Faq />
      </section>
      <section id="contact">
        <Footer />
      </section>
      <CopyRightFooter />
    </div>
  );
};

export default HomePage;
