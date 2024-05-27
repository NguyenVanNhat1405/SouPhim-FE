import React from 'react'
import './Display.css'
const Display = (props) => {
    const { img } = props;
    return (
        <div className='display'>
            <div className='tille'>
            <h1>{img.name}</h1>
            </div>
            <div className='display-left'>
                
                <div className='display-img'>
                    <img className='display-main-img' src={img.image} alt="" />
                </div>
            </div>
            <div className='display-right'>
                
            </div>


        </div>
    )
}

export default Display