import React from "react";

function FormComponent(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="form-new-movie">
      <input
          type="text"
          value={props.data.title}
          name="title"
          placeholder="Title"
          onChange={props.handleChange}
          required
      />
      <input
          type="text"
          value={props.data.director}
          name="director"
          placeholder="Director"
          onChange={props.handleChange}
          required
      />
      <input
          type="text"
          value={props.data.genre}
          name="genre"
          placeholder="Genre"
          onChange={props.handleChange}
          required
      />
      <input
          type="number"
          value={props.data.duration}
          name="duration"
          placeholder="Duration"
          min="1"
          onChange={props.handleChange}
          required
      />
      <input
          type="number"
          value={props.data.year}
          name="year"
          placeholder="Year"
          min="1"
          onChange={props.handleChange}
          required
      />
      <input
        type="checkbox"
        checked={props.data.isFavorite}
        name="isFavorite"
        onChange={props.handleChange}
      />Check if is one your favorite movies

      <button type="submit">Submit</button>
  </form>
  );
}
export default FormComponent;