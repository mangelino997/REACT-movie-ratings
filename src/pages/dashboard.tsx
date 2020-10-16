import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NotFoundImage from '../assets/error-404.png';
import IconStars from '../icons/stars';
import MoviesContext from '../context/MoviesContext';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import UserDashboard from '../components/dashboards/UserDashboard';

const Dashboard = () => {

    // consumer the movie context
    const { user } = useContext(UserContext);
    // consumer the movie context
    const { clearSearchMoviesList } = useContext(MoviesContext);

    // didMount --> clearSearch
    useEffect(() => {
        return clearSearchMoviesList;
    }, [])

    return (
        user.credentials ? user.credentials.role === 'ADMIN' ?
            (<AdminDashboard />) : (<UserDashboard />)
            :
            (
                <div className="container">
                    <div className="row justify-content-center ">
                        <div className="col text-center">
                            <img src={NotFoundImage} height={300} width={300}></img>
                        </div>
                    </div>
                    <div className="row justify-content-center my-2">
                        <div className="col text-center">
                            <button className="btn btn-primary">
                                <Link
                                    to="/login"
                                    className="link-in-button">
                                    Login
                            </Link>
                            </button>
                        </div>
                    </div>
                </div>
            )

    )
}

export default Dashboard
