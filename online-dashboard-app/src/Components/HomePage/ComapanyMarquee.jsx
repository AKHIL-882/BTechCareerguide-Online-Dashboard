import React from "react";
import Marquee from "react-fast-marquee";

const CompanyMarquee = () => {
  const logos = [
    "https://yespartners.com/wp-content/uploads/2017/08/ibm-logo-png-transparent-background.png",
    "https://1000logos.net/wp-content/uploads/2020/08/Infosys-Logo.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPAWYqoR1E-YMPwd869I0X2WuToOjTrPXgQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvZzErlzLD178MwVm_12ilGyKS8yL47rQWnUU_twZGuInOKHURGJb7HKO35HTt6D-ezo&usqp=CAU",
    "https://www.opentext.com/assets/images/partners/tech-mahindra-logo-416x278.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6Uvy-j6B7DvvGIoH2lFjKgyofVdv2vj1aQ&s",
  ];

  return (
    <div className="bg-gray-50">
      <h2 className="text-center md:text-2xl text-md  font-bold text-gray-800 md:mb-10 mb-5">
        Top Companies Where Our Students Work
      </h2>

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
