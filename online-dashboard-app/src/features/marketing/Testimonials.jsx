import React from "react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import FadeInStagger from "./FadeInStagger";

const male = "https://cdn-icons-png.flaticon.com/128/4140/4140039.png";

const Testimonials = ({ testimonials }) => {
  return (
    <div className="py-16 px-4 bg-white text-center overflow-x-hidden">
      <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
            Here&apos;s what{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
              our users
            </span>{" "}
            are saying about us{" "}
          </h1>
          <p className="text-gray-500 mt-1">
            We&apos;ve helped thousands of users improve their workflows. But
            don&apos;t just take our word for it - check out what they have to
            say!
          </p>
        </div>
      </FadeInStagger>
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
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
          {testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-gradient-to-tr from-violet-100 to-green-100 p-6 rounded-lg shadow-md max-w-lg mx-auto h-[200px] flex flex-col justify-between">
                <p className="text-gray-700 italic mb-4 flex-grow text-sm sm:text-base font-sans">
                  <span className="text-violet-800 text-2xl font-sans">
                    &quot;
                  </span>
                  <span>
                    {testimonial.feedback.length > 90
                      ? testimonial.feedback.slice(0, 90) + "..."
                      : testimonial.feedback}
                  </span>
                  <span className="text-violet-800 text-2xl font-sans">
                    &quot;
                  </span>
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={male}
                    alt="hi"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-violet-600"
                  />
                  <div className="text-left">
                    <h4 className="text-violet-800 text-md font-semibold font-display">
                      {testimonial.user_name}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm font-sans">
                      {testimonial.job_role} {"at"} {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </FadeInStagger>
      <div className="custom-pagination mt-4 text-center"></div>
    </div>
  );
};

export default Testimonials;
