import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShimmerPromo from "./ShimmerPromo";
import { API_BASE_URL } from "../../api/apiConfig";

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

const PromoSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Fetch slides from API with token
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        const accessToken = data ? data.access_token : null;
        if (!accessToken) {
          alert("No token found. Please log in again.");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/slides`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSlides(res.data.data.slides || []);
      } catch (err) {
        localStorage.clear();
        alert("Session Expired! Re-Login Please");
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // 🔹 Auto-slide every 6s
  useEffect(() => {
    if (paused || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused, slides]);

  const handleClick = (slide) => {
    if (slide.youtube_video_link) {
      window.open(slide.youtube_video_link, "_blank", "noopener,noreferrer");
    } else if (slide.link) {
      if (slide.link.startsWith("http")) {
        window.open(slide.link, "_blank", "noopener,noreferrer");
      } else {
        navigate(slide.link);
      }
    }
  };

  // 🔹 Get image (auto-generate for YouTube videos if no image provided)
  const getImage = (slide) => {
    if (slide.youtube_video_link) {
      const videoId = getYouTubeId(slide.youtube_video_link);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    return slide.image;
  };

  // 🔹 Show shimmer while loading
  if (loading) {
    return <ShimmerPromo />;
  }

  // 🔹 No slides available
  if (slides.length === 0) {
    return (
      <div className="p-6 rounded-2xl text-center bg-purple-200 text-purple-800 dark:bg-violet-950/40 dark:text-violet-200">
        No slides available
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between relative h-auto overflow-hidden bg-gradient-to-r from-purple-500 to-purple-300 dark:from-violet-950/60 dark:to-violet-900/40 text-white"
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
                className="mt-6 bg-white text-purple-600 font-semibold font-sans px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm dark:bg-gray-100 dark:text-violet-700 dark:hover:bg-gray-200"
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
              current === index ? "bg-white w-5" : "bg-white/50 dark:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
