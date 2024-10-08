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
const Theloai = ({ theloai }) => {
  const { movieDb } = useContext(Context); 
  const vietnameseCate = categoryMap[theloai]
  // Lọc các ảnh dựa trên thể loại phim
  const filteredImages = movieDb.filter((movie) => {
    const movieCate = categoryMap[movie.genres]
  
    return !movieCate ===vietnameseCate || (movie.genres && movie.genres.includes(theloai));
    
  });
  

  return (
    <div className={style.img}>
      <div className={style.title}>
        <h1>{vietnameseCate}</h1>
      </div>
      <div className={style.category}>
        {filteredImages.length > 0 ? (
          filteredImages.map((movie) => (
            <Item key={movie.id}
            id={movie.id} 
            name={movie.name} 
            image={movie.image} 
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
