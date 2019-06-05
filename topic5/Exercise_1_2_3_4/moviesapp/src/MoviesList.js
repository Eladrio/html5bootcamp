import React from 'react';

function MoviesList(props) {
    const movies = props.data.map((movie, i) => {
      return(
        <div key={i} className="div-movie-item">
        {movie.render()}
      </div>
      )
    })
    return(
      <div className="movies-container">
        {movies}
      </div>
    )
}
export default MoviesList;