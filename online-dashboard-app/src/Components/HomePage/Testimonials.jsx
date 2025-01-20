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
    message: "This platform has transformed my career. The guidance and resources are invaluable!",
    name: "Elon Musk",
    role: "Software Engineer at Google",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140039.png",
  },
  {
    message: "I couldn't be happier with the project solutions. Highly recommended!",
    name: "Sunita Williams",
    role: "Product Manager at Meta",
    image: "https://cdn-icons-png.flaticon.com/128/4140/4140060.png",
  },
  {
    message: "The coding Q&A feature is a game-changer. Solved all my coding problems with ease!",
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
      <h2 className="text-3xl font-bold text-blue-950 mb-2 relative p-2">
        Testimonials
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-violet-600"></span>
      </h2>
      <p className="text-gray-600 text-lg mb-10">
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
          340: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
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
              <p className="text-gray-700 italic mb-4 flex-grow">
                <span className="text-violet-800 font-bold text-2xl">"</span>
                {testimonial.message}
                <span className="text-violet-800 font-bold text-2xl">"</span>
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-violet-600"
                />
                <div className="text-left">
                  <h4 className="text-violet-800 font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-2 text-center"></div>
    </div>
  );
};

export default Testimonials;
