import React, { useState } from 'react';
import styles from './Login.module.css';
import gg from '../Assets/gg.png';
import facebook from '../Assets/facebook.png';
import Cookies from 'js-cookie'; 
function Login({ onClose }) {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');

    const handleClose = () => {
        setIsActive(false);
        if (onClose) {
            onClose();
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.msg);
            } else {
                setNotification('Đăng ký thành công!');
                setError('');
                setTimeout(() => {
                    setNotification('');
                    setIsActive(false);
                    setFormData({ username: '', email: '', password: '' });
                }, 2000);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: loginData.email, password: loginData.password }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setNotification('Đăng nhập thành công!');
                setError('');

                // Lưu thông tin vào localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Lưu thông tin người dùng
                localStorage.setItem('isAdmin', JSON.stringify(data.user.isAdmin));
                Cookies.set('x-auth-token', data.token, { expires: 1 })
                Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
                // Chuyển đến trang phù hợp sau khi đăng nhập thành công
                if (data.user.isAdmin) {
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3001/admin'; // Chuyển đến trang admin
                        handleClose();
                    }, 2000);
                } else {
                    setTimeout(() => {
                        handleClose();
                        window.location.reload(); // Làm mới trang để cập nhật thông tin người dùng
                    }, 2000);
                }
            } else {
                setError(data.msg || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className={styles.login}>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
                <button className={styles.closeBtn} onClick={handleClose}>x</button>

                {notification && <div className={`${styles.notification} ${styles.success}`}>{notification}</div>}

                <div className={`${styles.formContainer} ${styles.signUp}`}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1>Tạo tài khoản nào!!</h1>
                        <div className={styles.socialIcons}>
                            <a href="https://google.com/" className={styles.icon}><img src={gg} alt="Google" /></a>
                            <a href="https://facebook.com/" className={styles.icon}><img src={facebook} alt="Facebook" /></a>
                        </div>
                        <span>hoặc sử dụng Email để đăng ký</span>
                        <input type="text" name="username" placeholder="Tên" value={formData.username} onChange={handleInputChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                        <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleInputChange} required />
                        <button className={styles.loginbtn} type="button" onClick={handleRegister}>Đăng ký</button>
                        {error && <p className={styles.error}>{error}</p>}
                    </form>
                </div>

                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1>Đăng nhập nào!!</h1>
                        <div className={styles.socialIcons}>
                            <a href="https://google.com/" className={styles.icon}><img src={gg} alt="Google" /></a>
                            <a href="https://facebook.com/" className={styles.icon}><img src={facebook} alt="Facebook" /></a>
                        </div>
                        <span>hoặc Email và mật khẩu đã tạo</span>
                        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginInputChange} required />
                        <input type="password" name="password" placeholder="Mật khẩu" value={loginData.password} onChange={handleLoginInputChange} required />
                        <a href="/">Bạn quên mật khẩu?</a>
                        <button className={styles.loginbtn} type="button" onClick={handleLogin}>Đăng Nhập</button>
                        {error && <p className={styles.error}>{error}</p>}
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
