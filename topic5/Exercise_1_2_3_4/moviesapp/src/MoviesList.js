import React from 'react';
import Movie from './Movie'
import FormContainer from './FormContainer';

function MoviesList(props) {

  /**
   *
   * @param {Event} event
   */
  function handleDelete(event) {
    const id = parseInt(event.target.value);
    props.handleDelete(id);
  }

  /**
   * handleSave() it gets passed to the FormComponent component as a callback prop.
   * When the inputs of the Movie been edited get submitted it calls the callback prop
   * in props.
   *
   * @param {Object} input
   */
  function handleSave(input) {
    props.handleSave(input);
  }

    /**
   * handleEdit() it is passed to FormComponent as a callback prop.
   * When the Edit button is clicked receives the id of the Movie that is going to be
   * edited and calls the callback received in props sending that id.
   *
   * @param {Event} event
   */
  function handleEdit(event) {
    const id = parseInt(event.target.value);
    props.handleEdit(id);
  }

  // Iterates over the movies to get what must be displayed.
  let movies = props.data.idS.map(id => {
    return(
/*    If the id of the editing movie is the same as this idS's id, shows the editing form
      if not shows the Movie info. */
      props.editingId === id ?
        <div>
          <FormContainer handleSubmit={handleSave}/>
        </div>
        :
          // displays the movie only if is a favorite one.
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