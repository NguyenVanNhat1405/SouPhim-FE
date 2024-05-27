import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc, title, description }) => {
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
    <div className={`video ${isFocused ? 'focused' : ''}`}>
      <div className="video-player-container">
        <video ref={videoRef} className="video-player" src={videoSrc} controls />
        <div className="controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={toggleFocus} className="focus-toggle">
            <FontAwesomeIcon
              icon={isFocused ? faSun : faMoon}
              size="2x"
              className={`icon ${isFocused ? 'sun-icon' : 'moon-icon'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
