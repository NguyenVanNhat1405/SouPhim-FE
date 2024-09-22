import React, { useState, useEffect, useRef } from 'react';
import style from './Carousel.module.css';
import Item from '../Item/Item';
import axios from 'axios';

const Carousel = () => {
  const [hotMovies, setHotMovies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchHotMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=2fbeef9f869f29fb584f184ad3f177ce');
        setHotMovies(response.data.results); // Gán đúng mảng phim vào state
      } catch (error) {
        console.error("Error fetching hot movies:", error);
      }
    };

    fetchHotMovies();
  }, []);

  return (
    <div className={style.carouselContainer}>
      <div>
        <h1>Phổ Biến</h1>
      </div>
      <div className={style.carousel} ref={carouselRef}>
        {Array.isArray(hotMovies) && hotMovies.length > 0 ? (
          hotMovies.map((item, index) => (
            <div className={style.carouselItem} key={index}>
              <Item
                id={item.id}
                name={item.title} // Sử dụng title thay vì name
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`} // Đường dẫn poster
                tap="N/A" // Dữ liệu này có thể được điều chỉnh theo yêu cầu
              />
            </div>
          ))
        ) : (
          <div>Không có phim nào.</div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
