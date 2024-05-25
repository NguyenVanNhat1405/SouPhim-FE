// Item.jsx
import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Item = (props) => {
  return (
    <div className='card'>
      <Link to={`/video/${props.id}`} onClick={scrollToTop}>
        {/* Bỏ phần <img> và thay thế bằng background-image trên phần tử .card */}
        <div className="card-image" style={{ backgroundImage: `url(${props.image})` }}></div>

        {/* Sử dụng data-content để truyền dữ liệu từ props */}
        <p data-content={props.name}>{props.name}</p>
      </Link>
    </div>
  );
}

export default Item;
