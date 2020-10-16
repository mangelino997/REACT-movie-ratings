import React, { useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Movie from '../components/Movie';
import SearchForm from '../components/SearchForm';
import MoviesContext from '../context/MoviesContext';
import IconArrowRight from '../icons/arrowRight';
import axios from 'axios';
import IconStars from '../icons/stars';
import jwt_decode from "jwt-decode";
import UserContext from '../context/UserContext';

const Home = () => {
    const { logout, getUserData } = useContext(UserContext);
    const history = useHistory();

    // consumer the movie context
    const {
        movieList,
        movieListSearch,
        clearSearchMoviesList,
        loadingSearchMovies } = useContext(MoviesContext);

    // define list
    const list = movieListSearch ? movieListSearch : movieList;

    // get top 20 of the ranking
    const moviesListRanking = movieList.length > 20 ?
        movieList.splice(20, (movieList.length - 20)) : movieList;

    useEffect(() => {
        // clear before movie list search's
        clearSearchMoviesList();
        // get token
        const token = localStorage.getItem("Token");
        if (token) {
            const decodeToken: any = jwt_decode(token);
            if (decodeToken.exp * 1000 < Date.now()) // verificamos si expiro el token
            {
                logout(history);
            } else {
                axios.defaults.headers.common['Authorization'] = token;
                getUserData()
            }
        }
    }, [])

    useEffect(() => {
        // order list for rating desc
        movieList.sort((a: any, b: any) => (a.ratingData?.value < b.ratingData?.value) ? 1 : -1)
    }, [movieList])
    const loading = loadingSearchMovies ?
        (
            <div className="row justify-content-center py-5">
                <div className="sk-folding-cube ">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>
        ) : (
            <div>
                {movieListSearch ? (movieListSearch.length === 0 &&
                    <small style={{ color: '#FF4E56' }}>Not found</small>)
                    : null}
                <div className="row flex-nowrap overflow-auto">
                    {
                        list.map((m: any) => (
                            <Movie key={m._id} movie={m} />
                        ))
                    }
                </div>
                <p className="title-movies my-3">Top Ranking</p>
            </div>
        )
    return (
        <>
            <p className="title-movies my-5">Movies</p>
            <div className="row my-1">
                <div className="col-10 col-md-5 ">
                    <SearchForm />
                </div>
            </div>
            {loading}
            <div className="row">
                <div className="col-md-5 table-responsive-sm">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Title</th>
                                <th scope="col">-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                moviesListRanking.map((m: any, index: number) => (
                                    <tr key={m._id} >
                                        <th scope="row">{index + 1}</th>
                                        <td >
                                            {m.ratingData?.value}
                                            <IconStars key={index}
                                                className="rotate-vert-center"
                                                width={18} height={18}
                                                stroke="#FF8222" fill="#FF8222" />
                                        </td>
                                        <td>{m.title}</td>
                                        <td>
                                            <Link to={`/details/${m._id}`} >
                                                <span>details</span><IconArrowRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
