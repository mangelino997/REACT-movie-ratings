export const getMovieById = (movieId: any, movieList:any) => {
    return movieList.find((movie: any) => movie._id === movieId);
}

export default getMovieById
