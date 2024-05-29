import React, { useState } from 'react';
import sytle from './Form.module.css'; // Sử dụng styles từ CSS module

const UserInfoForm = ({ onClose }) => { // Thêm {onClose} vào props
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data Submitted: ', formData);
      // Here you can add the code to send data to the server
    }
  };
  const handleClose = () => {
    setIsActive(false);
    if (onClose) {
      onClose(); // Gọi hàm onClose được truyền từ component cha để đóng form
    }
  };
  return (
    <div className={sytle.former}>
      <div className={`${sytle.container} ${isActive ? sytle.active : ''}`} id="container"></div>
      <button className={sytle.closeBtn} onClick={handleClose}>x</button> {/* Thêm sự kiện onClick */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={sytle.error}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={sytle.error}>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className={sytle.error}>{errors.phone}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInfoForm;
