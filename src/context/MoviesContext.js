import React, { createContext, useState } from 'react';
import movies from '../data/movies.json'

const MoviesContext = createContext();

const initialMovies = movies;

const MoviesProvider = ({ children }) => {

    const [movieList, setMovieList] = useState(initialMovies);
    const [movieListSearch, setMovieListSearch] = useState(null);
    const [loadingSearchMovies, setLoadingSearchMovies] = useState(false);

    // handle search movies
    const searchMoviesList = (search) => {
        setLoadingSearchMovies(true);
        const inputMovie = search.trim().toLowerCase();
        const newMovieList = movies.filter(m => {
            const mTitle = m.fields?.title.toLowerCase().trim();
            return mTitle.includes(inputMovie.toLowerCase().trim());
        });
        setTimeout(()=>{
            setLoadingSearchMovies(false);
            setMovieListSearch(newMovieList);
        }, 1800)
    }

    // handle reset movieList
    const clearSearchMoviesList = () =>{
        setLoadingSearchMovies(true);
        setTimeout(()=>{
            setLoadingSearchMovies(false);
            setMovieListSearch(null);
        }, 1800)
     }

    const data = { movieList, movieListSearch, loadingSearchMovies, searchMoviesList, clearSearchMoviesList }

    return (
        <MoviesContext.Provider value={data}>
            {children}
        </MoviesContext.Provider>
    )
}
export { MoviesProvider }
export default MoviesContext;