import React from "react";
import { motion } from "framer-motion";

const getItemVariant = (direction, delay, duration) => {
  let variant = { opacity: 0 };
  switch (direction) {
    case "top":
      variant.y = -20;
      break;
    case "bottom":
      variant.y = 20;
      break;
    case "left":
      variant.x = -30;
      break;
    case "right":
      variant.x = 30;
      break;
    default:
      break;
  }

  return {
    hidden: variant,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: duration || 0.6,
        ease: "easeOut",
      },
    },
  };
};

const containerVariants = (stagger = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
    },
  },
});

const FadeInStagger = ({
  children,
  className = "",
  direction = "top",
  delay = 0,
  duration = 0.6,
  stagger = 0.2,
  once = true,
}) => {
  const item = getItemVariant(direction, delay, duration);

  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FadeInStagger;
