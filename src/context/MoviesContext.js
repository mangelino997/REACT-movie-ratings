import axios from 'axios';
import getRatingDataMovie from '../utils/getRatingMovie';
import React, { createContext, useState, useEffect } from 'react';

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {

    // consumer the movie context
    const [movies, setMovies] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [ratingsList, setRatingsList] = useState([]);
    const [movieListSearch, setMovieListSearch] = useState(null);
    const [loadingSearchMovies, setLoadingSearchMovies] = useState(false);

    // handle search movies
    const searchMoviesList = (search) => {
        setLoadingSearchMovies(true);
        const inputMovie = search.trim().toLowerCase();
        const newMovieList = movieList.filter(m => {
            const mTitle = m.title.toLowerCase().trim();
            return mTitle.includes(inputMovie.toLowerCase().trim());
        });
        setTimeout(() => {
            setLoadingSearchMovies(false);
            setMovieListSearch(newMovieList);
        }, 1800)
    }

    // handle reset movieList
    const clearSearchMoviesList = () => {
        setLoadingSearchMovies(true);
        setTimeout(() => {
            setLoadingSearchMovies(false);
            setMovieListSearch(null);
        }, 1800)
    }

    //add new movie
    const addNewMovie = async (newMovie) => {
        await axios.post('/movies', newMovie)
            .then((res) => {
                res.data.movieStored.ratingData = {
                    count: 0,
                    totalRating: 0,
                    value: 0
                }
                const newList = [
                    res.data.movieStored,
                    ...movieList
                ]
                setMovieList(newList)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //update movie
    const updateMovie = (movie, movieId) => {
        setLoadingSearchMovies(true);
        axios.put(`/movies/${movieId}`, movie)
            .then((res) => {
                const newList = movieList;
                newList.map((m, index) => {
                    if (m._id === movie._id)
                        movieList.splice(index, 1, res.data.movieUpdated)
                })
                setMovieList(newList);
                getDataRating();
                setTimeout(() => {
                    setLoadingSearchMovies(false);
                }, 1800)
            })
            .catch((err) => {
                console.log(err)
                return err.status;
            })
    }

    // delete movie
    const deleteMovie = async (movieId) => {
        await axios.delete(`/movies/${movieId}`)
            .then((res) => {
                const newList = movieList.filter(movie => movie._id !== movieId)
                setMovieList(newList)
                return true;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    /*          METHODS FOR RATED MOVIES         */

    //add new rated movie 
    const addNewRatedMovie = async (newRatedMovie) => {
        await axios.post('/ratings', newRatedMovie)
            .then((res) => {
                const newList = [
                    res.data.rated,
                    ...ratingsList
                ]
                setRatingsList(newList)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // delete movie rated
    const deleteMovieRated = async (movieRatedId) => {
        await axios.delete(`/ratings/${movieRatedId}`)
            .then((res) => {
                const newList = ratingsList.filter(rating => rating._id !== movieRatedId)
                setRatingsList(newList)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // generate data rating for each movie
    const getDataRating = () => {
        movieList.map((movie) => {
            movie.ratingData = getRatingDataMovie(movie._id, ratingsList);
        })
        setMovieList(movieList)
        setMovies(movieList);
    }


    // get and format list movies
    const getAllAndFormatMovies = () => {
        axios.get('movies')
            .then((res) => {
                setMovieList(res.data ? res.data.movies : [])
                axios.get('ratings')
                    .then((res) => {
                        // get all register of ratings 
                        setRatingsList(res.data ? res.data.ratings : [])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAllAndFormatMovies()
    }, [])

    useEffect(() => {
        getDataRating()
    }, [ratingsList])

    const data = {
        movieList,
        ratingsList,
        movieListSearch,
        loadingSearchMovies,
        searchMoviesList,
        clearSearchMoviesList,
        addNewMovie,
        updateMovie,
        deleteMovie,
        deleteMovieRated,
        addNewRatedMovie
    }

    return (
        <MoviesContext.Provider value={data}>
            {children}
        </MoviesContext.Provider>
    )
}
export { MoviesProvider }
export default MoviesContext;