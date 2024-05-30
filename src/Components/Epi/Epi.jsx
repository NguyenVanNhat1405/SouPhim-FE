import React from 'react';
import style from './Epi.module.css';
import tapList from '../Assets/all_img';

const Epi = () => {
  // Kiểm tra nếu tapList không phải là một mảng hoặc rỗng
  if (!Array.isArray(tapList) || tapList.length === 0) {
    return <div>Không có tập nào để hiển thị</div>;
  }

  // Lấy số tập có từ tapList
  const totalEpisodes = tapList[0].tapco; // Giả sử tất cả các mục trong tapList đều có số tập giống nhau

  // Tạo mảng các số từ 1 đến totalEpisodes
  const episodes = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  return (
    <div>
      <div className={style.epi}>
        <h1>Danh Sách Tập</h1>
        <div className={style.tap}>
          {episodes.map((episode, i) => (
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
