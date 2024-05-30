import React from 'react';
import styles from './Display.module.css';
import Rating from '../Rating/Rating';

const Display = (props) => {
    const { img } = props;
    return (
        <div className={styles.display}>
            <div className={styles.title}>
                <h1>{img.name}</h1>
            </div>
            <div className={styles.displayRightRating}>
                <Rating />
            </div>
            <div className={styles.displayGrid}>
                <div className={styles.displayLeft}>
                    <div className={styles.displayImg}>
                        <img className={styles.displayMainImg} src={img.image} alt={img.name} />
                    </div>
                </div>
                <div className={styles.displayRight}>

                    <div className={styles.displayRightDesc}>
                        Mô Tả: {img.desc}
                    </div>
                    <div className={styles.displayRightDirector}>
                        Đạo Diễn: {img.director}
                    </div>
                    <div className={styles.displayRightActor}>
                        Diễn Viên: {img.actor}
                    </div>
                    <div className={styles.displayRightTap}>
                        Tập:{img.tapco}/{img.tap}
                    </div>
                    <div className={styles.displayRightNam}>
                        Năm Sản Xuất: {img.nam}
                    </div>
                    <div className={styles.displayRightQuocgia}>
                        Quốc Gia: {img.quocgia}
                    </div>
                    <div className={styles.displayRightTheloai}>
                        Thể Loại: {img.theloai}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
