"use client"
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  // Touch handling refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = [
    "/images/about/about-light-01.png",
    "/images/about/about-dark-01.jpg",
    "/images/about/about-light-01.png",
    "/images/about/about-dark-01.jpg"
  ];

  const handleImageChange = (newIndex: number, direction: 'left' | 'right') => {
    setSlideDirection(direction);
    setCurrentIndex(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    handleImageChange(newIndex, 'right');
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    handleImageChange(newIndex, 'left');
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;

    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  // Handle preview image click
  const handlePreviewClick = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <>
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative w-full md:w-1/2"
            >
              <div className="relative h-[400px] sm:h-[400px] flex items-center justify-center">
                {/* Previous image preview */}
                <div
                  onClick={() => handlePreviewClick('prev')}
                  className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-32 md:w-72 h-[320px] md:h-[360px] -translate-x-1/4 cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]}
                    alt="Previous"
                    className="w-full h-full object-cover rounded-3xl blur-[2px] opacity-40 scale-90 transition-all duration-500"
                  />
                </div>

                {/* Main image container */}
                <div
                  className="relative w-full max-w-2xl h-full rounded-3xl overflow-hidden z-10 shadow-2xl"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      transition: 'transform 0.5s ease-in-out'
                    }}
                  >
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
                  onClick={() => handlePreviewClick('next')}
                  className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-32 md:w-72 h-[320px] md:h-[360px] translate-x-1/4 cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]}
                    alt="Next"
                    className="w-full h-full object-cover rounded-3xl blur-[2px] opacity-40 scale-90 transition-all duration-500"
                  />
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index, index > currentIndex ? 'left' : 'right')}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'bg-blue-500 scale-110'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content section remains the same */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right w-full md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white">
                  Today
                </span>{" "}
                Transform Your Future
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Speak a New Language
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Open New Doors
                </span>
              </h2>
              <p>
                Learn a new language quickly with our flexible courses. Gain confidence,
                explore new opportunities, and connect globally.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Open Up a World of Opportunities
                  </h3>
                  <p>Begin your journey now!</p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Master Language, Expand Your Horizons
                  </h3>
                  <p>Gain fluency and confidence—enroll today!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
