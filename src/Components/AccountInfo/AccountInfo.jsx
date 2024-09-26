import React, { useState, useEffect } from 'react';
import styles from './AccountInfo.module.css';

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Giả sử thông tin người dùng được lưu trữ trong localStorage
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      setUserInfo(user);
      setFormData({ name: user.name, email: user.email });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setUserInfo(formData);
        setMessage('Cập nhật thành công!');
        setIsEditing(false);
      } else {
        setMessage(data.message || 'Đã xảy ra lỗi.');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi.');
    }
  };

  return (
    <div className={styles.account}>
      <div className={styles.accountInfo}>
        <h1>Thông tin tài khoản</h1>
        {message && <p className={styles.message}>{message}</p>}
        {isEditing ? (
          <div className={styles.editForm}>
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>Lưu</button>
            <button onClick={() => setIsEditing(false)}>Hủy</button>
          </div>
        ) : (
          <div className={styles.info}>
            <p><strong>Tên:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <button onClick={handleEdit}>Chỉnh sửa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
