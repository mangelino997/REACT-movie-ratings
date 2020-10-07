import movies from '../data/movies.json'

export const searchMovies = (titleSearch: string) => {
    const inputMovie = titleSearch.trim().toLowerCase();
    const newMovieList = movies.filter(m => {
        const mTitle = m.fields?.title.toLowerCase().trim();
        return mTitle.includes(inputMovie.toLowerCase().trim());
    });
    return newMovieList;
}

export default searchMovies