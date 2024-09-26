import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import style from './Rating.module.css';

const Rating = ({ imdbRating, title, movieId }) => {
  const [userRating, setUserRating] = useState(0); // Đánh giá của người dùng
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form đánh giá

  // Lấy rating từ backend khi component được mount
  useEffect(() => {
    const fetchUserRating = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser ? storedUser.id : null;

      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/ratings/${userId}/${movieId}`);
        if (response.ok) {
          const data = await response.json();
          setUserRating(data.rating); // Gán rating lấy từ backend
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchUserRating();
  }, [movieId]); // Chỉ chạy lại nếu movieId thay đổi

  const handleStarClick = (value) => {
    setUserRating(value); // Cập nhật đánh giá của người dùng
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user')); // Lấy user từ localStorage
    const userId = storedUser ? storedUser.id : null;

    if (!userId || !userRating) return;

    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          movieId: movieId,
          rating: userRating,
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
        <span>{imdbRating}/10</span>
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
            <h2>Rate Movie {title}</h2>
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
