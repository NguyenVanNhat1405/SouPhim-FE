import React from 'react';
import './Navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
import Search from '../Search/Search';
 

function Navbar({ showLogin, closeLogin }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = React.useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar'>
      <nav>
        <div className="logo">
          <span>Souphim</span>
        </div>
        <div className='hamburger' onClick={toggleMenu}>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Search /></li>
          <li><Link to="/">Home</Link></li>
          <li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/">Thể loại</Link>
            {showDropdown && (
              <div className="dropdown">
                <ul>
                  <li><Link to="/theloai/action">Hành động</Link></li>
                  <li><Link to="/theloai/comedy">Hài kịch</Link></li>
                  <li><Link to="/theloai/drama">Kịch tính</Link></li>
                  <li><Link to="/theloai/scrience">Viễn tưởng</Link></li>
                  <li><Link to="/theloai/romantic">Ngôn tình</Link></li>
                  <li><Link to="/theloai/boylove">Đam mỹ</Link></li>
                  <li><Link to="/theloai/honor">Kinh dị</Link></li>
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
          <li onClick={showLogin} style={{ cursor: 'pointer' }}>
            <div>
              <img src={login} alt="login" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
