import React, { useContext } from 'react';
import style from './CSS/Category.module.css';
import { Context } from '../Context/Context';
import Item from '../Components/Item/Item';
const categoryMap = {
  "Action": "Hành Động",
  "Adventure": "Phiêu Lưu",
  "Animation": "Hoạt Hình",
  "Comedy": "Hài Hước",
  "Mystery": "Giật Gân",
  "Drama": "Kịch Tính",
  "Horror": "Kinh Dị",
  "Romance": "Ngôn Tình",
  "Sci-Fi": "Viễn Tưởng",
  "Family": "Gia Đình",
  "Fantasy": "Chuyển Thể"
};
const Theloai = ({ theloai, showLogin }) => {
  const { movieDb } = useContext(Context); 
  const vietnameseCate = categoryMap[theloai]
  // Lọc các ảnh dựa trên thể loại phim
  const filteredImages = movieDb.filter((item) => {
    const movieCate = categoryMap[item.genres]
  
    return !movieCate ===vietnameseCate || (item.genres && item.genres.includes(theloai));
    
  });

  return (
    <div className={style.img}>
      <div className={style.title}>
        <h1>{vietnameseCate}</h1>
      </div>
      <div className={style.category}>
        {filteredImages.length > 0 ? (
          filteredImages.map((item) => (
            <Item key={item} showLogin={showLogin}
            id={item.id} 
            name={item.name} 
            image={item.image} 
              />
          ))
        ) : (
          <div>Không có phim nào trong thể loại này.</div>
        )}
      </div>
    </div>
  );
};

export default Theloai;
