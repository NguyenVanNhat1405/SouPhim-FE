import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import { useParams } from 'react-router-dom';
import Display from '../Components/Display/Display';
import style from './CSS/Review.module.css';
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer';
// import Tap from '../Components/Favorite/Favorite';
import Comment from '../Components/Comment/Comment';

const Review = ({ movieId, userId }) => {
  const { all_img } = useContext(Context);
  const { imgId } = useParams();

  // const {epi} = props;

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
  
  // const totalEpisodes = img.tapco;

  // Tạo mảng các số từ 1 đến totalEpisodes
  // const tapList = Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  // Kiểm tra nếu không tìm thấy ảnh
  if (!img) {
    return <div className={style.background}>Không tìm thấy ảnh</div>;
  }

  return (
    <div className={style.background}>
      <Display img={img} />

      <div className={style.watch}>
        <VideoPlayer videoSrc={video.src} title={video.title} description={video.description} />
        {/* <Tap tapList={tapList}></Tap> */}
      </div>
      <Comment movieId={movieId} userId={userId} />
    </div>
  );
};

export default Review;
