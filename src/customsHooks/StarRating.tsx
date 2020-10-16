import React, { useContext, useEffect, useState } from 'react'
import IconStars from '../icons/stars'
import './starRating.css'
import UserContext from '../context/UserContext';
const StarRating = (props: any) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // consumer the user context
    const { user } = useContext(UserContext);
    // handle the rank current movie
    const rankCurrentMovie = () => {
        if (!user.credentials.email) {
            alert("You must Sign In")
            return
        }
        const el = {
            emailUser: user.credentials.email,
            idMovie: props.idMovie,
            stars: rating
        }
        props.newScore(rating, el)
    }
    useEffect(() => {

    }, [rating])
    return (
        <div>
            {[...Array(10)].map((star: any, index: any) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio" name="rating" value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <IconStars
                            className="star"
                            width={26} height={26}
                            stroke={ratingValue <= (rating || hover) ? "#FF8222" : null}
                            fill={ratingValue <= (rating || hover) ? "#FF8222" : null}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                )
            })}
            <div className="text-center">
                <h4>{rating} stars</h4>
                <button
                    type="button"
                    onClick={() => rankCurrentMovie()}
                    disabled={rating === 0}
                    className="btn btn-sm btn-success btn-login btn-success-shadow">
                    Rank
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-secondary btn-login ml-2 btn-second-shadow"
                    onClick={() => setRating(0)}>
                    Reset
                </button>
                {/* <button
                    className="btn-reset-stars"
                    onClick={() => setRating(0)}>
                    <IconReset />
                </button> */}

            </div>
        </div>
    )
}

export default StarRating
