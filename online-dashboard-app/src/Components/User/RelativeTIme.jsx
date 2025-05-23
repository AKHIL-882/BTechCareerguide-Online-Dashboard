import React from "react";

const RelativeTime = ({ createdAt }) => {
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2592000;

    if (diffInSeconds < secondsInMinute) {
      return "Just now";
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInWeek) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInMonth) {
      const weeks = Math.floor(diffInSeconds / secondsInWeek);
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    }
  };

  return <span>{getRelativeTime(createdAt)}</span>;
};

export default RelativeTime;
