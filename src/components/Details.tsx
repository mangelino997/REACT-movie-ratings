import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router';
import MoviesContext from '../context/MoviesContext';
import StarRating from '../customsHooks/StarRating';
import IconStars from '../icons/stars';
import getMovieById from '../utils/getMovieById';
import Notification from './notifications/Notification';

const initialToast = {
    show: false,
    type: "",
    message: ""
}
const Details = () => {
    // consumer the movie context
    const { movieList, addNewRatedMovie } = useContext(MoviesContext);
    // define current movie
    let movie:any;
    // handle redirect 
    const history = useHistory();
    // show toast
    const [toast, setToast] = useState(initialToast);
    // set score (stars)
    const [score, setScore] = useState(0);
    // get url param
    const { movieId }: any = useParams();
    // conditional
    movieList.length>0 && (movie = getMovieById(movieId, movieList));
    
    // calculate the new classification
    const newScore = (stars: number, el: any) => {
        try {
            addNewRatedMovie(el)
            movie.ratingData.count++;
            movie.ratingData.totalRating += stars;
            movie.value = (movie.ratingData.totalRating / movie.ratingData.count);
            setScore(movie.value.toFixed(2));
            const t = {
                show: true,
                type: "success",
                message: "Movie rated successful"
            };
            setToast(t)
            setTimeout(() => {
                setToast(initialToast)
            }, 5000)
        } catch (error) {
            const t = {
                show: true,
                type: "error",
                message: "Movie not rated"
            };
            setToast(t)
            setTimeout(() => {
                setToast(initialToast)
            }, 5000)
        }
    }

    useEffect(() => {
        if (movieList.length === 0) {
            history.push('/');
            return;
        }
        // if the movie has not been rated, the value = 0
        let ratedMovie = movie.ratingData? movie.ratingData.value: 0;
        setScore(ratedMovie);
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center py-2">
                <div className="col-12 col-md-6">
                    <img className="card swing-in-top-fwd card-img-bottom"
                        src={movie?.imageURL}
                        alt="Card image cap" />
                </div>
                <div className="col-12 col-md-4">
                    <div className="text-center">
                        <h1 className="card-title">{movie?.title}</h1>
                        <h6>{movie?.director}</h6>
                    </div>
                    <div className="text-center py-3">
                        <StarRating idMovie={movie?._id} newScore={newScore} />
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <h5>{movie?.year}</h5>
                            <small>Year</small>
                        </div>
                        <div className="col">
                            <h5>{movie?.rated}</h5>
                            <small>Rated</small>
                        </div>
                        <div className="col">
                            <h5>
                                {score}
                                <IconStars
                                    className="star"
                                    width={26} height={26}
                                    stroke="#FF8222" fill="#FF8222"
                                />
                            </h5>
                            <small>Rating</small>
                        </div>
                    </div>
                    <div className="text-center py-3">
                        <p className="card-text">{movie?.plot}</p>
                    </div>
                </div>
            </div>
            {toast.show && <Notification type={toast.type} message={toast.message} />}
        </div>
    )
}

export default Details
