import React, { useState, useEffect } from 'react';
import styles from './Favorite.module.css';


const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
   // Fetch the token from local storage
  
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
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data); // Set the favorites for the user
          localStorage.setItem(`favorites_${token}`, JSON.stringify(data)); // Optionally store in local storage
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
      fetchFavorites(); // Fetch from server if local storage is empty
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
          'Authorization': `Bearer ${token}`, // Send token for authenticated request
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter(fav => fav.itemId !== item.itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem(`favorites_${token}`, JSON.stringify(updatedFavorites)); // Update local storage
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
