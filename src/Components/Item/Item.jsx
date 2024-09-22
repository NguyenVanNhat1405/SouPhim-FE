import React, { useState, useEffect, useRef, useContext } from 'react';
import style from './Item.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Item = ({ id }) => { // Thay thế id bằng { id } để nhận từ props
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef(null);
  const { movieDb } = useContext(Context);
  
  // Tìm phim dựa trên id
  const movie = movieDb.find(movie => String(movie.id) === String(id)); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token');
      return;
    }

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];
    const isItemFavorite = storedFavorites.some(fav => String(fav.itemId) === String(id)); // So sánh id kiểu chuỗi
    setIsFavorite(isItemFavorite);

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

  const handleFavorite = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/favorites/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item.id,
          name: item.name,
          imageUrl: item.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Yêu thích đã được thêm:', data);
      } else {
        const errorData = await response.json();
        console.error('Server trả về lỗi:', errorData);
      }
    } catch (error) {
      console.error('Lỗi khi thêm yêu thích:', error);
    }
  };

  const removeFavorite = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFavorite(false);
        console.log('Yêu thích đã được xóa');
      } else {
        const errorData = await response.json();
        console.error('Server trả về lỗi khi xóa:', errorData);
      }
    } catch (error) {
      console.error('Lỗi khi xóa yêu thích:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!movie.id || !movie.name) {
      console.error('Thiếu dữ liệu cần thiết của item');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token');
      return;
    }

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];

    if (!isFavorite) {
      const updatedFavorites = [...storedFavorites, { itemId: movie.id, name: movie.name }];
      localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites));

      try {
        await handleFavorite(movie); // Gửi yêu cầu thêm yêu thích lên backend
        setIsFavorite(true); // Cập nhật UI sau khi backend trả về thành công
      } catch (error) {
        console.error('Lỗi khi thêm yêu thích:', error);
      }
    } else {
      const updatedFavorites = storedFavorites.filter(fav => fav.itemId !== movie.id);
      localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites));

      try {
        await removeFavorite(movie); // Gửi yêu cầu xóa yêu thích lên backend
        setIsFavorite(false); // Cập nhật UI sau khi backend trả về thành công
      } catch (error) {
        console.error('Lỗi khi xóa yêu thích:', error);
      }
    }
  };

  if (!movie) {
    return null; // Nếu không tìm thấy phim, không hiển thị gì
  }

  return (
    <div className={style.card} ref={cardRef}>
      <Link to={`/Movie/${movie.id}`} onClick={scrollToTop}>
        <div className={style.cardImage} style={{ backgroundImage: `url(${movie.image})` }}></div>
        <div className={style.cardInfo}>
          <p>{movie.name}</p>
          {/* <p>{movie.seasons.length > 0 ? `Số tập: ${movie.seasons.length}` : 'tập?'}</p> */}
        </div>
      </Link>
      <svg
        onClick={toggleFavorite}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'red' : 'none'}
        stroke="currentColor"
        className={`${style.favoriteIcon} ${isFavorite ? style.active : ''}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 21C12 21 7 16.5 4 12.5C1.5 9.5 1.5 6.5 3 5C4.5 3.5 7 4 9 5.5C10.5 4 13.5 4 15 5.5C16.5 7 16.5 9.5 14 12.5C11 16.5 12 21 12 21Z"
        />
      </svg>
    </div>
  );
};

export default Item;
