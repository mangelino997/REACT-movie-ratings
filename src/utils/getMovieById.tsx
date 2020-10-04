import movies from '../data/movies.json'

export const getMovieById = (movieId: any) => {
    return movies.find(movie => movie.pk === parseInt(movieId));
}

export default getMovieById
