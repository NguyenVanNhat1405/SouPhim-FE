import React, { useState } from 'react';
import styles from './Login.module.css'; // Import CSS module
import { Link } from 'react-router-dom';
import gg from '../Assets/gg.png';
import facebook from '../Assets/facebook.png';

function Login({ onClose }) {
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => {
    setIsActive(false);
    if (onClose) {
      onClose(); // Gọi hàm onClose được truyền từ component cha để đóng form
    }
  };

  return (
    <div className={styles.login}> {/* Sử dụng className từ CSS module */}
      <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
        <button className={styles.closeBtn} onClick={handleClose}>x</button>
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form>
            <h1>Tạo tài khoản nào!!</h1>
            <div className={styles.socialIcons}>
              <a href="https://google.com/" className={styles.icon}><i className="fa-brands fa-google-plus-g"><img src={gg} alt="" /></i></a>
              <a href="https://facebook.com/" className={styles.icon}><i className="fa-brands fa-facebook-f"><img src={facebook} alt="" /></i></a>
            </div>
            <span>hoặc sử dụng Email để đăng ký</span>
            <input type="text" placeholder="Tên" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <button type="button">Đăng ký</button>
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form>
            <h1>Đăng nhập nào!!</h1>
            <div className={styles.socialIcons}>
              <a href="https://google.com/" className={styles.icon}><i className="fa-brands fa-google-plus-g"><img src={gg} alt="" /></i></a>
              <a href="https://facebook.com/" className={styles.icon}><i className="fa-brands fa-facebook-f"><img src={facebook} alt="" /></i></a>
            </div>
            <span>hoặc Email và mật khẩu đã tạo</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <a href="/">Ban quên mật khẩu?</a>
            <Link to="/"><button type="button">Đăng Nhập</button></Link>
          </form>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>Chào mừng bạn quay lại Souphim</h1>
              <p>Bạn đã có tài khoản rồi</p>
              <button className={styles.hidden} onClick={() => setIsActive(false)}>Đi thoai</button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>Chào bạn đã đến với Souphim</h1>
              <p>Đăng ký nếu bạn chưa có tài khoản</p>
              <button className={styles.hidden} onClick={() => setIsActive(true)}>Tạo ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
