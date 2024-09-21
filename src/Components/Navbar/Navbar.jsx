import React, { useState, useEffect } from 'react';
import style from './Navbar.module.css'; // Import CSS module
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
// import Search from '../Search/Search';
// import Logo from '../Assets/logo.png';
import defaultAvatar from '../Assets/defaultAvatar.png'; // Default avatar

function Navbar({ showLogin, closeLogin, showForm, closeForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State kiểm tra đăng nhập
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng

  const TOKEN_KEY = 'token'; // Constant lưu trữ khóa token
  const USER_INFO = 'userInfo'; // Constant lưu trữ thông tin người dùng

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
    localStorage.removeItem(TOKEN_KEY); // Xóa token khi đăng xuất
    localStorage.removeItem(USER_INFO); // Xóa thông tin người dùng
    setIsLoggedIn(false); // Cập nhật trạng thái chưa đăng nhập
    setUserInfo(null); // Xóa thông tin người dùng
  };

  return (
    <div className={style.navbar}>
      <nav>
        {/* <div className={`${style.logo} logo`}>
          <img src={Logo} alt="logo" />
        </div> */}
        <div className={`${style.hamburger} hamburger`} onClick={toggleMenu}>
          {/* Add hamburger icon here if needed */}
        </div>
        {/* <Search /> */}

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
                  <li><Link to="/theloai/action">Hành động</Link></li>
                  <li><Link to="/theloai/healing">Chữa Lành</Link></li>
                  <li><Link to="/theloai/drama">Kịch tính</Link></li>
                  <li><Link to="/theloai/scrience">Viễn tưởng</Link></li>
                  <li><Link to="/theloai/romance">Ngôn tình</Link></li>
                  <li><Link to="/theloai/boylove">Đam mỹ</Link></li>
                  <li><Link to="/theloai/horro">Kinh dị</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setShowCountryDropdown(true)}
            onMouseLeave={() => setShowCountryDropdown(false)}
          >
            <Link to="/">Quốc gia</Link>
            {showCountryDropdown && (
              <div className={style.dropdown}>
                <ul>
                  <li><Link to="/quocgia/viet">Việt Nam</Link></li>
                  <li><Link to="/quocgia/korea">Hàn Quốc</Link></li>
                  <li><Link to="/quocgia/china">Trung Quốc</Link></li>
                  <li><Link to="/quocgia/thai">Thái Lan</Link></li>
                  <li><Link to="/quocgia/other">Khác</Link></li>
                </ul>
              </div>
            )}
          </li>
          {/* <li><Link to="/chieurap">Phim chiếu rạp</Link></li>
          <li><Link to="/phimbo">Phim bộ</Link></li> */}
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
                        <li><Link to="/favoritesList" >Yêu Thích</Link></li>
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
