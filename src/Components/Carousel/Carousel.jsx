import React, { useContext, useRef } from 'react';
import { Context } from '../../Context/Context'; // Đảm bảo rằng đường dẫn đến Context là chính xác
import './Carousel.css';

const Carousel = () => {
  const { all_img } = useContext(Context); // Lấy dữ liệu từ Context
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (direction === 'left') {
      current.scrollLeft -= current.offsetWidth;
    } else {
      current.scrollLeft += current.offsetWidth;
    }
  };

  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={() => scroll('left')}>‹</button>
      <div className="carousel" ref={carouselRef}>
        {all_img.map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={img.image} alt={`Carousel item ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll('right')}>›</button>
    </div>
  );
};

export default Carousel;
