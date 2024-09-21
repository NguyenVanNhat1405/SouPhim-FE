import React, { useState, useEffect, useRef } from 'react';
import style from './Item.module.css';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Item = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef(null);

  // Log để kiểm tra giá trị của props.user và các props khác
  console.log('Item props:', props);

  const user = props.user || { id: 'default-id' }; // Đảm bảo user luôn có id

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
    const isItemFavorite = storedFavorites.some(fav => fav.itemId === props.id);
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
  }, [props.id, user.id]);

  const handleFavorite = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
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
          userId: user.id,  // Đảm bảo gửi đúng userId
          itemId: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
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
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete${user.id}/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Yêu thích đã được xóa');
      } else {
        const errorData = await response.json();
        console.error('Server trả về lỗi khi xóa:', errorData);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const toggleFavorite = () => {
    if (!props.id || !props.name) {
      console.error('Thiếu dữ liệu cần thiết của item');
      return;
    }

    setIsFavorite(!isFavorite);

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];

    if (!isFavorite) {
      const updatedFavorites = [...storedFavorites, { itemId: props.id, name: props.name }];
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
      handleFavorite(props); // Add to backend
    } else {
      const updatedFavorites = storedFavorites.filter(fav => fav.itemId !== props.id);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
      removeFavorite(props); // Remove from backend
    }
  };

  return (
    <div className={style.card} ref={cardRef}>
      <Link to={`/review/${props.id}`} onClick={scrollToTop}>
        <div className={style.cardImage} style={{ backgroundImage: `url(${props.image})` }}></div>
        <div><p>{props.name}</p></div>
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
