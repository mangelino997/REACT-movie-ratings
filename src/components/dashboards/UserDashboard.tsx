import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import MoviesContext from '../../context/MoviesContext';
import UserContext from '../../context/UserContext';
import IconStars from '../../icons/stars';
import IconTrash from '../../icons/trash';
import Notification from '../notifications/Notification';
import getMovieById from '../../utils/getMovieById';

const initialToast = {
    show: false,
    type: "",
    message: ""
}
const UserDashboard = () => {
    const history = useHistory();

    // show toast
    const [toast, setToast] = useState(initialToast);
    //
    const [listRankedByUser, setListRankedByUser] = useState([])
    // consumer the movie context
    const { logout } = useContext(UserContext);
    // consumer the movie context
    const {
        ratingsList,
        movieList,
        loadingSearchMovies,
        deleteMovieRated
    } = useContext(MoviesContext);
    // consumer the user context
    const { user } = useContext(UserContext);

    // handle delete movie ranked by current user
    const deleteRankedMovie = (movieId: any) => {
        try {
            deleteMovieRated(movieId);
            const t = {
                show: true,
                type: "success",
                message: "Rated movie deleted successful"
            };
            setToast(t)
            setTimeout(() => {
                setToast(initialToast);
            }, 5000)
        } catch (error) {
            const t = {
                show: true,
                type: "error",
                message: "Rated movie not deleted"
            };
            setToast(t);
            setTimeout(() => {
                setToast(initialToast)
            }, 5000)
        }
    }
    // get the movies ranked by user
    useEffect(() => {
        // filter for movies rated by user
        let listRankedByUser = ratingsList.filter((rated: any) => {
            return rated.emailUser === user.credentials.email
        })
        // add movie title 
        console.log(listRankedByUser)
        listRankedByUser.map((m: any) => {
            const res = getMovieById(m.idMovie, movieList);
            console.log(res)
            m.titleMovie = res.title;
        })
        setListRankedByUser(listRankedByUser);
    }, [ratingsList])

    return (
        <div className="container">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4>USER</h4>
                <button
                    className="mb-md-0 btn btn-sm btn-secondary"
                    onClick={() => logout(history)}>
                    Logout
                    </button>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <img />
                </div>
            </div>
            <h5>My qualifications</h5>
            {!loadingSearchMovies &&
                (
                    <div className="row">
                        <div className="table-responsive-sm">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Stars</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Delete my rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listRankedByUser.map((m: any, index: number) => (
                                            <tr key={m._id} >
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {m.stars}
                                                    <IconStars key={index}
                                                        className="rotate-vert-center"
                                                        width={18} height={18}
                                                        stroke="#FF8222" fill="#FF8222" />
                                                </td>
                                                <td>{m.titleMovie}</td>
                                                <td>
                                                    <button
                                                        onClick={() => deleteRankedMovie(m._id)}
                                                        className="btn btn-sm btn-danger btn-danger-shadow">
                                                        <IconTrash
                                                            stroke="#fff"
                                                            fill="#fff"
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            {toast.show && <Notification type={toast.type} message={toast.message} />}
        </div>
    )
}

export default UserDashboard
