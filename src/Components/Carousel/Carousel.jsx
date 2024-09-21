import React, { useRef } from 'react';
import style from './Carousel.module.css';
import Item from '../Item/Item';
import hot_img from '../Assets/newphim';

const Carousel = () => {
  const carouselRef = useRef(null);

  return (
    <div className={style.carouselContainer}>
      <div>
        <h1>Phổ Biến
        </h1>
      </div>
      <div className={style.carousel} ref={carouselRef}>
        {hot_img.map((item, index) => (
          <div className={style.carouselItem} key={index}>
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
