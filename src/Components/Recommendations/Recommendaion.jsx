import React, { useEffect, useState } from 'react';
import style from './Recommendation.module.css';
import Item from '../Item/Item';

const Recommendations = ({ movieId }) => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch(`http://localhost:5000/api/movies/recommendations/${movieId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    // Lấy 4 phim đầu tiên
                    setRecommendedMovies(data.slice(0, 4));
                }
            } catch (error) {
                console.error('Lỗi khi lấy gợi ý phim:', error);
            }
        };

        fetchRecommendations();
    }, [movieId]); // Thêm movieId vào dependency array

    return (
        <div className={style.recContainer}>
            <h1>Có thể bạn thích</h1>
            <div className={style.item}>
                {recommendedMovies.map((movie) => (
                    <div className={style.card} key={movie.id}>
                    <Item
                        id={movie.id}
                        name={movie.title} // Sử dụng name thay vì title
                        image={movie.poster} // Sử dụng image từ item
                    />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
