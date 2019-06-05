import React, {Component} from 'react';

class Movie extends Component {
  constructor(props) {
    super();
    this.state = {
      title: props.data.title,
      director: props.data.director,
      genre: props.data.genre,
      year: props.data.year,
      duration: props.data.duration,
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