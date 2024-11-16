"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = [
    "/images/about/about-light-01.png",
    "/images/about/about-dark-01.jpg",
    "/images/about/about-light-01.png",
    "/images/about/about-dark-01.jpg",
  ];

  const handleImageChange = (
    newIndex: React.SetStateAction<number>,
    direction: React.SetStateAction<string>
  ) => {
    setSlideDirection(direction);
    setCurrentIndex(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    handleImageChange(newIndex, "right");
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    handleImageChange(newIndex, "left");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) handleNext();
      else handlePrevious();
    }
  };

  const handlePreviewClick = (direction: string) => {
    if (direction === "prev") handlePrevious();
    else handleNext();
  };

  return (
    <div
      className="min-h-screen w-full relative flex flex-col justify-between bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/about/about-dark-01.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 md:px-6 pt-20">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 30,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-left max-w-xl"
        >
          <h2 className="relative mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white xl:text-hero">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="block mb-2"
            >
              Speak a New Language
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark"
            >
              Open New Doors
            </motion.span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel Section - Bottom */}
      <div className="relative z-10 w-full pb-6">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative h-[200px] sm:h-[250px] md:h-[300px] max-w-6xl mx-auto flex items-center justify-center px-2 sm:px-4"
        >
          {/* Previous image preview */}
          <div
            onClick={() => handlePreviewClick("prev")}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-44 h-[120px] sm:h-[180px] md:h-[240px] cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]}
              alt="Previous"
              className="w-full h-full object-cover rounded-lg blur-[2px] opacity-40 scale-95 transition-all duration-500"
            />
          </div>

          {/* Main image container */}
          <div
            className="relative w-[240px] sm:w-[400px] md:w-[640px] h-[160px] sm:h-[220px] md:h-[280px] rounded-xl overflow-hidden shadow-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-500"
                  style={{
                    transform: `translateX(${(index - currentIndex) * 100}%)`,
                  }}
                >
                  <img
                    src={image}
                    alt={`About ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation overlays */}
            <div className="flex absolute inset-0">
              <button
                onClick={handlePrevious}
                className="w-1/2 h-full bg-gradient-to-r from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              />
              <button
                onClick={handleNext}
                className="w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                aria-label="Next image"
              />
            </div>
          </div>

          {/* Next image preview */}
          <div
            onClick={() => handlePreviewClick("next")}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-44 h-[120px] sm:h-[180px] md:h-[240px] cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]}
              alt="Next"
              className="w-full h-full object-cover rounded-lg blur-[2px] opacity-40 scale-95 transition-all duration-500"
            />
          </div>

          {/* Dot indicators */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index, index > currentIndex ? "left" : "right")}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-500 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
