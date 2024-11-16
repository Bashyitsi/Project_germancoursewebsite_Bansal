'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import featuresData from './featuresData';
import SectionHeader from '../Common/SectionHeader';

const Feature = () => {
  const [position, setPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const featureWidth = 400;
  const gap = 27; // 6 * 4 = 24px (gap-6 in Tailwind)
  const totalWidth = featuresData.length * (featureWidth + gap) - gap; // Subtract last gap

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovering) {
        setPosition((prevPosition) => {
          // Adjust the reset point to account for the gap
          if (Math.abs(prevPosition) >= totalWidth) {
            return 0;
          }
          return prevPosition - 1;
        });
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [totalWidth, isHovering]);

  const handleScroll = (e: { currentTarget: any; }) => {
    const container = e.currentTarget;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 100;
    
    if (isAtEnd) {
      container.scrollLeft = 0;
    }
  };

  return (
    <section id="features" className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "SOLID REASONS",
            subtitle: "Why to choose us!",
            description: `At Deutsch Connect Academy, we don't just teach German – we redefine the language learning experience. Here's what sets us apart and makes us the top choice for mastering German:`,
          }}
        />

        <div
          className="mt-12.5 relative overflow-x-auto scrollbar-hide"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onScroll={handleScroll}
          style={{
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="relative h-[400px] w-full cursor-grab active:cursor-grabbing">
            {[...Array(2)].map((_, setIndex) => (
              <div
                key={setIndex}
                className="absolute top-0 flex gap-6"
                style={{
                  transform: `translateX(${position + (setIndex * totalWidth)}px)`,
                  transition: 'transform 0.1s linear',
                  width: `${totalWidth}px`
                }}
              >
                {featuresData.map((feature, index) => (
                  <div
                    key={index}
                    className="flex-none w-[400px] transform transition-all duration-500 hover:scale-105 hover:z-10"
                  >
                    <div className="h-full rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
                        <Image
                          src={feature.icon}
                          width={36}
                          height={36}
                          alt={feature.title}
                        />
                      </div>
                      <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                        {feature.title}
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;