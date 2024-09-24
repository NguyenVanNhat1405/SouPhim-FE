import React, { useState, useContext } from 'react';
import { FaShareAlt, FaFacebookF, FaTwitter, FaLinkedin, FaClipboard } from 'react-icons/fa';
import style from './Share.module.css';
import { Context } from '../../Context/Context';
const Share = () => {
  const [showOptions, setShowOptions] = useState(false);

  const { movieDb } = useContext(Context);
  
  const handleShareClick = () => {
    setShowOptions(!showOptions);
  };
  const shareLink = `http://localhost:3000/Movie${movieDb.id}`; // Link chia sẻ

  return (
    <div className={style.shareContainer}>
      <button onClick={handleShareClick} className={style.shareButton}>
        <FaShareAlt size={20} color="#fff" />
      </button>
      {showOptions && (
        <div className={style.shareOptions}>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} color="#4267B2" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} color="#1DA1F2" />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} color="#0077B5" />
          </a>
          <button onClick={() => navigator.clipboard.writeText(shareLink)}>
            <FaClipboard size={20} color="#000" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Share;
