// MovieFilters.js
import React, { useState } from 'react';

const MovieFilters = () => {
    const [sortYear, setSortYear] = useState('asc'); // 'asc' hoặc 'desc'
    const [sortRating, setSortRating] = useState('asc'); // 'asc' hoặc 'desc'

    const sortMovies = (movies) => {
        return movies.sort((a, b) => {
            if (sortYear === 'asc') {
                return new Date(a.release_date) - new Date(b.release_date);
            } else {
                return new Date(b.release_date) - new Date(a.release_date);
            }
        }).sort((a, b) => {
            if (sortRating === 'asc') {
                return parseFloat(a.imdbRating) - parseFloat(b.imdbRating);
            } else {
                return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
            }
        });
    };
    

    return (
        <div>
            <button onClick={() => setSortYear('asc')}>Năm Tăng Dần</button>
            <button onClick={() => setSortYear('desc')}>Năm Giảm Dần</button>
            <button onClick={() => setSortRating('asc')}>Rating Tăng Dần</button>
            <button onClick={() => setSortRating('desc')}>Rating Giảm Dần</button>
        </div>
    );
    
};

export default MovieFilters;
