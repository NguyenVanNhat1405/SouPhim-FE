import React, { useState, useEffect } from 'react';
import styles from './Favorite.module.css';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  
  // const userId = props.user?.user?.id; // Get userId from props
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {

    }

    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:5000/api/favorites/get`, { // No need to include userId in the URL
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
          localStorage.setItem('favorites', JSON.stringify(data));
        } else {
          console.error('Failed to fetch favorites');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites && storedFavorites.length > 0) {
      setFavorites(storedFavorites);
    } else {
      fetchFavorites();
    }
  },  []);

  const handleRemove = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/delete/${item.itemId}`, { // itemId is passed in the URL
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter(fav => fav.itemId !== item.itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
        {favorites.length > 0 ? (
          <ul>
            {favorites.map(item => (
              <li key={item.itemId} className={styles.item}>
                <p>{item.name}</p>
                <button onClick={() => handleRemove(item)}>Xóa</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Danh sách yêu thích của bạn trống.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
