export const getRatingDataMovie = (movieId: any, ratingsList:any) => {
    let ratingData = {};
    ratingData = ratingsList.reduce((accumulator:any, currentValue:any) => {
        if(currentValue.idMovie === movieId){
            accumulator.count ++;
            accumulator.totalRating = parseFloat(accumulator.totalRating)+currentValue.stars;
            accumulator.value = (accumulator.totalRating/ accumulator.count).toFixed(2);
        }
        return accumulator;
    }, {
        count: 0,
        totalRating: 0,
        value: 0
    })
    return ratingData
}

export default getRatingDataMovie