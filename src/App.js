import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import Category from './Pages/Category';
import korea_banner from './Components/Assets/banner_in.jpg';
import Footer from './Components/Footer/Footer';
import Banner from './Components/Banner/Banner';
import image1 from './Components/Assets/banner/1.png';
import image2 from './Components/Assets/banner/2.png';
import image3 from './Components/Assets/banner/3.png';
import Theloai from './Pages/Theloai';
import Review from './Pages/Review';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const showLogin = () => {
    setIsLoginVisible(true);
  };

  const closeLogin = () => {
    setIsLoginVisible(false);
  };

  const images = [image1, image2, image3]; // Moved images declaration here

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar showLogin={showLogin} closeLogin={closeLogin} />
        {isLoginVisible && <Login onClose={closeLogin} />}
        <Banner images={images}></Banner> {/* Passing images to Banner component */}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path='/theloai/action' element={<Theloai theloai="Hành Động"/>}/>
          <Route path='/theloai/drama' element={<Theloai theloai="Kịch Tính"/>}/>
          <Route path='/theloai/horror' element={<Theloai theloai="Kinh Dị"/>}/>
          <Route path='/theloai/romance' element={<Theloai theloai="Lãng Mạng"/>}/>
          <Route path='/theloai/scrience' element={<Theloai theloai="Viễn Tưởng"/>}/>
          <Route path='/theloai/healing' element={<Theloai theloai="Chữa Lành"/>}/>
          <Route path='/theloai/boylove' element={<Theloai theloai="Đam Mỹ"/>}/>
          <Route path="/quocgia/korea" element={<Category banner={korea_banner} quocgia="Hàn Quốc" />} />
          <Route path="/quocgia/china" element={<Category banner={korea_banner} quocgia="Trung Quốc" />} />
          <Route path="/quocgia/viet" element={<Category banner={korea_banner} quocgia="Việt Nam" />} />
          <Route path="/quocgia/thai" element={<Category banner={korea_banner} quocgia="Thái Lan" />} />
          <Route path="/chieurap" element={<Home />} />
          <Route path="/phimbo" element={<Home />} />
          <Route path='/review/:imgId' element={<Review/>}>
  
          </Route>
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
