import React, { useRef, useContext, useEffect } from 'react';
import style from './Item.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import AddFavorite from '../AddFavorite/AddFavorite';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Item = ({ id }) => {
  const cardRef = useRef(null);
  const { movieDb } = useContext(Context);
  
  // Sử dụng useEffect ngay từ đầu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
          } else {
            entry.target.classList.remove(style.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, [id]);

  // Tìm phim dựa trên id
  const movie = movieDb.find(movie => String(movie.id) === String(id));

  // Điều kiện trả về sớm sau khi gọi hook
  if (!movie) {
    return null;
  }

  return (
    <div className={style.card} ref={cardRef}>
      <Link to={`/Movie/${movie.id}`} onClick={scrollToTop}>
        <div className={style.cardImage} style={{ backgroundImage: `url(${movie.image})` }}></div>
        <div className={style.cardInfo}>
          <p>{movie.name}</p>
        </div>
      </Link>
      <AddFavorite movie={movie} className={style.favoriteIcon}/>
    </div>
  );
};

export default Item;
