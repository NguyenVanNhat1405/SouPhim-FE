import React, { useState, useEffect } from 'react';
import style from './Navbar.module.css'; // Import CSS module
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
import defaultAvatar from '../Assets/defaultAvatar.png'; // Default avatar

function Navbar({ showLogin, closeLogin, showForm, closeForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const TOKEN_KEY = 'token';
  const USER_INFO = 'userInfo';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');

    if (token && storedUserInfo) {
      try {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error('Error parsing user info from localStorage:', error);
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_INFO);
    setIsLoggedIn(false);
    setUserInfo(null);
    window.location.reload()
  };

  return (
    <div className={style.navbar}>
      <nav>
        <div className={`${style.hamburger} hamburger`} onClick={toggleMenu}></div>

        <ul className={`${style.navLinks} ${isOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/">Thể Loại</Link>
            {showDropdown && (
              <div className={style.dropdown}>
                <ul>
                  <li><Link to="/theloai/action">Hành Động</Link></li>
                  <li><Link to="/theloai/adventure">Phiêu Lưu</Link></li>
                  <li><Link to="/theloai/animation">Hoạt Hình</Link></li>
                  <li><Link to="/theloai/comedy">Hài Hước</Link></li>
                  <li><Link to="/theloai/mystery">Giật Gân</Link></li>
                  <li><Link to="/theloai/drama">Kịch Tính</Link></li>
                  <li><Link to="/theloai/horror">Kinh Dị</Link></li>
                  <li><Link to="/theloai/romance">Ngôn Tình</Link></li>
                  <li><Link to="/theloai/science">Viễn Tưởng</Link></li>
                  <li><Link to="/theloai/family">Gia Đình</Link></li>
                  <li><Link to="/theloai/fantasy">Chuyển Thể</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setShowCountryDropdown(true)}
            onMouseLeave={() => setShowCountryDropdown(false)}
          >
            <Link to="/">Quốc Gia</Link>
            {showCountryDropdown && (
              <div className={style.dropdown}>
                <ul>
                  <li><Link to="/quocgia/vietnam">Việt Nam</Link></li>
                  <li><Link to="/quocgia/south korea">Hàn Quốc</Link></li>
                  <li><Link to="/quocgia/china">Trung Quốc</Link></li>
                  <li><Link to="/quocgia/thailand">Thái Lan</Link></li>
                  <li><Link to="/quocgia/japan">Nhật Bản</Link></li>
                  <li><Link to="/quocgia/united states">Hoa Kỳ</Link></li>
                  <li><Link to="/quocgia/united kingdom">Anh Quốc</Link></li>
                  <li><Link to="/quocgia/france">Pháp</Link></li>
                  <li><Link to="/quocgia/khac">Khác</Link></li>
                </ul>
              </div>
            )}
          </li>
          <div>
            <li
              onMouseEnter={() => setShowOption(true)}
              onMouseLeave={() => setShowOption(false)}
            >
              <div className={style.loginWrapper}>
                {isLoggedIn ? (
                  <>
                    <img 
                      src={userInfo?.avatar || defaultAvatar} 
                      alt="avatar" 
                      className={style.avatar} 
                    />
                    {showOption && (
                      <div className={style.dropdown}>
                        <ul>
                          <li><Link to="/accountInfor">Tài Khoản</Link></li>
                          <li><Link to="/favoritesList">Yêu Thích</Link></li>
                          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng Xuất</li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <img src={login} alt="login" />
                    {showOption && (
                      <div className={style.dropdown}>
                        <ul>
                          <li onClick={showLogin} style={{ cursor: 'pointer' }}>Đăng Nhập</li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
