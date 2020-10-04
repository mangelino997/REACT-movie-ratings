import React from 'react'
import { Link } from 'react-router-dom'
import IconArrowRight from '../icons/arrowRight'

const Movie = ({movie} : any) => {
    return (
        <div className="col-6 col-md-3">
            <div className="card card-block flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={movie.imageURL} className="imageURL" alt="movie" />
                    </div>
                    <div className="flip-card-back">
                        <p className="title-back-card">{movie.fields.title}</p>
                        <Link to={`/details/${movie.pk}`} className="bottom-right">
                            <span>more details</span><IconArrowRight />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie
