import React from 'react';
import './CSS/Category.css';
import Item from '../Components/Item/Item';
import all_img from "../Components/Assets/all_img.js";

const Theloai = (props) => {
  const { theloai } = props;

  // Lọc các ảnh dựa trên các tiêu chí đã chọn
  const filteredImages = all_img.filter((item) => {
    if (
      (!theloai || item.theloai.includes(props.theloai))
    ) {
      return true;
    }
    return false;
  });

  return (
    <div className='category-img'>
      <div className='category-title'>
        <h1>{props.til}</h1>
      </div>
      <div className='category'>
        {filteredImages.map((item, index) => (
          <Item key={index} id={item.id} name={item.name} image={item.image} tap={item.tap} />
        ))}
      </div>
    </div>
  );
};

export default Theloai;
