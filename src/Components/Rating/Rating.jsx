import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import style from './Rating.module.css';

const Rating = ({ movie, onClose }) => {
  const [userRating, setUserRating] = useState(0); // Đánh giá của người dùng
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form đánh giá

  // Lấy token và user từ localStorage
  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser ? storedUser.id : null;
  const username = storedUser ? storedUser.username : 'Unknown';
  // Lấy rating từ backend khi component được mount
  useEffect(() => {
    const fetchUserRating = async () => {
      if (!userId || !movie.id) {
        setUserRating(0);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/ratings/${userId}/${movie.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          // console.log(data); // Check the full structure
          if (data && data.rating) {
            setUserRating(data.rating); // Use the correct path to rating
          } else {
            console.log("Rating not found in response");
            setUserRating(0);
          }
        } else {
          if (response.status === 404) {
            setUserRating(0);
          } else {
            console.error('Failed to fetch user rating:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
        setUserRating(0); // Set to 0 in case of an error
      }
    };
  
    fetchUserRating();
  }, [movie.id, userId, token]);
   // Chỉ chạy lại nếu movieId, userId, hoặc token thay đổi

  const handleStarClick = (value) => {
    setUserRating(value); // Cập nhật đánh giá của người dùng
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !userRating || !token) {
      alert('Please log in to rate.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sử dụng token từ localStorage
        },
        body: JSON.stringify({
          userId,
          movieId:movie.id,
          name: movie.name,
          rating: userRating,
          imageUrl: movie.image,
          username,
        }),
      });

      if (response.ok) {
        setShowForm(false); // Đóng form sau khi gửi
      } else {
        const errorData = await response.json();
        console.error('Failed to save rating:', errorData);
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    if (onClose) {
      onClose();
    }
  };

  const openForm = () => {
    setShowForm(true); // Mở form khi nhấp vào ngôi sao
  };

  const removeRating = () => {
    setUserRating(0); // Đặt lại đánh giá về 0
  };

  return (
    <div className={style.rating_container}>
      {/* IMDB Rating */}
      <div className={style.imdb_rating}>
        <h1>IMDB Rating</h1>
        <FaStar className={style.star} style={{ fontSize: '2em', color: '#ffd700' }} />
        <span>{movie.imdbRating}/10</span>
      </div>

      {/* User Rating */}
      <div className={style.user_rating}>
        <h1>Your Rating</h1>
        <FaStar
          className={style.star}
          style={{
            fontSize: '2em',
            color: userRating > 0 ? '#0e90ed' : 'white', // Đổi màu ngôi sao sau khi đánh giá
            cursor: 'pointer',
          }}
          onClick={openForm}
        />
        <span>{userRating > 0 ? `${userRating}/10` : 'No rating'}</span>
      </div>

      {/* Form hiển thị ở giữa màn hình */}
      {showForm && (
        <div className={style.overlay}>
          <div className={style.rating_form}>
            <button className={style.closeFr} onClick={handleClose}>x</button>
            <h2>Rate Movie {movie.name}</h2>
            <div className={style.stars_container}>
              {[...Array(10)].map((_, index) => (
                <FaStar
                  key={index}
                  className={style.star}
                  onClick={() => handleStarClick(index + 1)}
                  style={{
                    fontSize: '2.5em',
                    color: index < userRating ? '#ffd700' : '#d3d3d3', // Màu vàng cho số sao được chọn
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <button type="submit" className={style.submit_button}>Submit</button>
              {userRating > 0 && (
                <button className={style.remove_rating_button} onClick={removeRating}>
                  Remove Rating
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
