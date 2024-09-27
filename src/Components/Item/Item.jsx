import React, { useRef, useContext, useEffect } from 'react';
import style from './Item.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import AddFavorite from '../AddFavorite/AddFavorite';
import { FaStar } from 'react-icons/fa';


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
  const handleMovieClick = async (movie) => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      // Chỉ truyền các dữ liệu cần thiết
      const bodyData = {
        itemId: movie.id,
        name: movie.name,
        imageUrl: movie.image,
      };
  
      const response = await fetch('http://localhost:5000/api/history/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData), // Chuyển đổi đối tượng chỉ chứa dữ liệu cần thiết
      });
  
      if (response.ok) {
        // Chuyển hướng đến trang chi tiết phim
        window.location.href = `/Movie/${movie.id}`;
      } else {
        console.error('Lỗi khi thêm lịch sử xem');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    }
  };
  

  return (
    <div className={style.card} ref={cardRef}>
      <Link onClick={() => handleMovieClick(movie)}>
        <div className={style.cardImage} style={{ backgroundImage: `url(${movie.image})` }}></div>
        <div className={style.cardInfo}>
          <p>{movie.name}</p>
        </div>
      </Link>
      <AddFavorite movie={movie} className={style.favoriteIcon} />
      <div className={style.rating}>
        <span>{movie.imdbRating}</span>
        <FaStar style={{ fontSize: '15px', color: '#ffd700' }} />
      </div>
    </div>
  );
};

export default Item;
