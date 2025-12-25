import React from "react";
import Marquee from "react-fast-marquee";

const CompanyMarquee = ({ companies }) => {
  return (
    <div className="py-1">
      <Marquee speed={50} autoFill={true} gradient={true}>
        {companies?.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company ${index + 1}`}
            style={{
              margin: "0 20px",
              height: "50px",
              width: "100px",
              filter: "grayscale(100%)", // This applies the gray color to the logos
            }}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyMarquee;
