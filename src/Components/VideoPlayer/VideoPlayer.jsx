import React from 'react';
import style from './VideoPlayer.module.css';

const VideoPlayer = ({ videoSrc }) => {
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]; // Lấy phần video ID từ URL YouTube
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`; // URL nhúng cho YouTube video
  };

  return (
    <div className={style.videoPlayerContainer}>
      <iframe
        className={style.videoPlayer}
        src={getYoutubeEmbedUrl(videoSrc)} // Chèn URL nhúng YouTube
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
      
    </div>
  );
};

export default VideoPlayer;
