// ImageSlider.js
import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Adjust the interval time as needed (in milliseconds)
    
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [items.length]);

  return (
    <div className="mt-4 h-[410px] w-full overflow-hidden">
      <div className="h-[100%] w-full flex ">
        {items.map((image, index) => (
          <div key={index} className="slide w-full" style={{ marginLeft: `${index === 0 ? -currentIndex * 100 : 0}%` }}>
          
            <img className="small-image w-screen  h-[100%] object-center" src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
