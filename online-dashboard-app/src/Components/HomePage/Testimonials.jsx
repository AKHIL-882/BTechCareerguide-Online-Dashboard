import React from "react";

const TestimonialCard = ({ name, testimonial }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    {/* Testimonial text */}
    <p className="text-gray-600 mb-4">{testimonial}</p>
    {/* Customer name */}
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      testimonial:
        "This service is amazing! It really helped our business grow.",
    },
    {
      name: "Jane Smith",
      testimonial:
        "Highly recommended! The team is professional and responsive.",
    },
    {
      name: "Mark Wilson",
      testimonial:
        "Great value for the price. I’m extremely satisfied with the results.",
    },
    {
      name: "Sarah Lee",
      testimonial:
        "Fantastic experience. Will definitely use this service again.",
    },
    {
      name: "Michael Brown",
      testimonial: "The team delivered on time and exceeded my expectations.",
    },
    {
      name: "Emily Davis",
      testimonial:
        "I love the customer support! They really take care of their clients.",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-blue-950 mb-4 relative p-2">
        Testimonials
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-violet-600"></span>
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
