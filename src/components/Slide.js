import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const images = [
  "https://i.pinimg.com/564x/1d/0a/0b/1d0a0b064a29bf7985bafbb6cf6bb6bb.jpg",
  "https://i.pinimg.com/564x/ac/82/c9/ac82c985a89fc0c283ccdff8e25013c3.jpg",
  "https://i.pinimg.com/736x/10/ff/72/10ff723365a40b1c797c9eced2539e8f.jpg",
  'https://i.pinimg.com/736x/95/85/de/9585deb1a0d5d27b46b7beedaa0a2592.jpg',
];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div>
    <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 py-16 px-8">
      {/* Text Section */}
      <div className=" mt-10 lg:w-1/2 flex flex-col justify-center items-start text-left space-y-6 mb-8 lg:mb-0">
        <h2 className="text-4xl font-bold text-teal-800">
          Discover Your Dream Furniture
        </h2>
        <p className="text-gray-600 ">
          Find the perfect pieces to complete your home. Comfort, style, and affordability all in one place.
        </p>
        <NavLink to="/store">
          <button className="bg-teal-800 text-white py-3 px-6 rounded-lg shadow hover:bg-teal-700 transition-all">
            Explore
          </button>
        </NavLink>
      </div>

      {/* Slideshow Section */}
      <div className=" mt-10 lg:w-1/2 relative w-full h-96 lg:h-auto overflow-hidden rounded-lg shadow-lg ">
        <img
          src={images[currentIndex]}
          alt="Furniture"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    </div>
  );
};

export default Slide;

