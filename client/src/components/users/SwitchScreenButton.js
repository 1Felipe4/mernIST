import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import User from './User.js';
import LogoutButton from './LogoutButton.js';

class SwitchScreenButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newAction: 'add_notice'
        }
        this.switchAction = this.switchAction.bind(this)

    }

    switchAction(e) {
        if (e.target.value == 'add_notice') {
            this.props.setAction(e.target.value)
            this.state.newAction = 'view_notices'
            //this.props.updateNotices()
        } else {
            this.props.setAction(e.target.value)
            this.state.newAction = 'add_notice'
        }
    }


    render() {
        return (

            <Button variant="outline-primary" type="button" size="sm" onClick={this.switchAction} value={this.state.newAction}>
                {this.state.newAction == 'add_notice' ? ('Add Notice') : ('View Notices')}
            </Button>

        )
    }
}

ReactDOM.render(
    <SwitchScreenButton />,
    document.getElementById('root')
);






// const Profile = ({ user, logOut }) => {
//     return (
//         <>
//             <h2>Welcome {user.student_id} <LogoutButton logOut={logOut} /> </h2>
//             <User key={user._id} user={user} />
//             <Button variant="danger" type="submit" size="sm">
//                 Add Post
//             </Button>
//             <Button variant="danger" type="submit" size="sm">
//                 Log Out
//             </Button>
//         </>
//     )
// }

export default SwitchScreenButton
