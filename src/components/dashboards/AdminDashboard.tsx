import React, { useContext, useState } from 'react'
import MoviesContext from '../../context/MoviesContext'
import UserContext from '../../context/UserContext'
import IconEdit from '../../icons/edit'
import IconStars from '../../icons/stars'
import IconTrash from '../../icons/trash'
import SearchForm from '../SearchForm'
import { useForm } from 'react-hook-form';
import Notification from '../notifications/Notification';
import { useHistory } from 'react-router'

type Inputs = {
    title: string,
    year: number,
    rated: string,
    director: string,
    plot: string,
    image: any,
    imageURL: any,
    _id: any
};

const initialToast = {
    show: false,
    type: "",
    message: ""
}
const AdminDashboard = () => {

    const history = useHistory();
    // show toast
    const [toast, setToast] = useState(initialToast);
    // form values
    const [movieValues, setMovieValues] = useState<any>(null);
    // consumer the movie context
    const { logout } = useContext(UserContext);
    const { reset, register, handleSubmit, errors } = useForm<Inputs>();

    // consumer the movie context
    const {
        movieList,
        movieListSearch,
        loadingSearchMovies,
        addNewMovie,
        updateMovie,
        deleteMovie
    } = useContext(MoviesContext);

    // handle submit 
    const onSubmit = (data: any) => {
        const image = data.image ? data.image[0] : null
        const formData = new FormData();
        formData.append("title", data.title)
        formData.append("year", data.year)
        formData.append("rated", data.rated)
        formData.append("director", data.director)
        formData.append("plot", data.plot)
        formData.append("image", image)
        // formData.append("imageURL", movieValues.imageURL)
        // formData.append("_id", movieValues._id)

        // update movie (else --> add new movie)
        if (movieValues?._id) {
            try {
                data.image = null;
                data.imageURL = movieValues.imageURL
                data._id = movieValues._id
                updateMovie(data, movieValues._id)

                const t = {
                    show: true,
                    type: "success",
                    message: "Movie update successful"
                };
                setToast(t)
                setMovieValues(null);
                reset();
                setTimeout(() => {
                    setToast(initialToast)
                }, 5000)
            } catch (error) {
                const t = {
                    show: true,
                    type: "error",
                    message: "Movie not update"
                };
                setToast(t);
                setTimeout(() => {
                    setToast(initialToast)
                }, 5000)
            }
        } else {
            try {
                addNewMovie(formData);
                const t = {
                    show: true,
                    type: "success",
                    message: "Movie added successful"
                };
                setToast(t)
                reset();
                setTimeout(() => {
                    setToast(initialToast)
                }, 5000)
            } catch (error) {
                const t = {
                    show: true,
                    type: "error",
                    message: "Movie not added"
                };
                setToast(t);
                setTimeout(() => {
                    setToast(initialToast)
                }, 5000)
            }
        }
    };

    // handle set default values for to edit
    const editMovie = (movie: any) => {
        setMovieValues(movie);
    }

    // handle delete movie
    // const updateMovieSelected = (movie: any) => {
    //     try {
    //         updateMovie(movie);
    //         const t = {
    //             show: true,
    //             type: "success",
    //             message: "Movie deleted successful"
    //         };
    //         setToast(t)
    //         setTimeout(() => {
    //             setToast(initialToast);
    //         }, 5000)
    //     } catch (error) {
    //         const t = {
    //             show: true,
    //             type: "error",
    //             message: "Movie not deleted"
    //         };
    //         setToast(t);
    //         setTimeout(() => {
    //             setToast(initialToast)
    //         }, 5000)
    //     }
    // }
    // handle delete movie
    const deleteMovieId = (movieId: any) => {
        try {
            deleteMovie(movieId);
            const t = {
                show: true,
                type: "success",
                message: "Movie deleted successful"
            };
            setMovieValues(null);
            reset();
            setToast(t)
            setTimeout(() => {
                setToast(initialToast);
            }, 5000)
        } catch (error) {
            const t = {
                show: true,
                type: "error",
                message: "Movie not deleted"
            };
            setToast(t);
            setTimeout(() => {
                setToast(initialToast)
            }, 5000)
        }
    }

    // handle change image
    const handleChangeImage = (event: any) => {
        setMovieValues({
            ...movieValues,
            imageURL: URL.createObjectURL(event.target.files[0])
        })
    }
    // define list
    const list = movieListSearch ? movieListSearch : movieList;

    // button submit
    let buttonSubmit = movieValues?.title ?
        "Update movie" : "Add movie";

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
        <div className="container">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h4>ADMIN</h4>
                <button
                    className="mb-md-0 btn btn-sm btn-secondary"
                    onClick={() => logout(history)}
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="title"
                                            name="title"
                                            defaultValue={movieValues?.title}
                                            ref={register({ required: true })}
                                        />
                                        {errors.title ?
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div> : <br />
                                        }
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            placeholder="year"
                                            name="year"
                                            defaultValue={movieValues?.year}
                                            ref={register({ required: true })}
                                        />
                                        {errors.year &&
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div>
                                        }
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="rated"
                                            name="rated"
                                            defaultValue={movieValues?.rated}
                                            ref={register({ required: true })}
                                        />
                                        {errors.rated &&
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div>
                                        }
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="director"
                                            name="director"
                                            defaultValue={movieValues?.director}
                                            ref={register({ required: true })}
                                        />
                                        {errors.director &&
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div>
                                        }
                                    </div>
                                </div><br />
                                <div className="form-row">
                                    <div className="col">
                                        <textarea
                                            rows={3}
                                            placeholder="plot"
                                            className="form-control"
                                            name="plot"
                                            defaultValue={movieValues?.plot}
                                            ref={register({ required: true })}
                                        />
                                        {errors.plot &&
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div>
                                        }
                                    </div>
                                </div><br />
                                <div className="form-row">
                                    <div className="col">
                                        <input
                                            type="file"
                                            id="validatedCustomFile"
                                            name="image"
                                            onChange={(e) => handleChangeImage(e)}
                                            disabled={movieValues?._id}
                                            ref={register}

                                        />
                                        {errors.image &&
                                            <div className="invalid-feedback">
                                                This field is required
                                        </div>
                                        }
                                    </div>
                                </div><br />
                                <button
                                    className="btn btn-sm btn-success"
                                    type="submit">
                                    {buttonSubmit}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 card-login py-3">
                    <div className="text-center my-auto">
                        <img height="auto" width={200}
                            src={movieValues?.imageURL}
                            alt="movie image" />
                    </div>

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
                                            <tr key={index} >
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {m.ratingData?.value}
                                                    <IconStars key={index}
                                                        className="rotate-vert-center"
                                                        width={18} height={18}
                                                        stroke="#FF8222" fill="#FF8222" />
                                                </td>
                                                <td>{m.title}</td>
                                                <td>
                                                    <button
                                                        onClick={() => editMovie(m)}
                                                        className="btn btn-sm btn-primary btn-primary-shadow">
                                                        <IconEdit
                                                            stroke="#fff"
                                                            fill="#fff"
                                                        />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => deleteMovieId(m._id)}
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

export default AdminDashboard
