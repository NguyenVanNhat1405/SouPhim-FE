import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import { useParams } from 'react-router-dom';
import Display from '../Components/Display/Display';
import './CSS/Review.css';
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer';
const Review = () => {
  const { all_img } = useContext(Context);
  const { imgId } = useParams();
  const video = {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', // Thay thế bằng URL video của bạn
    title: 'Big Buck Bunny',
    description: 'Big Buck Bunny là một bộ phim hoạt hình ngắn được sản xuất bởi Blender Foundation.'
  };
  // Kiểm tra nếu all_img không tồn tại hoặc không phải là một mảng
  if (!Array.isArray(all_img) || all_img.length === 0) {
    return <div className="background">Dữ liệu không khả dụng</div>;
  }

  // Tìm kiếm ảnh với imgId
  const img = all_img.find((e) => e.id === Number(imgId));

  // Kiểm tra nếu không tìm thấy ảnh
  if (!img) {
    return <div className="background">Không tìm thấy ảnh</div>;
  }

  return (
    <div className='background'>
      <Display img={img} />
      <VideoPlayer videoSrc={video.src} title={video.title} description={video.description} />
    </div>
  );
};

export default Review;
