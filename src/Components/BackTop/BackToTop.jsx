import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import style from './BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi cuộn trang để hiển thị hoặc ẩn nút
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Xóa event listener khi component bị hủy
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Hàm để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  return (
    <div>
      {isVisible && (
        <div className={style.backToTop} onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default BackToTop;
