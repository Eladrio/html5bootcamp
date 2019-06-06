import React from 'react';
import Movie from './Movie'
import FormContainer from './FormContainer';

function MoviesList(props) {

  function handleDelete(event) {
    const id = parseInt(event.target.value);
    props.handleDelete(id);
  }

  function handleSave(input) {
    props.handleSave(input);
  }

  function handleEdit(event) {
    const id = parseInt(event.target.value);
    props.handleEdit(id);
  }

  let movies = props.data.idS.map(id => {
    return(
      props.editingId === id ?
        <div>
          <FormContainer handleSubmit={handleSave}/>
        </div>
        :
          props.data.movies[id].isFavorite ?
            <div key={id} className="div-movie-item">
              <Movie data={props.data.movies[id]} />
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
export default MoviesList;