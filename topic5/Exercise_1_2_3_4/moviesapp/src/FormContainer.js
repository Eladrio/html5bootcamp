import React, {Component} from 'react';
import FormComponent from "./FormComponent";

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
    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <FormComponent handleChange = {this.handleChange} handleSubmit= {this.handleSubmit} data = {this.state} />
    );
  }
}
export default FormContainer;
