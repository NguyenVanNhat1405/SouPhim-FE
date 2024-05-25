import React from 'react';
import './Search.css'; // Đảm bảo rằng đường dẫn đến file CSS của bạn là chính xác

const Search = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden' }}>
      <form className="bar">
        <input type="search" name="search" pattern=".*\S.*" required autoComplete="off" />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Search;
