import React, { useState } from 'react';
import './Category.css'
const Category = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="toggle-container">
      <input type="checkbox" id="checkbox1" checked={isChecked} onChange={handleToggle} />
      <label htmlFor="checkbox1" className="toggle">
        <div className="bars1" id="bar1"></div>
        <div className="bars2" id="bar2"></div>
        <div className="bars3" id="bar3"></div>
      </label>
    </div>
  );
};

export default Category;
