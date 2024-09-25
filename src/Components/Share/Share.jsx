import React, { useState, useContext, useRef, useEffect } from 'react';
import { FaShareAlt, FaFacebookF, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';
import style from './Share.module.css';
import { Context } from '../../Context/Context';

const Share = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // Trạng thái sao chép
  const { movieDb } = useContext(Context);
  const optionsRef = useRef(null);

  // Xử lý khi nhấn vào nút share
  const handleShareClick = () => {
    setShowOptions(!showOptions);
  };

  // Hàm để sao chép link
  const shareLink = `http://localhost:3000/Movie/${movieDb}`; // Link chia sẻ
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hiển thị thông báo trong 2 giây
    });
  };

  // Hàm để kiểm tra click bên ngoài share options và tự động tắt
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={style.shareContainer}>
      <button onClick={handleShareClick} className={style.shareButton}>
        <FaShareAlt size={20} color="#fff" />
      </button>
      {showOptions && (
        <div ref={optionsRef} className={style.shareOptions}>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} color="#4267B2" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} color="#1DA1F2" />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} color="#0077B5" />
          </a>
          <button onClick={handleCopyLink} className={style.copyButton}>
            <FaLink size={20} color="white" />
          </button>
        </div>
      )}
      {isCopied && <span className={style.copiedMessage}>Link đã sao chép!</span>} {/* Thông báo đã sao chép */}
    </div>
  );
};

export default Share;
