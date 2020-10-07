import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NotFoundImage from '../assets/error-404.png';
import IconStars from '../icons/stars';
import MoviesContext from '../context/MoviesContext';
import IconEdit from '../icons/edit';
import IconTrash from '../icons/trash';
import SearchForm from '../components/SearchForm';

const Dashboard = () => {

    // consumer the movie context
    const { user, logout } = useContext(UserContext);
    // consumer the movie context
    const { movieList, movieListSearch, loadingSearchMovies, clearSearchMoviesList } = useContext(MoviesContext);
    //
    const list = movieListSearch ? movieListSearch : movieList;

    // didMount --> clearSearch
    useEffect(() => {
        return clearSearchMoviesList;
    }, [])

    // list filter
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
        ) : null;

    return (

        user ? (
            <div className="container">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h4>ADMIN</h4>
                    <button
                        className="mb-md-0 btn btn-sm btn-secondary"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <img />
                    </div>
                </div>
                <div className="row my-1">
                    <div className="col-md-6 card-login py-3">
                        <div className="row justify-content-center my-1">
                            <div className="col">
                                <form>
                                    <div className="form-row">
                                        <div className="col">
                                            <input type="text"
                                                className="form-control form-control-sm"
                                                placeholder="title" />
                                        </div>
                                    </div><br />
                                    <div className="form-row">
                                        <div className="col">
                                            <input type="text"
                                                className="form-control form-control-sm"
                                                placeholder="year" />
                                        </div>
                                        <div className="col">
                                            <input type="text"
                                                className="form-control form-control-sm"
                                                placeholder="rated" />
                                        </div>
                                        <div className="col">
                                            <input type="text"
                                                className="form-control form-control-sm"
                                                placeholder="director" />
                                        </div>
                                    </div><br />
                                    <div className="form-row">
                                        <div className="col">
                                            <textarea
                                                rows={3}
                                                placeholder="plot"
                                                className="form-control"
                                            />
                                        </div>
                                    </div><br />
                                    <button
                                        className="btn btn-sm btn-success"
                                        type="submit">Submit form</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 card-login py-3">
                        <div className="custom-file mb-3">
                            <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                            <label className="custom-file-label" >Choose file...</label>
                            <div className="invalid-feedback">Example invalid custom file feedback</div>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="col">
                                <input type="text"
                                    className="form-control form-control-sm"
                                    placeholder="url image" />
                            </div>
                        </div><br />
                    </div>
                </div>
                <div className="row my-1">
                    <div className="col-10 col-md-5 ">
                        <SearchForm />
                        {loading}
                    </div>
                </div>
                
                {!loadingSearchMovies &&
                    (
                        <div className="row">
                            <div className="table-responsive-sm">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">-</th>
                                            <th scope="col">-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((m: any, index: number) => (
                                                <tr key={m.pk} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        {m.fields.rating}
                                                        <IconStars key={index}
                                                            className="rotate-vert-center"
                                                            width={18} height={18}
                                                            stroke="#FF8222" fill="#FF8222" />
                                                    </td>
                                                    <td>{m.fields.title}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary btn-primary-shadow">
                                                            <IconEdit
                                                                stroke="#fff"
                                                                fill="#fff"
                                                            />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
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

            </div>
        ) :
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
