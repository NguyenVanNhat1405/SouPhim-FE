import React from 'react';
import style from './CSS/Category.module.css';
import { useLocation } from 'react-router-dom'; 
// import { Context } from '../Context/Context';
import Item from '../Components/Item/Item';
import all_img from "../Components/Assets/all_img.js";
const Category = (props) => {
  const location = useLocation(); // Sử dụng hook useLocation để lấy thông tin về route hiện tại

  // Tạo một mảng để lưu các tiêu đề duy nhất
  const uniqueTitles = [...new Set(all_img.map(item => item.quocgia))];

  // Lấy tiêu đề tương ứng với route hiện tại
  const getCurrentTitle = () => {
    // Lấy đường dẫn của route hiện tại
    const currentPath = location.pathname;
    
    // Duyệt qua mảng all_img để tìm tiêu đề tương ứng với route
    for (let i = 0; i < all_img.length; i++) {
      if (currentPath.includes(all_img[i].quocgia)) {
        return all_img[i].quocgia;
      }
    }
    // Nếu không tìm thấy, trả về null
    return null;
  };

  return (
    <div className={style.img}>
      <div className={style.title}>
      <h1>{getCurrentTitle() || uniqueTitles[0]} </h1>
      </div>
      <div className={style.Indeximg}>
      </div>
      <div className={style.category}>
        {all_img.map((item, i) => {
          // Kiểm tra xem quốc gia của item có trùng với quốc gia truyền vào không
          if (props.quocgia === item.quocgia) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} tap={item.tap} tapco={item.tapco} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Category;
