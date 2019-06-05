import React, {Component} from 'react';
import Form from './FormContainer';
import MoviesList from './MoviesList';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(newInput) {
    this.setState( prevState => {
      let newState = {
        movies:[...prevState.movies, newInput]
      }
      return newState;
    })
    console.log(this.state);
  }

  render(){
    return(
      <div className="content-container">
        <Form handleSubmit= {this.handleFormSubmit} />
        {this.state.movies ? <MoviesList data={this.state.movies}/> : null}
      </div>
    );
  }
}

export default App;
