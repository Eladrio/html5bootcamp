import React, {Component} from 'react';
import FormContainer from './FormContainer';
import MoviesList from './MoviesList';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies : {},
      moviesId : [],
      editingId : -1,
      addingId: 0
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * handleDelete it gets passed to the MoviesList component as a callback prop, it manages the deletion of a Movie
   *
   * @param {Number} id
   */
  handleDelete(id) {
    this.setState((prevState) => {
      let newMoviesId = prevState.moviesId.filter((item) => {
        return item !== id
      });
      let copyMovies = {...prevState.movies};
      delete copyMovies[id];
      let newState = {
        movies: copyMovies,
        moviesId: newMoviesId
      }
      return newState;
    });
  }

  /**
   * handleEdit() it gets passed to the MoviesList component as a callback prop, it sets the editingId in this component's
   * state to the id of the Movie that will get modified.
   *
   * @param {Number} id
   */
  handleEdit(id) {
    this.setState(() => {
      return {
        editingId: id
      }
    })
  }

  /**
   * handleSave() it gets passed to MoviesList as a callback prop and sets the new input to the Movie that is been
   * edited.
   *
   * @param {Object} input
   */
  handleSave(input) {
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

  /**
   * handleFormSubmit() it gets passed to the FormContainer component as a callback prop, it manages the addition of a
   * new Movie.
   *
   * @param {Object} newInput
   */
  handleFormSubmit(newInput) {
    this.setState(prevState => {
      let newId = prevState.addingId + 1;
      let movs = {...prevState.movies};
      movs[newId] = newInput;
      let newState = {
        movies: movs,
        moviesId: [...prevState.moviesId, newId],
        addingId: newId
      }
      return newState;
    })
  }
  // Renders the Form to add new Movies and displays the list of favorite movies.
  render(){
    return(
      <div className="content-container">
        <FormContainer handleSubmit= {this.handleFormSubmit} />
        {this.state.movies ? <MoviesList data={{movies:this.state.movies, idS:this.state.moviesId}} editingId={this.state.editingId} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleSave={this.handleSave} /> : null}
      </div>
    );
  }
}

export default App;
