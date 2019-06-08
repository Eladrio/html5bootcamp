import React, {Component} from 'react';
import FormComponent from "./FormComponent";

/* I let the form to have his React state because I think that it state doesnt have an App global impact.
   And doesnt make a big chain of sending and receiving props and data. */
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

  handleChange(event) {
    const {name, value, type, checked} = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

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
