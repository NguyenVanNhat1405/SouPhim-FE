import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import Category from './Pages/Category';
import korea_banner from './Components/Assets/banner_in.jpg';

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const showLogin = () => {
    setIsLoginVisible(true);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar showLogin={showLogin} closeLogin={closeLogin} />
        {isLoginVisible && <Login onClose={closeLogin} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quocgia/korea" element={<Category banner={korea_banner} quocgia="korea" />} />
          <Route path="/quocgia/china" element={<Category banner={korea_banner} quocgia="china" />} />
          <Route path="/quocgia/viet" element={<Category banner={korea_banner} quocgia="viet" />} />
          <Route path="/quocgia/thai" element={<Category banner={korea_banner} quocgia="thai" />} />
          <Route path="/chieurap" element={<Home />} />
          <Route path="/phimbo" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
