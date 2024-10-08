import React, { useContext, useRef, useEffect } from 'react';
import style from './Popular.module.css';
import Item from '../Item/Item';
import { Context } from '../../Context/Context';

const Popular = (showLogin) => {
  const { popularMovies } = useContext(Context); // Lấy popularMovies từ context
  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        // Cuộn xuống 200px mỗi lần, hoặc tùy chỉnh theo chiều cao item
        carouselRef.current.scrollBy({
          top: 50, // Cuộn theo chiều dọc
          behavior: 'smooth' // Cuộn mượt mà
        });

        // Kiểm tra nếu đã cuộn đến cuối, trở về đầu
        if (carouselRef.current.scrollTop + carouselRef.current.clientHeight >= carouselRef.current.scrollHeight) {
          carouselRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 1000); // Thời gian giữa mỗi lần cuộn (3000ms = 3 giây)

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={style.carouselContainer}>
      <div>
        <h1>Phim Phổ Biến</h1>
      </div>
      <div className={style.carousel} ref={carouselRef}>
        {popularMovies.length > 0 ? (
          popularMovies.map((item) => (
            <div className={style.carouselItem} key={item.id}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
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

export default Popular;
