import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const sections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", url: "#web-development" },
        { name: "App Development", url: "#app-development" },
        { name: "UI/UX Design", url: "#ui-ux-design" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "#about-us" },
        { name: "Careers", url: "#careers" },
        { name: "Contact", url: "#contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", url: "#faq" },
        { name: "Help Center", url: "#help-center" },
        { name: "Privacy Policy", url: "#privacy-policy" }
      ]
    }
  ];

  return (
    <footer className="bg-violet-800 text-white py-12 px-6"> {/* Increased padding */}
      <div className="container mx-auto w-full flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">ProjPort</h1>
          <p className="text-sm mb-4 max-w-md">
            ProjPort is a leading platform for all your project management and development needs. We help you turn ideas into reality with innovative and efficient solutions.
          </p>
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="text-xl hover:text-violet-600 transition-colors duration-300">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" className="text-xl hover:text-violet-600 transition-colors duration-300">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="text-xl hover:text-violet-600 transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" className="text-xl hover:text-violet-600 transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 lg:flex lg:space-x-12 justify-between w-full">
          {sections.map((section, index) => (
            <div key={index} className="flex-1">
              <h4 className="font-bold mb-2">{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className="hover:text-violet-600 transition-colors duration-300 whitespace-nowrap"
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
