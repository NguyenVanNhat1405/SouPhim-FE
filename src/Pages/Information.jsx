import React from 'react'
import style from "./CSS/Information.module.css"
import AccountInfo from '../Components/AccountInfo/AccountInfo'
import WatchHistory from '../Components/History/History'
import Reviews from '../Components/ViewRating/ViewRating'
const Information = () => {
  return (
    <div className={style.information}>
      <AccountInfo/>
      <WatchHistory/>
      <Reviews />
    </div>
  )
}

export default Information
