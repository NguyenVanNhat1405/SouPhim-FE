import React from 'react';
import style from './New.module.css';
// import '../Login/Login.css';
import Item from '../Item/Item.jsx';
import new_videos from '../Assets/newphim.js';

const New = () => {
  return (
    <div>
      <div className={style.newVideo}>
        <h1>Xu Hướng</h1>
        <div className={style.videos}>
          {new_videos.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              tap={item.tap}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default New;
