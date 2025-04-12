import React, { useState } from "react";
import { useSignup } from "../../Api";
import { useLogin } from "../../Api";
import ComapanyMarquee from "./ComapanyMarquee";
import OfferingSection from "./OfferingSection";
import Testimonials from "./Testimonials";
import ScrollToTopButton from "../Admin/Components/ScrollToTopButton";
import StatsSection from "./StatasSection";
import Footer from "./Footer";
import HeroStatic from "./HeroStatic";
import { validate } from "./Validation";
import Header from "./Header";
import GetStarted from "./GetStarted";
import AuthForm from "./AuthForm";
import CopyRightFooter from "./CopyRightFooter";

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

  const [isLogin, setIsLogin] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [giggleCounter, setGiggleCounter] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData, setValidationError, setMessage);
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
      <ScrollToTopButton colorCode="bg-violet-800" />
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <main className="relative flex flex-col lg:flex-row justify-center lg:space-x-16 items-center px-6 pb-16 bg-gradient-to-b from-violet-800 to-blue-200 lg:h-screen pt-12">
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

        <div className="absolute bottom-4 inset-x-0 flex justify-center md:justify-start left-6 z-10 overflow-hidden">
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
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
      <HeroStatic />
      <OfferingSection />
      <StatsSection />
      <Testimonials />
      <ComapanyMarquee />
      <Footer />
      <CopyRightFooter />
    </div>
  );
};

export default HomePage;
