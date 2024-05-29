import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import style from './VideoPlayer.module.css';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <div className={`${style.video} ${isFocused ? 'focused' : ''}`}>
      <div className={style.videoPlayerContainer}>
        <video ref={videoRef} className={style.videoPlayer} src={videoSrc} controls />
        <div className={style.controls}>
          <button onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={toggleFocus} className={style.focusToggle}>
            <FontAwesomeIcon
              icon={isFocused ? faSun : faMoon}
              size="2x"
              className={`${style.icon} ${isFocused ? style.sunicon : style.moonicon}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
