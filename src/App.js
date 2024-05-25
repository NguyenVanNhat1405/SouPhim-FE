import './App.css';
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
          <Route path="/korea" element={<Category banner={korea_banner} category="korea" />} />
          <Route path="/china" element={<Category banner={korea_banner} category="china" />} />
          <Route path="/vietnam" element={<Category banner={korea_banner} category="vietnam" />} />
          <Route path="/thai" element={<Category banner={korea_banner} category="thai" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
