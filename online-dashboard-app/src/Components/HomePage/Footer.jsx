import React, { useState } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import scrollToSection from "./ScrollToSection"; // update the path as needed
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FadeInStagger from "./FadeInStagger";
import FooterCompanyInfo from "./FooterCompanyInfo";

const Footer = () => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Services",
      links: [
        { name: "Jobs", id: "trending" },
        { name: "Projects", id: "services" },
        { name: "Company Q&A", id: "services" },
        { name: "Career Guidance", id: "services" },
        { name: "Upskilling Sessions", id: "services" },
        { name: "Course Materials", id: "services" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", id: "about" },
        { name: "Testimonials", id: "testimonials" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", id: "faqs" },
        { name: "Privacy Policy", onClick: () => setShowPolicy(true) },
      ],
    },
  ];

  const handleClick = (link) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.url) {
      window.open(link.url, "_blank");
    } else if (link.id) {
      scrollToSection(link.id);
    }
  };

  return (
    <div className="relative bg-slate-50">
      {/* Subscribe Section */}
      <div className="bg-white shadow-md rounded-xl px-6 py-10 max-w-6xl mx-auto -mb-20 z-10 relative">
        <FadeInStagger
          direction="bottom"
          delay={0.1}
          duration={0.8}
          once={false}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold font-display mb-2 text-violet-800">
                Subscribe to our newsletter
              </h2>
              <p className="text-sm text-gray-600 max-w-md">
                Get the latest updates on our projects, blogs, and tech insights
                delivered straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 text-black w-full sm:w-64 focus:outline-violet-500"
              />
              <button className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-lg font-sans transition">
                Subscribe
              </button>
            </div>
          </div>
        </FadeInStagger>
      </div>

      {/* Main Footer */}
      <footer className="bg-violet-600 text-white pt-32 pb-12 px-6 font-sans mt-[-40px]">
        <div className="container mx-auto w-full flex flex-col lg:flex-row-reverse justify-center items-start text-center lg:text-left space-y-8 lg:space-y-0 lg:gap-16">
          {/* Mobile Accordion */}
          <div className="block lg:hidden w-full">
            {sections.map((section, index) => (
              <div
                key={index}
                className="text-left border-b border-violet-700 py-3"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center font-bold font-display text-lg focus:outline-none"
                >
                  {section.title}
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === index && (
                  <ul className="mt-2 ml-2 space-y-2 text-sm font-sans">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleClick(link)}
                          className="block text-left w-full hover:text-violet-300 transition-colors duration-300"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Link Sections */}
          <div className="hidden lg:flex w-full lg:w-1/2 flex-row items-start justify-between px-4">
            {sections.map((section, index) => (
              <div key={index} className="flex-1 text-left">
                <h4 className="font-bold mb-2 font-display">{section.title}</h4>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleClick(link)}
                        className="hover:text-violet-300 transition-colors duration-300 whitespace-nowrap font-sans text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <FooterCompanyInfo />
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <PrivacyPolicyModal onClose={() => setShowPolicy(false)} />
      )}
    </div>
  );
};

export default Footer;
