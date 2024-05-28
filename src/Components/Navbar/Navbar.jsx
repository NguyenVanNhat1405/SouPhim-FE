import React from 'react';
import './Navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
import Search from '../Search/Search';
import Logo from '../Assets/logo.png';

function Navbar({ showLogin, closeLogin, handleShowForm, handleCloseForm}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = React.useState(false);
  const [showOption, setShowOption] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar'>
      <nav>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className='hamburger' onClick={toggleMenu}>
          {/* Add hamburger icon here if needed */}
        </div>
        <Search></Search>
        
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/">Thể Loại</Link>
            {showDropdown && (
              <div className="dropdown">
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
              <div className="dropdown">
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
          <li><Link to="/chieurap">Phim chiếu rạp</Link></li>
          <li><Link to="/phimbo">Phim bộ</Link></li>
          <li
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
          >
            <div className="login-wrapper">
              <img src={login} alt="login" />
              {showOption && (
                <div className="dropdown">
                  <ul>
                    <li onClick={showLogin} style={{ cursor: 'pointer' }}showLogin={showLogin} closeLogin={closeLogin}>Đăng Nhập</li>
                    <li><Link to="/thongtin">Tài Khoản</Link></li>

                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
        
        
      </nav>
    </div>
  );
}

export default Navbar;
