import React, { useContext }from 'react';
import style from './New.module.css';

import Item from '../Item/Item.jsx';
import { Context } from '../../Context/Context';

const New = (showLogin) => {
  const { newMovies } = useContext(Context);
  return (
    <div>
      <div className={style.newVideo}>
        <h1>Xu Hướng</h1>
        <div className={style.videos}>
          {Array.isArray(newMovies) && newMovies.length > 0 ? (
          newMovies.map((item, index) => (
            <div className={style.videoItem} key={index}>
              <Item showLogin={showLogin}
                id={item.id}
                name={item.name} // Sử dụng name thay vì title
                image={item.image} // Sử dụng image từ item
              />
            </div>
          ))
        ) : (
          <div>Không có phim nào.</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default New;
