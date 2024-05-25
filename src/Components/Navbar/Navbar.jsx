import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file
import { Link } from 'react-router-dom';
import login from '../Assets/dropdown.png';
import Login from '../Login/Login';
import Search from '../Search/Search';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  return (
    <div className='navbar'>
      <nav>
        <div className="logo">
          <span>Souphim</span>
        </div>
        <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Search /></li>
          <li><Link to="/"><a>Home</a></Link></li>
          <li><Link to="/theloai"><a>Thể loại</a></Link></li>
          <li><Link to="/quocgia"><a>Quốc gia</a></Link></li>
          <li><Link to="/chieurap"><a>Phim chiếu rạp</a></Link></li>
          <li><Link to="/phimbo"><a>Phim bộ</a></Link></li>
          <li>
            <a onClick={toggleLogin} style={{ cursor: 'pointer' }}>
              <img src={login} alt="login" />
            </a>
          </li>
        </ul>
      </nav>
      {isLoginVisible && <Login onClose={closeLogin} />}
    </div>
  );
}

export default Navbar;
