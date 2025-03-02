import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const sections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", url: "#web-development" },
        { name: "App Development", url: "#app-development" },
        { name: "UI/UX Design", url: "#ui-ux-design" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "#about-us" },
        { name: "Careers", url: "#careers" },
        { name: "Contact", url: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", url: "#faq" },
        { name: "Help Center", url: "#help-center" },
        { name: "Privacy Policy", url: "#privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-violet-800 text-white py-12 px-6 font-sans">
      <div className="container mx-auto w-full flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-0">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2 font-display">ProjPort</h1>
          <p className="text-sm mb-4 max-w-md mx-auto lg:mx-0 font-sans">
            ProjPort is a leading platform for all your project management and
            development needs. We help you turn ideas into reality with
            innovative and efficient solutions.
          </p>
          <div className="flex justify-center lg:justify-start space-x-6 font-sans">
            <a
              href="https://facebook.com"
              className="text-xl hover:text-violet-600 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="text-xl hover:text-violet-600 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="text-xl hover:text-violet-600 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              className="text-xl hover:text-violet-600 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col lg:flex-row lg:space-x-12 items-center lg:items-start w-full">
          {sections.map((section, index) => (
            <div key={index} className="flex-1 text-center lg:text-left">
              <h4 className="font-bold mb-2 font-display">{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="hover:text-violet-600 transition-colors duration-300 whitespace-nowrap font-sans"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
