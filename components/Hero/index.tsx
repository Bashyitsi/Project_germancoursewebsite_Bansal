"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Hero = () => {
  const [heroHeight, setHeroHeight] = useState("100vh");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "/images/hero/background1.jpg",
    "/images/hero/background2.jpg",
    "/images/hero/background3.jpg",
  ];

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setHeroHeight(`${windowHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: heroHeight, marginTop: "70px" }}
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`German Learning Scene ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-end justify-center pb-20 mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="text-center transition-all duration-700 ease-in-out transform translate-y-0 opacity-100 hover:translate-y-2 hover:opacity-90">
          <h1 className="mb-6 text-4xl font-bold text-white xl:text-5xl">
            Welcome to Deutsch Connect Academy
          </h1>
          <p className="mb-8 max-w-3xl mx-auto text-white text-lg">
            Embark on your German language journey with Deutsch Connect Academy.
            Our expert-led courses cater to all proficiency levels, from complete
            beginners to advanced speakers.
          </p>
          <h4 className="mb-4.5 text-lg font-bold text-primary bg-white bg-opacity-30 inline-block px-4 py-1 rounded-full">
            📚 Your Path to German Fluency
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Hero;
