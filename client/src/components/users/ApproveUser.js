// import { FaTimes } from 'react-icons/fa';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import Button from 'react-bootstrap/Button'

import React, { useState, useEffect, Component } from "react";
const ApproveUser = ({ user }) => {
    const [values, setValues] = useState({
        user: user,
        buttonText: 'Approve'

    });
    const onClick = () =>{
        const token = localStorage.getItem('token');
        const id = user._id
        console.log(id);
        setValues({...values, buttonText: 'Approving'});
        axios.post(`${process.env.REACT_APP_API}/users/approve`,{
            id, token
        }).then((response) => {
            setValues({...values, buttonText: 'Approved'});
            toast.success(response.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Approve'});
            toast.error(error.response.data.error);
        });

    }
    return (
        <div>
            <Button variant="primary" type="submit" onClick={onClick}>
                {values.buttonText}  {user.first_name} {user.last_name}
            </Button>
        </div>
    )
}

export default ApproveUser
// {/* <FaTimes style={{ color:'red', cursor: 'pointer' }}  onClick={() => onDelete(user.id)}/> */}