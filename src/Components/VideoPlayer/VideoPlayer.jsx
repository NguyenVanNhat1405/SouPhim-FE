import React, { useRef, useState } from 'react';
import style from './VideoPlayer.module.css';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className={`${style.video} `}>
      <div className={style.videoPlayerContainer}>
        <video ref={videoRef} className={style.videoPlayer} src={videoSrc} controls />
        <div className={style.controls}>
          <button onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
