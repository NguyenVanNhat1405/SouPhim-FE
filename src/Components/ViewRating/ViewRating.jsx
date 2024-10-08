import React, { useState, useEffect } from 'react';
import styles from './ViewRating.module.css';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FavoritesList = () => {
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ratings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Rating Data:", data);
          setRatings(data);
          localStorage.setItem(`ratings_${token}`, JSON.stringify(data));
        } else {
          console.error('Failed to fetch ratings');
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    const storedRating = JSON.parse(localStorage.getItem(`rating_${token}`));
    if (storedRating && storedRating.length > 0) {
      setRatings(storedRating);
    } else {
      fetchRatings();
    }
  }, []);

  const handleRemove = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/ratings/delete/${movie.movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Xóa thành công, cập nhật lại danh sách rating
        setRatings(prevRatings => prevRatings.filter(r => r.movieId !== movie.movieId));
      } else {
        console.error('Failed to remove rating');
      }
    } catch (error) {
      console.error('Error removing rating:', error);
    }
  };

  const goToMovieDetail = (movieId) => {
    navigate(`/movie/${movieId}`); // Điều hướng đến route chi tiết phim
  };

  return (
    <div className={styles.favorite}>
      <div className={styles.topic}>
        <h1>Danh sách đánh giá</h1>
      </div>
      <div className={styles.favoritesList}>
        <ul>
          {ratings.map(movie => (
            <li key={movie.movieId} className={styles.item}>
              <img src={movie.imageUrl} alt={movie.name} onClick={() => goToMovieDetail(movie.movieId)} />
              <p>{movie.name}</p>
              <div className={styles.rating}>
              {movie.rating}
              <FaStar style={{
                    fontSize: '20px',
                    color: "#ffd700", // Màu vàng cho số sao được chọn
                    cursor: 'pointer',
                  }}></FaStar>
              </div>
              <button onClick={() => handleRemove(movie)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoritesList;
