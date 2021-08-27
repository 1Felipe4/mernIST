import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import User from './User.js';
import LogoutButton from './LogoutButton.js';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newAction:'add_notice'
        }
        this.logOut = this.logOut.bind(this)
        this.switchAction = this.switchAction.bind(this)

    }

    logOut(e) {
        this.props.logOut()
    }

    switchAction(e) {
        if(e.target.value == 'add_notice'){
            this.props.setAction(e.target.value)
            this.state.newAction = 'view_notices'
        }else{
            this.props.setAction(e.target.value)
            this.state.newAction = 'add_notice'
        }
    }


    render() {
        const logOut = this.props.logOut;

        return (
            <><h2>Welcome {this.props.student_id} </h2>
                <div>     
                    <Button variant="danger" type="button" size="sm" onClick={this.logOut}>
                        Log Out
                    </Button>
                </div></>
        )
    }
}

ReactDOM.render(
    <Profile />,
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

export default Profile
