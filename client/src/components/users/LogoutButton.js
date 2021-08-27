import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        this.props.logOut()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Button variant="danger" type="submit" size="sm">
                Log Out
            </Button>
          </Form>
            // <form onSubmit={this.handleSubmit}>
            //     <input type="submit" value="Log Out" />
            // </form>
        );
    }
}

ReactDOM.render(
    <LogoutButton />,
    document.getElementById('root')
);

export default LogoutButton

