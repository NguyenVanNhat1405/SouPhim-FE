import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import Category from './Pages/Category';
import korea_banner from './Components/Assets/banner_in.jpg';
import Footer from './Components/Footer/Footer';
import Theloai from './Pages/Theloai';
import Review from './Pages/Review';
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

  // Hàm để xử lý đăng xuất
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
        <Navbar isLoggedIn={isLoggedIn} userInfo={userInfo} onLogout={handleLogout} showLogin={showLogin} closeLogin={closeLogin} showForm={showForm} closeForm={closeForm}/>
        {isLoginVisible && <Login onLoginSuccess={handleLoginSuccess} onClose={closeLogin} />}
        {isFormVisible && <Form onClose={closeForm} />}
        
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path='/theloai/action' element={<Theloai theloai="Hành Động"/>}/>
          <Route path='/theloai/drama' element={<Theloai theloai="Kịch Tính"/>}/>
          <Route path='/theloai/horror' element={<Theloai theloai="Kinh Dị"/>}/>
          <Route path='/theloai/romance' element={<Theloai theloai="Ngôn Tình"/>}/>
          <Route path='/theloai/scrience' element={<Theloai theloai="Viễn Tưởng"/>}/>
          <Route path='/theloai/healing' element={<Theloai theloai="Chữa Lành"/>}/>
          <Route path='/theloai/boylove' element={<Theloai theloai="Đam Mỹ"/>}/>
          <Route path="/quocgia/korea" element={<Category banner={korea_banner} quocgia="Hàn Quốc" />} />
          <Route path="/quocgia/china" element={<Category banner={korea_banner} quocgia="Trung Quốc" />} />
          <Route path="/quocgia/viet" element={<Category banner={korea_banner} quocgia="Việt Nam" />} />
          <Route path="/quocgia/thai" element={<Category banner={korea_banner} quocgia="Thái Lan" />} />
          <Route path="/favoritesList" element={<FavoritesList user={user} />} />
          <Route path="/accountInfor" element={<AccountInfo />} />
          <Route path='/review/:imgId' element={<Review/>}>
          </Route>
          {/* <Route path='/thongtin' element={<Form/>}></Route> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
