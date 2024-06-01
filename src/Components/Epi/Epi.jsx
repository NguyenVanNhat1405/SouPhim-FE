import React from 'react';
import style from './Epi.module.css';

const Epi = ({ tapList }) => {
  // Kiểm tra nếu tapList không phải là một mảng hoặc rỗng
  if (!Array.isArray(tapList) || tapList.length === 0) {
    return <div>Không có tập nào để hiển thị</div>;
  }

  return (
    <div>
      <div className={style.epi}>
        <h1>Danh Sách Tập</h1>
        <div className={style.tap}>
          {tapList.map((episode, i) => (
            <button key={i}>
              Tập {episode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Epi;
