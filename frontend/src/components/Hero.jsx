import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function Hero() {
  const [dynamicText, setDynamicText] = useState("luxury rooms");
  const controls = useAnimation();

  // Array of dynamic texts
  const textOptions = [
    "luxury rooms",
    "cozy suites",
    "modern apartments",
    "spacious villas",
    "comfortable lodges",
  ];

  useEffect(() => {
    // Function to change text every 3 seconds
    const intervalId = setInterval(() => {
      controls
        .start({
          y: 20, // Move text up by 20 pixels
          opacity: 0,
          transition: { duration: 0.5 },
        })
        .then(() => {
          setDynamicText((prevText) => {
            const currentIndex = textOptions.indexOf(prevText);
            const nextIndex = (currentIndex + 1) % textOptions.length;
            return textOptions[nextIndex];
          });
          controls.start({
            y: 0, // Reset text position
            opacity: 1,
            transition: { duration: 0.5 },
          });
        });
    }, 2000); // Change text every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [controls, textOptions]);

  return (
    <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 pb-8">
      <div className="container mx-auto flex flex-col gap-4 text-center py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Find Your Perfect Stay
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mt-2">
          <motion.span
            animate={controls}
            className="text-2xl md:text-3xl font-semibold font-serif"
          >
            {dynamicText}
          </motion.span>{" "}
          <br />
          <span className="text-base md:text-lg text-gray-200 font-light">
            Discover a variety of options to suit your needs. Whether you're
            looking for a relaxing getaway or a comfortable base for your
            adventures, we have the perfect place for you.
          </span>
        </p>
      </div>
    </div>
  );
}

export default Hero;
