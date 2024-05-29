import React from 'react';
import style from './Search.module.css'
function SearchBox() {
  return (
    <div>
      <input class={style.input} placeholder="typed here..." name="text" type="text" />
    </div>
  );
}

export default SearchBox;
