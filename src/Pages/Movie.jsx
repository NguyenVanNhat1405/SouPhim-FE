import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import { useParams } from 'react-router-dom';
import Display from '../Components/Display/Display';
import style from './CSS/Movie.module.css';
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer';
import Comment from '../Components/Comment/Comment';

const Movie = () => {
  const { movieId } = useParams(); // Lấy movieId từ URL
  const { movieDb } = useContext(Context); // Lấy movieDb từ Context

  if (!Array.isArray(movieDb) || movieDb.length === 0) {
    return <div className="background">Dữ liệu không khả dụng</div>;
  }

  const movie = movieDb.find((e) => e.id === movieId); // Giả sử id trong movieDb là string
  
  if (!movie) {
    return <div className={style.background}>Không tìm thấy phim</div>;
  }

  // Nếu không có trailer, hiển thị một video mặc định
  const videoSrc = movie.trailer || 'https://www.w3schools.com/html/mov_bbb.mp4';
  const videoTitle = movie.title || 'Movie Trailer';
  const videoDescription = movie.overview || 'No description available';
  console.log(videoSrc)

  return (
    <div className={style.background}>
      <Display img={movie} />
      <div className={style.watch}>
        <VideoPlayer videoSrc={videoSrc} title={videoTitle} description={videoDescription} />
      </div>
      <Comment movieId={movieId} userId="exampleUserId" />
    </div>
  );
};

export default Movie;
