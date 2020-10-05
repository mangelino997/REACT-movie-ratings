import React, { useContext } from 'react'
import Movie from '../components/Movie';
import SearchForm from '../components/SearchForm';
import MoviesContext from '../context/MoviesContext';
// import IconArrowRight from '../icons/arrowRight';  //npm install @types/react

const Home = () => {

    // consumer the movie context
    const { movieList, loadingSearchMovies } = useContext(MoviesContext);

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
        </>
    )
}

export default Home
