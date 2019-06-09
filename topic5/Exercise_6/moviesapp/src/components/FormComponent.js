import React from "react";

function FormComponent(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSubmit();
  }

  return (
    <div className="form-container">
      <h2>Input new Movie's data</h2>
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
        <label>
          <input type="checkbox" checked={props.data.isFavorite} name="isFavorite" onChange={props.handleChange} />
          Check if its one your favorites!
        </label>

        <button type="submit">Submit</button>
    </form>
    </div>
  );
}
export default FormComponent;