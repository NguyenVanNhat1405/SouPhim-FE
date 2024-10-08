import React, { useState, useEffect } from 'react';
import styles from './CSS/Favorite.module.css';
import { useNavigate } from 'react-router-dom';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Favorites Data:", data);
          setFavorites(data);
          localStorage.setMovie(`favorites_${token}`, JSON.stringify(data));
        } else {
          console.error('Failed to fetch favorites');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${token}`));
    if (storedFavorites && storedFavorites.length > 0) {
      setFavorites(storedFavorites);
    } else {
      fetchFavorites();
    }
  }, []);

  const handleRemove = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete/${movie.movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter(fav => fav.movieId !== movie.movieId);
        setFavorites(updatedFavorites);
        localStorage.setMovie(`favorites_${token}`, JSON.stringify(updatedFavorites));
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const goToMovieDetail = (movieId) => {
    navigate(`/movie/${movieId}`); // Điều hướng đến route chi tiết phim
  };

  return (
    <div className={styles.favorite}>
      <div className={styles.topic}>
        <h1>Danh sách yêu thích</h1>
      </div>
      <div className={styles.favoritesList}>
        <ul>
          {favorites.map(movie => (
            <li key={movie.movieId} className={styles.item}>
              <img src={movie.imageUrl} alt={movie.name} onClick={() => goToMovieDetail(movie.movieId)} />
              <p>{movie.name}</p>
              <button onClick={() => handleRemove(movie)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesList;
