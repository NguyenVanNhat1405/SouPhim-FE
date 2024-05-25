import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
// import Loader from './Components/Loader/Loader';
import Category from './Pages/Category';
import korea_banner from './Components/Assets/banner_in.jpg';
// import vietnam_banner from './Components/Assets/banner_in.jpg';
// import china_banner from './Components/Assets/banner_in.jpg';
// import thai_banner from './Components/Assets/banner_in.jpg';

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
        <Navbar showLogin={showLogin} />
        {isLoginVisible && <Login onClose={closeLogin} />}
          <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/korea"
            element={<Category banner={korea_banner} category="korea" />}
          />
          <Route
            path="/china"
            // element={<Category banner={china_banner} category="china" />}
          />
          <Route
            path="/vietnam"
            // element={<Category banner={vietnam_banner} category="vietnam" />}
          />
          <Route
            path="/thai"
            // element={<Category banner={thai_banner} category="thai" />}
          />
          
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
