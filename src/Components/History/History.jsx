import React, { useState, useEffect } from 'react';
import style from './WatchHistory.module.css'; // Tạo file CSS tương ứng nếu chưa có
import Item from '../Item/Item'; // Nếu cần hiển thị đánh giá

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // Nếu không có token, không làm gì cả

    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/history/get', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWatchHistory(data.slice(0, 4)); // Cập nhật trạng thái
        } else {
          console.error('Lỗi khi lấy lịch sử xem');
        }
      } catch (error) {
        console.error('Lỗi kết nối API:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className={style.historyContainer}>
      <h1>Truy cập gần đây</h1>
      <div className={style.historyList}>
        {watchHistory.length > 0 ? ( // Kiểm tra nếu có lịch sử xem
          watchHistory.map((item) => (
            <div className={style.card} key={item._id}> {/* Sử dụng _id làm key */}
              <Item
                id={item.movieId} // Chỉnh sửa id thành movieId
                name={item.name} // Sử dụng name thay vì title
                image={item.imageUrl} // Sử dụng image từ item
              />
            </div>
          ))
        ) : (
          <div>Chưa có phim nào trong lịch sử xem.</div> // Hiển thị thông báo nếu không có lịch sử
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
