import React, { useEffect, useState } from 'react'
import IconReset from '../icons/reset';
import IconStars from '../icons/stars'
import './starRating.css'
const StarRating = (props: any) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {

    }, [rating])
    return (
        <div>
            {[...Array(5)].map((star: any, index: any) => {
                const ratingValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio" name="rating" value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <IconStars
                            className="star"
                            width={40} height={40}
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
                    className="btn-reset-stars"
                    onClick={() => setRating(0)}>
                    <IconReset />
                </button>

            </div>
        </div>
    )
}

export default StarRating
