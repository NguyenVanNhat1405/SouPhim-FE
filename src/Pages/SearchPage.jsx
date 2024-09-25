import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CSS/SearchPage.module.css';
import Item from '../Components/Item/Item'; // Import Item để dùng
import { useLocation } from 'react-router-dom'; // Import useLocation

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(''); // Thêm state để lưu query
  const location = useLocation(); // Lấy location từ react-router-dom

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get('query'); // Lấy query từ URL
    setQuery(queryParam || ''); // Cập nhật state query
    if (queryParam) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/movies/search`, {
            params: { query: queryParam },
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      };
      fetchData();
    }
  }, [location]); // Chạy lại khi location thay đổi

  return (
    <div className={styles.searchPage}>
      <h1>Kết quả tìm kiếm của '{query}' là</h1> {/* Hiển thị query trong thẻ h1 */}

      <div className={styles.results}>
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <Item key={movie.id} id={movie.id} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
