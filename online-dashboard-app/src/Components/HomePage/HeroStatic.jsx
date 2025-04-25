import React from "react";
import { FaYoutube, FaTelegramPlane, FaWhatsapp, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import FadeInStagger from "./FadeInStagger";
import SocialCard from "./SocialCard";

function HeroStatic({ social }) {
  return (
    <div className="rounded-lg p-5 max-w-5xl mx-auto">
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 space-x-5">
          <SocialCard
            icon={FaYoutube}
            label={social?.youtube?.label}
            url={social?.youtube?.url}
            count={social?.youtube?.subscribers}
            suffix="Subscribers"
            bgColor="bg-red-100"
            textColor="text-red-500"
          />
          <SocialCard
            icon={FaTelegramPlane}
            label={social?.telegram?.label}
            url={social?.telegram?.url}
            count={social?.telegram?.followers}
            suffix="Followers"
            bgColor="bg-blue-100"
            textColor="text-blue-500"
          />
          <SocialCard
            icon={FaWhatsapp}
            label={social?.whatsapp?.label}
            url={social?.whatsapp?.url}
            count={social?.whatsapp?.members}
            suffix="Members"
            bgColor="bg-green-100"
            textColor="text-green-500"
          />
          <SocialCard
            icon={FaLinkedinIn}
            label={social?.linkedin?.label}
            url={social?.linkedin?.url}
            count={social?.linkedin?.connections}
            suffix="Connections"
            bgColor="bg-blue-100"
            textColor="text-blue-500"
          />
          <SocialCard
            icon={FaInstagram}
            label={social?.instagram?.label}
            url={social?.instagram?.url}
            count={social?.instagram?.connections}
            suffix="Connections"
            bgColor="bg-pink-100"
            textColor="text-pink-500"
          />
        </div>
      </FadeInStagger>
    </div>
  );
}

export default HeroStatic;
