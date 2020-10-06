import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Movie from '../components/Movie';
import SearchForm from '../components/SearchForm';
import MoviesContext from '../context/MoviesContext';
import IconArrowRight from '../icons/arrowRight';
import IconStars from '../icons/stars';
// import IconArrowRight from '../icons/arrowRight';  //npm install @types/react

const Home = () => {


    // consumer the movie context
    const { movieList, loadingSearchMovies } = useContext(MoviesContext);

    // order list for rating desc
    movieList.sort((a: any, b: any) => (a.fields.rating < b.fields.rating) ? 1 : -1)
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
        ) : (
            <div>
                <div className="row flex-nowrap overflow-auto">
                    {
                        movieList.map((m: any) => (
                            <Movie key={m.pk} movie={m} />
                        ))
                    }
                </div>
                <p className="title-movies my-3">Ranking</p>
            </div>
        )

    return (
        <>
            <p className="title-movies my-5">Movies</p>
            <div className="row my-1">
                <div className="col-10 col-md-5 ">
                    <SearchForm />
                </div>
            </div>
            {loading}
            <div className="row">
                <div className="col-md-5">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Rating</th>
                                <th scope="col">-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                movieList.map((m: any, index: number) => (
                                    <tr key={m.pk} >
                                        <th scope="row">{index}</th>
                                        <td>{m.fields.title}</td>
                                        <td>
                                            {m.fields.rating}
                                            <IconStars key={index}
                                            className="rotate-vert-center"
                                                width={20} height={20}
                                                stroke="#FF8222" fill="#FF8222" />
                                        </td>
                                        <td>
                                            <Link to={`/details/${m.pk}`} >
                                                <span>details</span><IconArrowRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home
