import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
import Search from '../Search/Search';
import Category from '../Category/Category';

function Navbar({ showLogin, closeLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
          <Category />
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Search /></li>
          <li><Link to="/">Home</Link></li>
          <li><li
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link to="/quocgia">Thể loại</Link>
            {showDropdown && (
              // Đây là nơi để hiển thị bảng chọn
              <div>
                {showDropdown && (
                  <div className="dropdown">
                    <ul>
                      <li><Link to="/theloai/action">Hành động</Link></li>
                      <li><Link to="/theloai/comedy">Hài kịch</Link></li>
                      <li><Link to="/theloai/drama">Kịch tính</Link></li>
                      <li><Link to="/theloai/drama">Viễn tưởng</Link></li>
                      <li><Link to="/theloai/drama">Ngôn tình</Link></li>
                      <li><Link to="/theloai/drama">Đam mỹ</Link></li>
                      <li><Link to="/theloai/drama">Kinh dị</Link></li>
                    </ul>
                  </div>
                )}

              </div>
            )}
          </li>
          </li>
          <li><Link to="/quocgia">Quốc gia</Link> </li>
          <li><Link to="/chieurap">Phim chiếu rạp</Link></li>
          <li><Link to="/phimbo">Phim bộ</Link></li>
          <li>
            <a onClick={showLogin} style={{ cursor: 'pointer' }}>
              <img src={login} alt="login" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
