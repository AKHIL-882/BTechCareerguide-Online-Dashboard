import React from 'react'
import {
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";

const FooterCompanyInfo = () => {
  return (
     <div className="w-full lg:w-1/3 text-center lg:text-left max-w-6xl mx-auto">
     <h1 className="text-2xl font-bold mb-2 font-display">ProjPort</h1>
     <p className="text-sm mb-4 max-w-md mx-auto lg:mx-0 font-sans">
       ProjPort is a leading platform for all your project management and
       development needs. We help you turn ideas into reality with
       innovative and efficient solutions.
     </p>
     <div className="flex justify-center lg:justify-start space-x-6 font-sans">
       <a
         href="https://www.youtube.com/channel/UCUKsFzZ0pO512-Vf1odeMSw/join"
         className="text-xl hover:text-violet-300 transition-colors duration-300"
         target="_blank"
       >
         <FaYoutube />
       </a>
       <a
         href="https://t.me/btechcareerguide"
         className="text-xl hover:text-violet-300 transition-colors duration-300"
         target="_blank"
       >
         <FaTelegramPlane />
       </a>
       <a
         href="https://www.linkedin.com/in/duggirala-akhil-151768187/"
         className="text-xl hover:text-violet-300 transition-colors duration-300"
         target="_blank"
       >
         <FaLinkedinIn />
       </a>
       <a
         href="https://www.instagram.com/btechcareerguide/?igshid=MzNlNGNkZWQ4Mg%3D%3D"
         className="text-xl hover:text-violet-300 transition-colors duration-300"
         target="_blank"
       >
         <FaInstagram/>
       </a>
     </div>
   </div>
  )
}

export default FooterCompanyInfo;