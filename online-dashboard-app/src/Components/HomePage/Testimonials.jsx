import React from "react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

// Testimonial data
const testimonials = [
  {
    message:
      "This platform has transformed my career. The guidance and resources are invaluable!",
    name: "Elon Musk",
    role: "Software Engineer at Google",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140039.png",
  },
  {
    message:
      "I couldn't be happier with the project solutions. Highly recommended!",
    name: "Sunita Williams",
    role: "Product Manager at Meta",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140060.png",
  },
  {
    message:
      "The coding Q&A feature is a game-changer. Solved all my coding problems with ease!",
    name: "Alice Johnson",
    role: "Data Scientist at Amazon",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140039.png",
  },
  {
    message: "Amazing services and timely support. Highly impressed!",
    name: "Rhea",
    role: "Tech Lead at Microsoft",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140060.png",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 px-4 bg-violet-100 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6 relative p-2 font-display">
        Testimonials
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-violet-600"></span>
      </h2>
      <p className="text-gray-600 text-lg sm:text-xl mb-10 font-sans">
        Hear what our users say about our services.
      </p>

      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 }, // Single card for very small screens
          640: { slidesPerView: 1, spaceBetween: 10 }, // Single card for small screens
          768: { slidesPerView: 2, spaceBetween: 20 }, // Two cards for tablets
          1024: { slidesPerView: 3, spaceBetween: 30 }, // Three cards for desktops
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="h-auto w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto h-[200px] flex flex-col justify-between">
              <p className="text-gray-700 italic mb-4 flex-grow text-sm sm:text-base font-sans">
                <span className="text-violet-800 text-2xl font-sans">"</span>
                {testimonial.message}
                <span className="text-violet-800  text-2xl font-sans">"</span>
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-violet-600"
                />
                <div className="text-left">
                  <h4 className="text-violet-800 text-md font-semibold font-display">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm font-sans">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4 text-center"></div>
    </div>
  );
};

export default Testimonials;
