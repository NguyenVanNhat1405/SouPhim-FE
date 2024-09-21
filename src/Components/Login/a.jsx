import React, { useState } from 'react';
import styles from './Login.module.css'; // Import CSS module
import gg from '../Assets/gg.png';
import facebook from '../Assets/facebook.png';

function Login({ onClose, onLoginSuccess }) {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' }); // State for form data
  const [registerError, setRegisterError] = useState(''); // State for registration error messages
  const [loginError, setLoginError] = useState(''); // State for login error messages

  const handleClose = () => {
    setIsActive(false);
    if (onClose) {
      onClose(); // Call onClose function from parent component to close the form
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Ensure formData contains all necessary information
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.msg); // Display backend error message if any
      } else {
        alert('Đăng ký thành công!');
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterError('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLoginSuccess(data.user); // Notify parent component of successful login
      } else {
        setLoginError(data.msg || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className={styles.login}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
        <button className={styles.closeBtn} onClick={handleClose}>x</button>
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Đăng ký tài khoản</h1>
            <div className={styles.socialIcons}>
              <a href="https://google.com/" className={styles.icon}><img src={gg} alt="Google" /></a>
              <a href="https://facebook.com/" className={styles.icon}><img src={facebook} alt="Facebook" /></a>
            </div>
            <span>hoặc sử dụng Email để đăng ký</span>
            <input type="text" name="username" placeholder="Tên" value={formData.username} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleInputChange} />
            <button className={styles.loginbtn} type="button" onClick={handleRegister}>Đăng ký</button>
            {registerError && <p className={styles.error}>{registerError}</p>}
          </form>
        </div>
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Đăng nhập</h1>
            <div className={styles.socialIcons}>
              <a href="https://google.com/" className={styles.icon}><img src={gg} alt="Google" /></a>
              <a href="https://facebook.com/" className={styles.icon}><img src={facebook} alt="Facebook" /></a>
            </div>
            <span>hoặc đăng nhập bằng Email và mật khẩu</span>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleInputChange} />
            <button className={styles.loginbtn} type="button" onClick={handleLogin}>Đăng nhập</button>
            {loginError && <p className={styles.error}>{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
