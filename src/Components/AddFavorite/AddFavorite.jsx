import React, { useState, useEffect } from 'react';
import style from './AddFavorite.module.css';

const AddFavorite = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];
      const isMovieFavorite = storedFavorites.some(fav => String(fav.movieId) === String(movie.id));
      setIsFavorite(isMovieFavorite);
    }
  }, [movie.id]);

  const handleFavorite = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => {
        alert("Vui lòng đăng nhập!!");
        window.location.reload();
      }, 500);
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
          movieId: movie.id,   // Ensure this matches the backend model
          name: movie.name,
          imageUrl: movie.image,  // Ensure consistency in field names
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

  const removeFavorite = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete/${movie.id}`, {
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
      console.error('Lỗi khi xóa yêu thích:', error);
    }
  };

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];

    if (!isFavorite) {
      const updatedFavorites = [...storedFavorites, { movieId: movie.id, name: movie.name, imageUrl: movie.image }];
      localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites));
      await handleFavorite(movie);
      setIsFavorite(true);
    } else {
      const updatedFavorites = storedFavorites.filter(fav => fav.movieId !== movie.id);
      localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites));
      await removeFavorite(movie);
      setIsFavorite(false);
    }
  };

  return (
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
  );
};

export default AddFavorite;
