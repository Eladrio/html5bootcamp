import React, {Component} from 'react';

class Movie extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      title: props.title,
      director: props.director,
      genre: props.genre,
      year: props.year,
      duration: props.duration,
    }
  }

  render() {
    return (
      <div className="movie-card">
        <header><h2>{this.state.title}</h2></header>
        <ul>
          <li>Director: {this.state.director}</li>
          <li>Genre: {this.state.genre}</li>
          <li>Duration: {this.state.duration} min</li>
          <li>Year: {this.state.year}</li>
        </ul>
      </div>
    );
  }

}
export default Movie;