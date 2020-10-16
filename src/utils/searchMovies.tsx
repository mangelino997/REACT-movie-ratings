import movies from '../data/movies.json'

export const searchMovies = (titleSearch: string) => {
    const inputMovie = titleSearch.trim().toLowerCase();
    const newMovieList = movies.filter((m:any) => {
        const mTitle = m.title.toLowerCase().trim();
        return mTitle.includes(inputMovie.toLowerCase().trim());
    });
    return newMovieList;
}

export default searchMovies