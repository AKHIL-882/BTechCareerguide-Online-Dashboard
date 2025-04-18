import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import FadeInStagger from "./FadeInStagger";

const faqs = [
    {
        question: "What kind of jobs are listed under Trending Jobs?",
        answer: "Trending Jobs features the most in-demand roles across industries, updated regularly based on market trends.",
      },
      {
        question: "What information is provided in the About Us section?",
        answer: "The About Us section shares our mission, vision, and the story behind our platform to help users understand our purpose.",
      },
      {
        question: "What services do you offer?",
        answer: "We offer job listing, resume assistance, career guidance, and employer collaboration services.",
      },
      {
        question: "Where can I find answers to common user questions?",
        answer: "You can visit our FAQs section for quick answers to the most common queries about our platform and services.",
      },
      {
        question: "How can I get in touch with you?",
        answer: "Reach out to us via the Contact Us page using the form provided or through the listed email and phone number.",
      }      
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 w-full p-6 rounded-xl shadow-md mx-auto">
      <div className="text-center mb-8 overflow-x-hidden">
        <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
        <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
        Got a question? Our {" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
          FAQ section
          </span>  has you covered. {" "}
        </h1>
        <p className="text-gray-500 mt-1">Your most common queries, answered</p>
        </FadeInStagger>
      </div>

      {faqs.map((faq, index) => (
        <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false} key={index}>
        <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-md font-sans font-medium">{faq.question}</h3>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-violet-200 text-violet-700">
              {openIndex === index ? (
                <FaMinus size={12} />
              ) : (
                <FaPlus size={12} />
              )}
            </div>
          </div>
          {openIndex === index && (
            <p className="mt-3 text-violet-700 font-sans">{faq.answer}</p>
          )}
         
        </div>
        </FadeInStagger>
      ))}
    </div>
  );
};

export default Faq;
