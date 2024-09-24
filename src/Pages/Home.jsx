import React from 'react'
import New from '../Components/New/New'
import style from "./CSS/Home.module.css"
import Popular from '../Components/Popular/Popular'
import Banner from '../Components/Banner/Banner';
import image1 from '../Components/Assets/banner/1.png';
import image2 from '../Components/Assets/banner/2.png';
import image3 from '../Components/Assets/banner/3.png';
import Search from '../Components/Search/Search';
const images = [image1, image2, image3]; // Moved images declaration here
const Home = () => {
  return (
    <div className={style.home}>
      <Search/>
      <Banner images={images}></Banner> {/* Passing images to Banner component */}
     <div className={style.hot}>
      <New/>
      <Popular />
     </div>
    </div>
  )
}

export default Home
