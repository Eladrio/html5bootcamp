import React, {Component} from 'react';
import FormComponent from "./FormComponent";
import Movie from './Movie';

class FormContainer extends Component {
  constructor(props) {
    super()
    this.state = {
      title: "",
      director: "",
      genre: "",
      year: "",
      duration: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name,value} = event.target
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    console.log(this.state);
    let newMovie = new Movie(this.state);
    this.props.handleSubmit(newMovie);
  }

  render() {
    return (
      <FormComponent handleChange = {this.handleChange} handleSubmit= {this.handleSubmit} data = {this.state} />
    );
  }
}
export default FormContainer;
