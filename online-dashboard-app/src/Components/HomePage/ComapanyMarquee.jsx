import React from "react";
import Marquee from "react-fast-marquee";

const CompanyMarquee = () => {
  const logos = [
    "https://yespartners.com/wp-content/uploads/2017/08/ibm-logo-png-transparent-background.png",
    "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png?t=1720244494s",
    "https://companieslogo.com/img/orig/WIT_BIG-0de2dc21.png?t=1720244494",
    "https://www.opentext.com/assets/images/partners/tech-mahindra-logo-416x278.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/ZOHO_New.png",
  ];

  return (
    <div className="py-1 border border-b border-b-violet-300 bg-violet-50">
      <Marquee speed={50} autoFill={true} gradient={true}>
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company ${index + 1}`}
            style={{ margin: "0 20px", height: "50px", width: "100px" }}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyMarquee;
