import React, { useRef, useState } from 'react';
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
          <button onClick={toggleFocus}>
            {isFocused ? 'Exit Focus Mode' : 'Focus Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
