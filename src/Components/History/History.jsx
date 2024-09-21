import React, { useState, useEffect } from 'react';

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  
const WatchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = loadFromLocalStorage('watchHistory');
    setHistory(savedHistory);
  }, []);

  const addToHistory = (newItem) => {
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    saveToLocalStorage('watchHistory', updatedHistory);
  };

  return (
    <div>
      <h2>Lịch sử xem</h2>
      {history.length === 0 ? (
        <p>Chưa có lịch sử xem.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Đã xem vào: {new Date(item.watchedAt).toLocaleString()}</p>
                <p>Tiến độ: {item.progress}%</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
