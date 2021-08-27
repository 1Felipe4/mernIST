import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EmailInput from './EmailInput';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: '',
      email: '',
      password: '',
      activate: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target)
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state + 'handles')
    this.props.loginUser(this.state)
    this.setState({ student_id: '' });
    this.setState({ password: '' });
    this.setState({ email: '' });
    this.setState({ activate: false });


  }

  render() {
    return (
      <div >
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check name="activate"
            type="checkbox"
            checked={this.state.activate}
            onChange={this.handleChange} label="Account Activation" />
        </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Student ID:</Form.Label>
            <Form.Control name="student_id"
              type="text"
              value={this.state.student_id}
              onChange={this.handleChange} />
          </Form.Group>
          {this.state.activate ? (<EmailInput email={this.state.email} handleChange={this.handleChange} />) : ('')}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange} />
          </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      // <form onSubmit={this.handleSubmit}>
      //   <label>
      //    Account Activation:
      //     <input
      //       name="activate"
      //       type="checkbox"
      //       checked={this.state.activate}
      //       onChange={this.handleChange} />
      //   </label>
      //   <label>
      //     Student ID:
      //     <input
      //       name="student_id"
      //       type="text"
      //       value={this.state.student_id}
      //       onChange={this.handleChange} />
      //   </label>
      //   <br />
      //   {this.state.activate ? (<EmailInput email={this.state.email} handleChange={this.handleChange}/>) : ('')}
      //   <label>
      //     Password:
      //     <input
      //       name="password"
      //       type="password"
      //       value={this.state.password}
      //       onChange={this.handleChange} />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
    );
  }
}

ReactDOM.render(
  <LoginForm />,
  document.getElementById('root')
);

export default LoginForm

