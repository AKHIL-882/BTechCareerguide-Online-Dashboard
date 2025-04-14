import React, { useState } from "react";
import FadeInStagger from "./FadeInStagger";
const OfferingCard = ({ image, title, shortDesc, fullDesc, bgColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`p-6 rounded-xl shadow-lg max-w-sm w-full text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative group overflow-hidden ${bgColor}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="text-xl font-bold text-violet-800 mb-4 font-display">{title}</h3>
      <div className="mb-4">
        {/* Real Image instead of icon */}
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
      </div>

      {!hovered ? (
        <>
          <p className="text-gray-700 mb-4 font-sans">{shortDesc}</p>
          <button className="text-violet-600 font-semibold hover:underline">
            Know More →
          </button>
        </>
      ) : (
        <p className="text-gray-800 transition-opacity duration-300 font-sans">
          {fullDesc}
        </p>
      )}
    </div>
  );
};

const OfferingSection = () => {
  const offerings = [
    {
      image: "https://img.freepik.com/free-vector/creative-illustration-recruitment-concept_52683-43306.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Jobs",
      shortDesc: "Find your dream job today.",
      fullDesc: "Explore exciting job opportunities with top companies. Get matched with roles that suit your skills and aspirations.",
      bgColor: "bg-blue-100",
    },
    {
      image: "https://img.freepik.com/premium-vector/web-design-ui-ux-software-development_773186-634.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Projects",
      shortDesc: "Affordable projects on demand.",
      fullDesc: "Request a personalized project and get it done at a reasonable price, tailored to your specifications.",
      bgColor: "bg-green-100",
    },
    {
      image: "https://img.freepik.com/free-vector/flat-hand-drawn-web-developers-illustration_23-2148842972.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Coding QA",
      shortDesc: "Solutions to your coding doubts.",
      fullDesc: "Get real company-level coding solutions and explanations, helping you to prepare better and learn effectively.",
      bgColor: "bg-yellow-100",
    },
    {
      image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-finance-leaders-concept_23-2149166908.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Career Guidance",
      shortDesc: "Plan your career path.",
      fullDesc: "Receive expert mentoring to guide your career journey. Make informed decisions and reach your goals faster.",
      bgColor: "bg-orange-100",
    },
    {
      image: "https://img.freepik.com/free-vector/business-team-celebrating-income-growth_74855-6271.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Upskilling Sessions",
      shortDesc: "Grow your knowledge base.",
      fullDesc: "Participate in live and interactive upskilling sessions focused on in-demand skills and tools.",
      bgColor: "bg-purple-100",
    },
    {
      image: "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?ga=GA1.1.370144144.1727452674&semt=ais_hybrid&w=740", // Path to your image
      title: "Course Materials",
      shortDesc: "Learn at your own pace.",
      fullDesc: "Access a wide range of course materials, including video tutorials and PDF notes, anytime and anywhere.",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="pt-14 pb-28 px-4 bg-slate-50 text-center overflow-x-hidden">
      <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
        We provide more than you expect—check out our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
          other services.
          </span>{" "}
        </h1>
        <p className="text-gray-500 mt-1">Everything you need in one place</p>
      </div>
      </FadeInStagger>
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
      <div className="flex flex-wrap justify-around gap-6 md:gap-y-12">
        {offerings.map((offering, index) => (
          <OfferingCard
            key={index}
            image={offering.image}
            title={offering.title}
            shortDesc={offering.shortDesc}
            fullDesc={offering.fullDesc}
            bgColor={offering.bgColor}
          />
        ))}
      </div>
      </FadeInStagger>
    </div>
  );
};

export default OfferingSection;

