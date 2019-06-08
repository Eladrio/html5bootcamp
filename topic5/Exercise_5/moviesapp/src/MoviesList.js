import React from 'react';
import Movie from './Movie'
import FormContainer from './FormContainer';
import { connect } from "react-redux";
import { DELETE_MOVIE, EDIT_MOVIE, HANDLE_EDIT_MOVIE } from './constants/action-types';

function MoviesList(props) {

  function handleDelete(event) {
    const id = parseInt(event.target.value);
    props.deleteMovie(id);
  }

  function handleSave(input) {
    props.editMovie(input);
  }

  function handleEdit(event) {
    const id = parseInt(event.target.value);
    props.handleEditMovie(id);
  }

  let movies = props.moviesId.map(id => {
    return(
      props.editingId === id ?
        <div>
          <FormContainer handleSubmit={handleSave}/>
        </div>
      :
        props.movies[id].isFavorite ?
          <div key={id} className="div-movie-item">
            <Movie data={props.movies[id]} />
            <button type="button" value={id} onClick={handleEdit}>Edit</button>
            <button type="button" value={id} onClick={handleDelete}>Delete</button>
          </div>
        :
          null
      );
    });
    return(
      <div className="movies-container">
        {movies}
      </div>
    )
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
  return{
    deleteMovie: (id) => { dispatch({type: DELETE_MOVIE, id: id})},
    handleEditMovie: (id) => { dispatch({ type: HANDLE_EDIT_MOVIE, id: id})},
    editMovie: (input) => { dispatch({ type: EDIT_MOVIE, input: input})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);