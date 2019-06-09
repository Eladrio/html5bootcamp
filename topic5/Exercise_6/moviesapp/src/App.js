import React, {Component} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { connect } from "react-redux";
import { ADD_MOVIE } from './constants/action-types';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/MoviesList'
import AddMovie from './components/FormContainer';

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
      <BrowserRouter>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route
            path='/addmovie'
            render={(props) => <AddMovie handleSubmit= {this.handleFormSubmit} />} />
      </BrowserRouter>
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
