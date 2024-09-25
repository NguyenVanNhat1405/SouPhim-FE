import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import style from './Search.module.css';

function SearchBox() {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Sử dụng encodeURIComponent để đảm bảo URL hợp lệ
    }
    setIsActive(false);
  };

  return (
    <div className={style.searchBox}>
      <FaSearch onClick={() => setIsActive(true)} className={style.searchIcon} size={25} />
      {isActive && (
        <input
          className={style.input}
          placeholder="Type here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Tìm kiếm khi nhấn Enter
          autoFocus
          onBlur={() => setIsActive(false)}
        />
      )}
    </div>
  );
}

export default SearchBox;
