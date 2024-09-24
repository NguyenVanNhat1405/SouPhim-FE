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
        <div className='Navbar'>
        <Navbar isLoggedIn={isLoggedIn} userInfo={userInfo} onLogout={handleLogout} showLogin={showLogin} closeLogin={closeLogin} showForm={showForm} closeForm={closeForm} />
        {isLoginVisible && <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin} />}
        {isFormVisible && <Form onClose={closeForm} />}
        
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thể loại */}
          <Route path='/theloai/action' element={<Theloai theloai="Action" type="movie" til="Hành Động" />} />
          <Route path='/theloai/adventure' element={<Theloai theloai="Adventure" type="movie" til="Phiêu Lưu" />} />
          <Route path='/theloai/animation' element={<Theloai theloai="Animation" type="movie" til="Hoạt Hình" />} />
          <Route path='/theloai/comedy' element={<Theloai theloai="Comedy" type="movie" til="Hài Hước" />} />
          <Route path='/theloai/mystery' element={<Theloai theloai="Mystery" type="movie" til="Giật Gân" />} />
          <Route path='/theloai/drama' element={<Theloai theloai="Drama" type="movie" til="Kịch Tính" />} />
          <Route path='/theloai/horror' element={<Theloai theloai="Horror"type="movie" til="Kinh Dị" />} />
          <Route path='/theloai/romance' element={<Theloai theloai="Romance" type="movie" til="Ngôn Tình" />} />
          <Route path='/theloai/science' element={<Theloai theloai="Sci-Fi" type="movie" til="Khoa Học Viễn Tưởng" />} />
          <Route path='/theloai/family' element={<Theloai theloai="Family" type="movie" til="Gia Đình" />} />
          <Route path='/theloai/fantasy' element={<Theloai theloai="Fantasy" type="movie" til="Chuyển Thể" />} />
          {/* Quốc gia */}
          <Route path="/quocgia/south korea" element={<Quocgia quocgia="South Korea" til="Hàn Quốc"/>} />
          <Route path="/quocgia/china" element={<Quocgia quocgia="China"til="Trung Quốc" />} />
          <Route path="/quocgia/vietnam" element={<Quocgia quocgia="Vietnam" til="Việt Nam"/>} />
          <Route path="/quocgia/thailand" element={<Quocgia quocgia="Thailand"til="Thái Lan" />} />
          <Route path="/quocgia/japan" element={<Quocgia quocgia="Japan" til="Nhật Bản"/>} />
          <Route path="/quocgia/united states" element={<Quocgia quocgia="United States" til="Mỹ"/>} />
          <Route path="/quocgia/united kingdom" element={<Quocgia quocgia="United Kingdom" til="Anh Quốc" />} />
          <Route path="/quocgia/france" element={<Quocgia quocgia="France" til="Pháp"/>} />
          <Route path="/quocgia/khac" element={<Quocgia quocgia="Khác"til="Khác" />} />
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
