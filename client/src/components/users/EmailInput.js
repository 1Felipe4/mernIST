import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.props.onTemperatureChange(e.target.value);
//   }

//   render() {
//     const temperature = this.props.temperature;
//     const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature}
//                onChange={this.handleChange} />
//       </fieldset>
//     );
//   }
// }

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);


  }

  handleChange(e) {
    this.props.handleChange(e);
  }


  render() {
    const email = this.props.email
    return (
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Student Email:</Form.Label>
        <Form.Control name="student_id"
          name="email"
          type="email"
          value={email}
          onChange={this.handleChange} />
      </Form.Group>
    );
  }
}

ReactDOM.render(
  <EmailInput />,
  document.getElementById('root')
);

export default EmailInput

