import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [movieData, setMovieData] = useState({
        movieDb: [],
        hot_img: [],
    });

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies/');
                const movies = response.data;
                const formattedMovies = movies.map(movie => {
                    const imageUrl = movie.poster && movie.poster.trim() !== ''
                        ? movie.poster // Sử dụng đúng trường 'poster' thay vì 'poster_path'
                        : 'https://example.com/default-image.jpg';
                    return {
                        id: movie.id,
                        name: movie.title || 'Chưa có tiêu đề',
                        image: imageUrl,
                        desc: movie.overview || 'Chưa có mô tả',
                        genres: Array.isArray(movie.genres) && movie.genres.length > 0 ?
                            movie.genres.map(genre => typeof genre === 'string' ? genre : genre.name || 'Không có tên thể loại') :
                            ['Chưa có thể loại'],
                        cast: Array.isArray(movie.cast) ? movie.cast.slice(0, 5).map(actor => actor.name) : ['N/A'],
                        production_companies: Array.isArray(movie.production_companies) && movie.production_companies.length > 0 ?
                            movie.production_companies.map(company => typeof company === 'string' ? company : company.name || 'N/A') :
                            ['Chưa có nhà sản xuất'],
                        director: movie.director || 'Chưa có thông tin đạo diễn',
                        seasons: Array.isArray(movie.seasons) ? movie.seasons : [],
                        countries: movie.countries,
                        release_date: movie.release_date || 'Chưa có ngày phát hành',
                        runtime: movie.runtime,
                        actors: movie.actors,
                        trailer: movie.trailer,
                    };
                });


                
                setMovieData({
                    movieDb: formattedMovies,
                    hot_img: formattedMovies,
                });
            } catch (error) {
                console.error("Error fetching movie data:", error.response ? error.response.data : error.message);
            }
        };

        fetchMovieData();
    }, []);

    return (
        <Context.Provider value={{ movieDb: movieData.movieDb, hot_img: movieData.hot_img }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
