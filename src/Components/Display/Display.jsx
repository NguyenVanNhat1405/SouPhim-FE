import React from 'react'
import './Display.css'
const Display = (props) => {
    const { img } = props;
    return (
        
        <div className='display'>
            <div className='tille'>
                <h1>{img.name}</h1>
            </div>
            <div className='display-gird'>
            <div className='display-left'>
                <div className='display-img'>
                    <img className='display-main-img' src={img.image} alt="" />
                </div>
            </div>
            <div className='display-right'>
                <div className='display-right-desc'>
                    Mô Tả: {img.desc}
                </div>
                <div className='display-right-director'>
                    Đạo Diễn: {img.director}
                </div>
                <div className='display-right-director'>
                    Diễn Viên: {img.actor}
                </div>
                <div className='display-right-tap'>
                    Tập: {img.tap}
                </div>
                <div className='display-right-nam'>
                    Năm Sản Xuất: {img.nam}
                </div>
                <div className='display-right-quocgia'>
                    Quốc Gia: {img.quocqia}
                </div>
                <div className='display-right-theloai'>
                   Thể Loại: {img.theloai} 
                </div>
            </div>
            </div>
        </div>
    )
}

export default Display