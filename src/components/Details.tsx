import React, { useState } from 'react'
import { useParams } from 'react-router';
import StarRating from '../customsHooks/StarRating';
import IconStars from '../icons/stars';
import getMovieById from '../utils/getMovieById';

const Details = () => {

    const { movieId }: any = useParams();
    const movie = getMovieById(movieId);
    console.log(movie);

    return (
        <div className="container">
            <div className="row justify-content-center py-2">
                <div className="col-12 col-md-6">
                    <img className="card swing-in-top-fwd card-img-bottom"
                        src={movie?.imageURL}
                        alt="Card image cap" />
                    {/* <div className="card swing-in-top-fwd ">
                        <img className="card-img-bottom" src={movie?.imageURL} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{movie?.fields.title}</h5>
                            <small>{movie?.fields.director}</small>
                        </div>
                    </div> */}
                </div>
                <div className="col-12 col-md-4">
                    <div className="text-center">
                        <h1 className="card-title">{movie?.fields.title}</h1>
                        <h6>{movie?.fields.director}</h6>
                    </div>
                    <div className="text-center py-3">
                        {/* <h5>Rate this movie</h5> */}
                        <StarRating />
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <h5>{movie?.fields.year}</h5>
                            <small>Year</small>
                        </div>
                        <div className="col">
                            <h5>{movie?.fields.rated}</h5>
                            <small>Rated</small>
                        </div>
                        <div className="col">
                            <h5>{movie?.fields.rating}</h5>
                            <small>Rating</small>
                        </div>
                    </div>
                    <div className="text-center py-3">
                        <p className="card-text">{movie?.fields.plot}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
