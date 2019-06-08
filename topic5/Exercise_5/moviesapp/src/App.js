import React, {Component} from 'react';
import Form from './FormContainer';
import MoviesList from './MoviesList';
import './App.css';
import { connect } from "react-redux";
import { ADD_MOVIE } from './constants/action-types';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(newInput) {
    //dispatchs the addMovie action
    this.props.addMovie(newInput);
  }

  render(){
    return(
      <div className="content-container">
        <Form handleSubmit= {this.handleFormSubmit} />
        {this.props.movies ? <MoviesList /> : null}
      </div>
    );
  }
}

// maps the state of the store to this component's props.
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    moviesId: state.moviesId,
    editingId: state.editingId
  }
}

// maps dispatch of actions to this component's props.
const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (payload) => { dispatch({type: ADD_MOVIE, payload: payload})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
