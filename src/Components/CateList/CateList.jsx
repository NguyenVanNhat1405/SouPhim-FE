import React, { useContext, useRef } from 'react';
import style from './CateList.module.css';
import { Context } from '../../Context/Context';
import Item from '../Item/Item';

const categoryMap = {
  "Action": "Hành Động",
  "Adventure": "Phiêu Lưu",
  "Animation": "Hoạt Hình",
  "Comedy": "Hài Hước",
  "Mystery": "Giật Gân",
  "Drama": "Kịch Tính",
  "Horror": "Kinh Dị",
  "Romance": "Ngôn Tình",
  "Sci-Fi": "Viễn Tưởng",
  "Family": "Gia Đình",
  "Fantasy": "Chuyển Thể"
};

const CategoryList = () => {
  const { movieDb } = useContext(Context);
  const scrollRef = useRef({});

  const handleScroll = (theloai, direction) => {
    const scrollContainer = scrollRef.current[theloai];
    const scrollAmount = 300; // Khoảng cách cuộn (px)

    if (scrollContainer) {
      const newScrollPosition =
        scrollContainer.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainer.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={style.categoryList}>
      {Object.keys(categoryMap).map((theloai) => {
        const vietnameseCate = categoryMap[theloai];
        const filteredMovies = movieDb.filter((movie) => movie.genres.includes(theloai));

        return (
          <div className={style.categorySection} key={theloai}>
            <h2 className={style.title}>{vietnameseCate}</h2>
            <div className={style.carouselContainer}>
              <button
                className={style.arrowLeft}
                onClick={() => handleScroll(theloai, 'left')}
              >
                &#8249; {/* Mũi tên trái */}
              </button>
              <div
                className={style.movieCarousel}
                ref={(el) => (scrollRef.current[theloai] = el)}
              >
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <div className={style.itemWrapper} key={movie.id}>
                      <Item
                        id={movie.id}
                        name={movie.name}
                        image={movie.image}
                      />
                    </div>
                  ))
                ) : (
                  <div>Không có phim nào trong thể loại này.</div>
                )}
              </div>
              <button
                className={style.arrowRight}
                onClick={() => handleScroll(theloai, 'right')}
              >
                &#8250; {/* Mũi tên phải */}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
