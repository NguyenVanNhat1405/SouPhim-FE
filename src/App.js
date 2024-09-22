import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import Quocgia from './Pages/Country';
import Footer from './Components/Footer/Footer';
import Theloai from './Pages/Category';
import Movie from './Pages/Movie';
import Form from './Components/Form/Form';
import AccountInfo from './Components/AccountInfo/AccountInfo';
import FavoritesList from './Components/Favorite/Favorite';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App({ user }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const showLogin = () => {
    setIsLoginVisible(true);
  };
  
  const closeLogin = () => {
    setIsLoginVisible(false);
  };
  
  const showForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem('userInfo');

    if (token && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar isLoggedIn={isLoggedIn} userInfo={userInfo} onLogout={handleLogout} showLogin={showLogin} closeLogin={closeLogin} showForm={showForm} closeForm={closeForm} />
        {isLoginVisible && <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin} />}
        {isFormVisible && <Form onClose={closeForm} />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thể loại */}
          <Route path='/theloai/action' element={<Theloai theloai="Action" til="Hành Động" />} />
          <Route path='/theloai/adventure' element={<Theloai theloai="Adventure" til="Phiêu Lưu" />} />
          <Route path='/theloai/animation' element={<Theloai theloai="Animation" til="Hoạt Hình" />} />
          <Route path='/theloai/comedy' element={<Theloai theloai="Comedy" til="Hài Hước" />} />
          <Route path='/theloai/crime' element={<Theloai theloai="Crime" til="Hình Sự" />} />
          <Route path='/theloai/drama' element={<Theloai theloai="Drama" til="Kịch Tính" />} />
          <Route path='/theloai/horror' element={<Theloai theloai="Horror" til="Kinh Dị" />} />
          <Route path='/theloai/romance' element={<Theloai theloai="Romance" til="Ngôn Tình" />} />
          <Route path='/theloai/science' element={<Theloai theloai="Science Fiction" til="Khoa Học Viễn Tưởng" />} />
          <Route path='/theloai/thriller' element={<Theloai theloai="Thriller" til="Hồi Hộp" />} />
          {/* Quốc gia */}
          <Route path="/quocgia/korea" element={<Quocgia quocgia="South Korea" />} />
          <Route path="/quocgia/china" element={<Quocgia quocgia="China" />} />
          <Route path="/quocgia/viet" element={<Quocgia quocgia="Vietnam" />} />
          <Route path="/quocgia/thai" element={<Quocgia quocgia="Thailand" />} />
          <Route path="/quocgia/japan" element={<Quocgia quocgia="Japan" />} />
          <Route path="/quocgia/usa" element={<Quocgia quocgia="United States of America" />} />
          <Route path="/quocgia/uk" element={<Quocgia quocgia="United Kingdom" />} />
          <Route path="/quocgia/france" element={<Quocgia quocgia="France" />} />
          <Route path="/quocgia/khac" element={<Quocgia quocgia="Khác" />} />
          {/* Các trang khác */}
          <Route path="/favoritesList" element={<FavoritesList user={user} />} />
          <Route path="/accountInfor" element={<AccountInfo />} />
          <Route path='/Movie/:movieId' element={<Movie/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
