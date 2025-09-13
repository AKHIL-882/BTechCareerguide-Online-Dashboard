import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🔹 Utility to extract video ID from YouTube link
const getYouTubeId = (url) => {
  try {
    const ytRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(ytRegex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const slides = [
  {
    id: 1,
    title: "Schedule your interview",
    description:
      "Easily plan and manage your interview schedule with one click.",
    button: "Schedule Now",
    link: "/calendar",
    image:
      "https://img.freepik.com/free-vector/online-job-interview-concept_23-2148628159.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    title: "Check our latest YouTube video",
    description: "Stay updated with tutorials, tips, and product updates.",
    button: "Watch Now",
    youtube_video_link: "https://youtu.be/sZQwAtVdiPg",
    company_name: "BTech Career Guide",
  },
  {
    id: 3,
    title: "Special Promotion 🎉",
    description: "Get 30% off your first project purchase this week only.",
    button: "Buy a Project",
    link: "/buy",
    image:
      "https://img.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg",
  },
];

const PromoSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  // Auto-slide every 6s
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const handleClick = (slide) => {
    if (slide.youtube_video_link) {
      // Open YouTube video in new tab
      window.open(slide.youtube_video_link, "_blank", "noopener,noreferrer");
    } else if (slide.link) {
      if (slide.link.startsWith("http")) {
        // External link
        window.open(slide.link, "_blank", "noopener,noreferrer");
      } else {
        // Internal navigation
        navigate(slide.link);
      }
    }
  };

  // Get image (auto-generate for YouTube videos)
  const getImage = (slide) => {
    if (slide.youtube_video_link) {
      const videoId = getYouTubeId(slide.youtube_video_link);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    return slide.image;
  };

  return (
    <div
      className="bg-gradient-to-r from-purple-500 to-purple-300 text-white rounded-2xl p-6 flex flex-col justify-between relative h-auto overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-4 h-full"
        >
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-xl font-display font-semibold leading-snug">
              {slides[current].title}
            </h2>
            <p className="mt-2 text-sm font-sans opacity-90">
              {slides[current].description}
            </p>
            {(slides[current].link || slides[current].youtube_video_link) && (
              <button
                onClick={() => handleClick(slides[current])}
                className="mt-6 bg-white text-purple-600 font-semibold font-sans px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm"
              >
                {slides[current].button}
              </button>
            )}
          </div>

          {/* Media Section */}
          <div className="flex-1 flex justify-center items-center w-full md:w-auto">
            <img
              src={getImage(slides[current])}
              alt="Promo"
              className="w-full md:max-h-40 md:w-auto object-contain rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleClick(slides[current])}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              current === index ? "bg-white w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
