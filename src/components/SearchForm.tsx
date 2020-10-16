import React, { useContext, useState } from 'react'
import MoviesContext from '../context/MoviesContext';

const SearchForm = () => {

    const [search, setSearch] = useState('');
    const { searchMoviesList, clearSearchMoviesList } = useContext(MoviesContext);

    const handleChange = (e: any) => {
        setSearch( e.target.value)
    }

    // handle search movies
    const handleSearch = () => {
        searchMoviesList(search);
    }

    // handle return all movieList
    const handleClearSearchMovies = () => {
        setSearch('');
        clearSearchMoviesList();
    }
    return (
        <>
            <div className="input-group input-group-sm mb-3 ">
                <input type="text" className="form-control"
                    minLength={1}
                    value={search}
                    placeholder="Example: John Wick"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => handleChange(e)} />
                <div className="input-group-append">
                    <button
                        disabled={!search}
                        onClick={handleSearch}
                        className="btn btn-outline-primary" type="button">
                        Search
                    </button>
                    <button
                        disabled={!search}
                        className="btn btn-outline-secondary"
                        onClick={handleClearSearchMovies}
                        type="button">
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}

export default SearchForm
