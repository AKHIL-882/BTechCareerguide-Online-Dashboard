import React, { useEffect, useRef, useState } from "react";
const CountUpOnScroll = ({ end, duration = 2 }) => {
    const ref = useRef();
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCount();
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      );
  
      if (ref.current) observer.observe(ref.current);
  
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [end, duration, hasAnimated]);
  
    const animateCount = () => {
      let start = 0;
      const step = end / (duration * 10); // 10 steps per second
  
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          clearInterval(interval);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 100);
    };
  
    return <span ref={ref}>{count}</span>;
  };

  export default CountUpOnScroll;