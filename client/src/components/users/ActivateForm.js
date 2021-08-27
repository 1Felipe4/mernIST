import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        student_id: '',
        email: '',
        password: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({student_id: event.target.student_id});
      this.setState({email: event.target.email});
      this.setState({password: event.target.password});

    }
  
    render() {
      return (
        <form method="post">
          <label>
            Student ID:
            <input
              name="student_id"
              type="text"
              student_id={this.state.student_id}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="email"
              email={this.state.email}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              password={this.state.password}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      );
    }
  }
  
  ReactDOM.render(
    <LoginForm />,
    document.getElementById('root')
  );
  
  export default LoginForm

  