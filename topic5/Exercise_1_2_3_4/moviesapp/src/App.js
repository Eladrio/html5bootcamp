import React, {Component} from 'react';
import Form from './FormContainer';
import MoviesList from './MoviesList';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies : {},
      moviesId : [],
      editingId : -1
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.setState((prevState) => {
      let newMoviesId = prevState.moviesId.filter((item) => {
        console.log(typeof item);
        console.log(typeof id);
        return item != id
      });
      console.log(newMoviesId);
      let copyMovies = {...prevState.movies};
      delete copyMovies[id];
      let newState = {
        movies: copyMovies,
        moviesId: newMoviesId
      }
      return newState;
    });
  }

  handleSave(input) {
    console.log(input);
    this.setState(prevState => {
      let movs = {...prevState.movies};
      movs[prevState.editingId] = input;
      let newState = {
        movies: movs,
        editingId: -1
      }
      return newState;
    });
  }

  handleEdit(id) {
    this.setState(() => {
      return {
        editingId: id
      }
    })
  }

  handleFormSubmit(newInput) {
    this.setState(prevState => {
      let newId = prevState.moviesId.length;
      let movs = {...prevState.movies};
      movs[newId] = newInput;
      let newState = {
        movies: movs,
        moviesId: [...prevState.moviesId, newId]
      }
      return newState;
    })
  }

  render(){
    return(
      <div className="content-container">
        <Form handleSubmit= {this.handleFormSubmit} />
        {this.state.movies ? <MoviesList data={{movies:this.state.movies, idS:this.state.moviesId}} editingId={this.state.editingId} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleSave={this.handleSave} /> : null}
      </div>
    );
  }
}

export default App;
