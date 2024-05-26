import React from 'react';
import './CSS/Category.css';
// import { Context } from '../Context/Context';
import Item from '../Components/Item/Item';
import all_img from "../Components/Assets/all_img.js";
const Category = (props) => {
  // const all_img = useContext(Context);

  // Kiểm tra xem all_img đã được khởi tạo và có dữ liệu không


  return (
    <div className='category-img'>
      <div className='category-title'>
        <h1>{props.til}</h1>
      </div>
      <div className='category-Indeximg'>
      </div>
      <div className='category'>
        {all_img.map((item, i) => {
          // Kiểm tra xem quốc gia của item có trùng với quốc gia truyền vào không
          if (props.quocgia === item.quocgia) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} tap={item.tap} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Category;
