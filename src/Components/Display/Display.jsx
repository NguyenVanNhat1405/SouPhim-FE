import React, { useContext } from 'react'; // Import useParams
import { Context } from '../../Context/Context'; // Đường dẫn tới nơi bạn khai báo ContextProvider
import styles from './Display.module.css';
import { useParams } from 'react-router-dom';

const Display = () => {
    const { movieDb } = useContext(Context);// Sử dụng useContext để lấy dữ liệu từ Context
    const { movieId} = useParams();
   
    // Tìm phim theo idMovie
    const movie = movieDb.find(movie => movie.id === movieId);// Giả sử idMovie là string
    
    // Kiểm tra nếu không tìm thấy phim
    if (!movie) {
        return <div>Không tìm thấy phim</div>;
    }

    return (
        <div className={styles.display}>
            <div className={styles.title}>
                <h1>{movie.name}</h1>
            </div>
            
            <div className={styles.displayGrid}>
                <div className={styles.displayLeft}>
                    <div className={styles.displayImg}>
                        <img className={styles.displayMainImg} src={movie.image} alt={movie.name} />
                    </div>
                </div>
                <div className={styles.displayRight}>
                    <div className={styles.displayRightDesc}>
                        Mô Tả: {movie.desc}
                    </div>
                    <div className={styles.displayRightDirector}>
                        Thời lượng: {movie.runtime}
                    </div>
                    <div className={styles.displayRightActor}>
                        Diễn Viên: {movie.actors.join(', ')} {/* Hiển thị danh sách diễn viên */}
                    </div>
                    <div className={styles.displayRightNam}>
                        Năm Sản Xuất: {movie.release_date}
                    </div>
                    <div className={styles.displayRightQuocgia}>
                        Quốc Gia: {movie.countries.join(', ')}
                    </div>
                    <div className={styles.displayRightTheloai}>
                        Thể Loại: {movie.genres.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
