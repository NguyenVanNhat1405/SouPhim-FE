import React, { useContext } from 'react';
import style from './CSS/Category.module.css';
import { Context } from '../Context/Context'; // Import Context
import Item from '../Components/Item/Item';

// Map quốc gia
const countryMap = {
  "United States": "Mỹ",
  "South Korea": "Hàn Quốc",
  "China": "Trung Quốc",
  "Vietnam": "Việt Nam",
  "Thailand": "Thái Lan",
  "Japan": "Nhật Bản",
  "United Kingdom": "Anh Quốc",
  "France": "Pháp"
 
};

const Quocgia = ({ quocgia }) => {
  const { movieDb } = useContext(Context); // Lấy all_img từ Context

  // Tìm tên quốc gia bằng map, nếu không có thì gán là "Khác"
  const vietnameseCountry = countryMap[quocgia] || 'Khác';
  

  // Lọc các phim có cùng quốc gia hoặc thuộc "Khác"
  const filteredMovies = movieDb.filter(item => {
    const movieCountry = countryMap[item.countries] || 'Khác';
    return movieCountry === vietnameseCountry|| (item.countries && item.countries.includes(quocgia));
  });
  return (
    <div className={style.img}>
      <div className={style.title}>
        <h1>{vietnameseCountry}</h1> {/* Hiển thị tên quốc gia đã chuyển đổi */}
      </div>
      <div className={style.Indeximg}></div>
      <div className={style.category}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((item) => (
            <Item 
              key={item.id} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              />
          ))
        ) : (
          <p>Không tìm thấy phim nào thuộc quốc gia này.</p>
        )}
      </div>
    </div>
  );
};

export default Quocgia;
