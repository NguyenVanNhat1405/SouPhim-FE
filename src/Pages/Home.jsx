import React from 'react'
import New from '../Components/New/New'
import style from "./CSS/Home.module.css"
import Carousel from '../Components/Carousel/Carousel'

const Home = () => {
  return (
    <div className={style.home}>
      <New/>
      <Carousel />
    </div>
  )
}

export default Home
