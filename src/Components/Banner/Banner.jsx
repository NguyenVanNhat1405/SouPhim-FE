import React, { useState, useEffect } from 'react';
import style from './Banner.module.css';

const Banner = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={style.bann}>
      <div className={style.title}><h1>Sắp ra mắt</h1></div>
      <div className={style.banner}>
        {images.map((image, index) => (
          <img
            key={`${image}-${index}`}
            src={image}
            alt="Banner"
            className={index === currentImageIndex ? style.active : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
