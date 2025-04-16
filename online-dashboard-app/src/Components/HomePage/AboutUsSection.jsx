import React,{useState} from 'react';
import FadeInStagger from './FadeInStagger';
import { FaAngleDoubleDown } from 'react-icons/fa';
import HeroStatic from './HeroStatic';
import PopupNotification from './PopupNotification';
import scrollToSection from './ScrollToSection';

const AboutUsSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
    <div className="w-full flex flex-col md:flex-row items-center justify-center bg-white p-8 h-auto">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
      <FadeInStagger direction="left" delay={0.1} duration={0.8} once={false}>
        <img
          src="https://img.freepik.com/premium-vector/modern-flat-design-concept-business-analysis-with-characters-business-meeting-viewing-data_1026586-585.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740"
          alt="About Us"
          className="rounded-xl w-full h-[400px] object-cover"
        />
        </FadeInStagger>
      </div>

      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:pl-10 text-center md:text-left mt-6 md:mt-0">
      <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
      <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
          What Makes Us{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
            Truly Special
          </span>{" "}
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mb-6">
          We blend creativity, technology, and strategy to craft solutions that inspire. 
          With a passionate team and customer-first approach, we turn ideas into impactful experiences.
        </p>
        {/* Buttons */}
        <div className="flex gap-4 md:justify-start justify-center items-center">
          <button onClick={() => setShowPopup(true)} className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition">
            Join Us
          </button>
          <button onClick={() => scrollToSection("services")} className="border border-gray-400 text-gray-700 px-6 py-2 rounded-full hover:border-gray-600 transition flex justify-center items-center">
            Explore<FaAngleDoubleDown className='ml-1'/>
          </button>
        </div>
        </FadeInStagger>
      </div>
    </div>
    <HeroStatic/>
    {showPopup && (
      <PopupNotification 
        onClose={() => setShowPopup(false)}  
        title="We're excited to have you here! Log in or create an account to explore all our awesome services!"      
      />
    )} 
    </>
  );
};

export default AboutUsSection;
