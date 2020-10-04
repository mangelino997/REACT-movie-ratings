import React from 'react'
import { Link } from 'react-router-dom';
import Movie from '../components/Movie';
import moviesExamples from '../data/movies.json'
import IconArrowRight from '../icons/arrowRight';  //npm install @types/react
const Home = () => {

    const moviesList = moviesExamples;
    return (
        <>
            <div className="row justify-content-center py-5">
                <div className="col-10 col-md-6 form-inline">
                    <input className="form-control mr-sm-2"
                        type="text"
                        placeholder="Example: John Wick"
                        aria-label="Search" />
                    <button className="btn btn-shadow btn-sm" type="submit">Search</button>
                </div>
            </div>
            <p className="title-movies my-1">All Movies</p>
            <hr />
            <div>
                <div className="row flex-nowrap overflow-auto">
                    {
                        moviesList.map((m) => (
                            <Movie key={m.pk} movie={m}/>
                        ))
                    }
                </div>

                <p className="title-movies my-3">Rank List</p>
            </div>
        </>
    )
}

export default Home
