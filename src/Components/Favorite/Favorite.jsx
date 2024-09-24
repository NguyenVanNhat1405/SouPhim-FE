import React, { useState, useEffect } from 'react';
import styles from './Favorite.module.css';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const fetchFavorites = async (item) => {
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/get`, {
          headers: {
            'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Favorites Data:", data); // Kiểm tra dữ liệu lấy về
          setFavorites(data);
          localStorage.setItem(`favorites_${token}`, JSON.stringify(data));
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

  const handleRemove = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete/${item.itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter(fav => fav.itemId !== item.itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites));
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className={styles.favorite}>
      <div className={styles.favoritesList}>
        <h1>Danh sách yêu thích</h1>
        <ul>
          {favorites.map(item => (
            <li key={item.itemId} className={styles.item}>
              {console.log("Image URL:", item.imageUrl)} {/* Kiểm tra đường dẫn hình ảnh */}
              <img src={item.imageUrl} alt={item.name} />
              <p>{item.name}</p>
              <button onClick={() => handleRemove(item)}>Xóa</button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default FavoritesList;
