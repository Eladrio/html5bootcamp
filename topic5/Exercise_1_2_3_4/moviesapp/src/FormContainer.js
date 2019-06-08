import React, {Component} from 'react';
import FormComponent from "./FormComponent";

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      director: "",
      genre: "",
      year: "",
      duration: "",
      isFavorite: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleChange() it gets passed to FormComponent component as a callback prop.
   * Manages the form input and state to fullfill the requirements to be a controlled form.
   *
   * @param {Event} event
   */
  handleChange(event) {
    const {name, value, type, checked} = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  /**
   * handleSubmit() it gets passed to the FormComponent component as a callback prop.
   * Makes the call to the callback prop received in props. Sending the input from the form.
   */
  handleSubmit() {
    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <FormComponent handleChange = {this.handleChange} handleSubmit= {this.handleSubmit} data = {this.state} />
    );
  }
}
export default FormContainer;
