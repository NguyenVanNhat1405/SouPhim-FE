import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/video/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image}/></Link>
        <p>{props.name}</p>
    </div>
  )
}

export default Item
