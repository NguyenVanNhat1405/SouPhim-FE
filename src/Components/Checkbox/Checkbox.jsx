import React, { useState } from 'react';
import style from './Checkbox.module.css'; // Import the CSS module

const CheckboxWithIcons = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={style.checkboxContainer}>
      <input
        type="checkbox"
        id="react-option"
        className={`${style.hidden} ${style.peer}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor="react-option"
        className={`${style.checkboxLabel}`}
      >
        <svg
          className={`${style.checkboxIcon} ${isChecked ? style.checked : style.unchecked}`}
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="svg-stroke-primary"
            d="M82.1,61.2a31.9,31.9,0,0,1-12.4,2.4A33.3,33.3,0,0,1,36.4,30.3a31.9,31.9,0,0,1,2.4-12.4A33.3,33.3,0,1,0,82.1,61.2Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          ></path>
        </svg>
        <svg
          className={`${style.checkboxIcon} ${isChecked ? style.unchecked : style.checked}`}
          height="100"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="svg-stroke-primary"
            d="M50,18v3.6m0,56.8V82M82,50H78.4M21.6,50H18M72.6,72.6l-2.5-2.5M29.9,29.9l-2.5-2.5m45.2,0-2.5,2.5M29.9,70.1l-2.5,2.5M64.2,50A14.2,14.2,0,1,1,50,35.8,14.3,14.3,0,0,1,64.2,50Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          ></path>
        </svg>
      </label>
    </div>
  );
};

export default CheckboxWithIcons;
