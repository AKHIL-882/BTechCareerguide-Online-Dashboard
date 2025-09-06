import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Schedule your interview",
        description: "Easily plan and manage your interview schedule with one click.",
        button: "Schedule Now",
        link: "/schedule", // 🔗 added link
        image: "https://img.freepik.com/free-vector/online-job-interview-concept_23-2148628159.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
        id: 2,
        title: "Check our latest YouTube video",
        description: "Stay updated with tutorials, tips, and product updates.",
        button: "Watch Now",
        link: "https://www.youtube.com/watch?v=Yvu-mY7Ljr4", // 🔗 direct link
        youtube: "https://www.youtube.com/embed/Yvu-mY7Ljr4?si=0rPsT8tc_f8TBnvR",
    },
    {
        id: 3,
        title: "Special Promotion 🎉",
        description: "Get 30% off your first project purchase this week only.",
        button: "Buy a Project",
        link: "/buy", // 🔗 your project purchase page
        image: "https://img.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg",
    },
    {
        id: 4,
        title: "AI Podcast",
        description: "Learn how AI is transforming the future of learning and job opportunities.",
        button: "Register",
        link: "/podcast-register", // 🔗 register page
        image: "https://www.shutterstock.com/image-vector/3d-artificial-intelligence-robotic-character-600nw-2419497045.jpg",
    },
];

const PromoSlider = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    // Auto-slide every 6s (pauses on hover)
    useEffect(() => {
        if (paused) return; // stop when paused
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [paused]);

    return (
        <div
            className="bg-gradient-to-r from-purple-500 to-purple-300 text-white rounded-2xl p-6 flex flex-col justify-between relative h-auto overflow-hidden"
            onMouseEnter={() => setPaused(true)} // 🛑 pause
            onMouseLeave={() => setPaused(false)} // ▶️ resume
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
                        {slides[current].link && (
                            <a
                                href={slides[current].link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="mt-6 bg-white text-purple-600 font-semibold font-sans px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm">
                                    {slides[current].button}
                                </button>
                            </a>
                        )}
                    </div>

                    {/* Media Section */}
                    {/* Media Section */}
                    <div className="flex-1 flex justify-center items-center w-full md:w-auto">
                        {slides[current].youtube ? (
                            <img
                                src={`https://img.youtube.com/vi/${slides[current].youtube.split("/embed/")[1].split("?")[0]}/hqdefault.jpg`}
                                alt="YouTube Thumbnail"
                                className="w-full md:max-h-40 md:w-auto object-contain rounded-lg shadow-lg"
                            />
                        ) : (
                            <img
                                src={slides[current].image}
                                alt="Promo"
                                className="w-full md:max-h-40 md:w-auto object-contain rounded-lg shadow-lg"
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${current === index ? "bg-white w-5" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PromoSlider;
