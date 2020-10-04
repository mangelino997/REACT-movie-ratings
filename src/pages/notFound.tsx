import React from 'react'
import NotFoundImage from '../assets/error-404.png';

const NotFound = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col text-center">
                        <img src={NotFoundImage} height={300} width={300}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
