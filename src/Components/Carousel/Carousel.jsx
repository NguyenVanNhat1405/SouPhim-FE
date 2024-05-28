import React, { useRef } from 'react';
import './Carousel.css';
import Item from '../Item/Item';
import hot_img from '../Assets/newphim';

const Carousel = () => {
  const carouselRef = useRef(null);

  return (
    <div className="carousel-container">
      <div>
        <h1>Phim Hot</h1>
      </div>
      <div className="carousel" ref={carouselRef}>
        {hot_img.map((item, index) => (
          <div className="carousel-item" key={index}>
            <Item
              id={item.id}
              name={item.name}
              image={item.image}
              tap={item.tap}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
