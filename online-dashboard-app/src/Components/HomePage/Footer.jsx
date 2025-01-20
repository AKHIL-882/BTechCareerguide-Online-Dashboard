import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  // Random data for sections with links
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
    <footer className="bg-violet-800 text-white py-6 px-4 sm:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-start space-y-6 sm:space-y-0">
        <div className="text-left flex flex-col sm:items-start mr-4">
          <h1 className="text-3xl font-bold mb-2">ProjPort</h1>
          <p className="text-sm mb-4 max-w-md mx-auto sm:mx-0">
            ProjPort is a leading platform for all your project management and development needs. We help you turn ideas into reality with innovative and efficient solutions.
          </p>
          <div className="flex sm:justify-start space-x-6">
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

        {/* Right Side: Sections with Links */}
        <div className="flex flex-col sm:flex-row justify-between sm:space-x-12 text-left w-full sm:w-auto space-y-4 sm:space-y-0">
          {sections.map((section, index) => (
            <div key={index} className="text-left sm:flex-1">
              <h4 className="font-bold mb-2">{section.title}</h4>
              <ul>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className="hover:text-violet-600 transition-colors duration-300 whitespace-nowrap">
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

