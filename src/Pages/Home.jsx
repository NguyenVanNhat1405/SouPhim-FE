import React from 'react'
import New from '../Components/New/New'
import style from "./CSS/Home.module.css"
import Popular from '../Components/Popular/Popular'
// import Banner from '../Components/Banner/Banner';
import Search from '../Components/Search/Search';
import WatchHistory from '../Components/History/History';
import CategoryList from '../Components/CateList/CateList';
 // Moved images declaration here
const Home = () => {
  return (
    <div className={style.home}>
      <Search/>
      {/* <Banner ></Banner> */}
     <div className={style.hot}>
      <New/>
      <Popular />
     </div>
     <CategoryList/>
     <WatchHistory/>
    </div>
  )
}

export default Home
