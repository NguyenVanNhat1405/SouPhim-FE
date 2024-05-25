import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import gg from '../Assets/gg.png';
import facebook from '../Assets/facebook.png';

function Login({ onClose }) {
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => {
    setIsActive(false);
    onClose(); // Gọi hàm onClose được truyền từ component cha để đóng form
  };

  return (
    <div className='login'>
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <button className='close-btn' onClick={handleClose}>x</button>
        <div className="form-container sign-up">
          <form>
            <h1>Tạo tài khoản nào!!</h1>
            <div className="social-icons">
              <a href="google.com/" className="icon"><i className="fa-brands fa-google-plus-g"><img src={gg} alt="" /></i></a>
              <a href="facebook.com/" className="icon"><i className="fa-brands fa-facebook-f"><img src={facebook} alt="" /></i></a>
            </div>
            <span>hoặc sử dụng Email để đăng ký</span>
            <input type="text" placeholder="Tên" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <button type="button">Đăng ký</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Đăng nhập nào!!</h1>
            <div className="social-icons">
              <a href="google.com/" className="icon"><i className="fa-brands fa-google-plus-g"><img src={gg} alt="" /></i></a>
              <a href="facebook.com/" className="icon"><i className="fa-brands fa-facebook-f"><img src={facebook} alt="" /></i></a>
            </div>
            <span>hoặc Email và mật khẩu đã tạo</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <a href="">Ban quên mật khẩu?</a>
            <Link to="/"><button type="button">Đăng Nhập</button></Link>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Chào mừng bạn quay lại Souphim</h1>
              <p>Bạn đã có tài khoản rồi</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Đi thoai</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Chào bạn đã đến với Souphim</h1>
              <p>Đăng ký nếu bạn chưa có tài khoản</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Tạo ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
