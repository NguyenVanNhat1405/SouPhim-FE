import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Context = createContext(null);

const ContextProvider = (props) => {
    const [movieData, setMovieData] = useState({
        movieDb: [],
        newMovies: [],
        popularMovies: [],
    });

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // Lấy tất cả phim
                const response = await axios.get('http://localhost:5000/api/movies/get');
                const movies = response.data;

                // Lấy phim mới
                const responseNew = await axios.get('http://localhost:5000/api/new/');
                const moviesNew = responseNew.data;
                // console.log("new",moviesNew);
                // Lấy phim phổ biến
                const responsePopu = await axios.get('http://localhost:5000/api/popular/');
                const moviesPopu = responsePopu.data;
                // console.log("popu", moviesPopu);
                // Format các phim
                const formatMovies = (movies) => {
                    return movies.map(movie => {
                        const imageUrl = movie.poster && movie.poster.trim() !== ''
                            ? movie.poster
                            : 'https://example.com/default-image.jpg';
                        return {
                            id: movie.id,
                            name: movie.title || 'Chưa có tiêu đề',
                            image: imageUrl,
                            desc: movie.overview || 'Chưa có mô tả',
                            genres: Array.isArray(movie.genres) && movie.genres.length > 0 ?
                                movie.genres.map(genre => typeof genre === 'string' ? genre : genre.name || 'Không có tên thể loại') :
                                ['Chưa có thể loại'],

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
                };

                // Cập nhật state với các dữ liệu đã format
                setMovieData({
                    movieDb: formatMovies(movies),
                    newMovies: formatMovies(moviesNew),
                    popularMovies: formatMovies(moviesPopu),
                });
            } catch (error) {
                console.error("Error fetching movie data:", error.response ? error.response.data : error.message);
            }
        };

        fetchMovieData();
    }, []);

    return (
        <Context.Provider value={{ movieDb: movieData.movieDb, newMovies: movieData.newMovies, popularMovies: movieData.popularMovies }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
