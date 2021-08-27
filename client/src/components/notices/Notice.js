import React, { useState, useEffect, Component } from "react";
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";


const Notice = ({ notice, user }) => {
    const [values, setValues] = useState({
        user: null,
        canDel: false,
        buttonText: "Delete"
    });
    useEffect(async () => {

        if (user) {
            if (notice.author._id === user._id || user.role.role_code === "faculty") {
                setValues({ ...values, canDel: true })

            }
        }

    }, []);

    const onClick = () => {
        let token = localStorage.getItem('token');
        let noticeID = notice._id
        setValues({ ...values, buttonText: "Deleting" })
        if (token) {
            console.log(token)
            axios.post(`${process.env.REACT_APP_API}/notices/delete`, {
                token, noticeID
            }).then((response) => {
                notice = response.data.notice
                console.log(response.data)
                setValues({ ...values, buttonText: "Deleted" })

            }).catch((error) => {
                console.log('Signup Error', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: "Delete" })

            });
            // }
        }
    }

    return (
        <div className='notice'>
            <h3>{notice.caption} </h3>
            <p>{notice.content}</p>
            <p>{notice.date}</p>
            <p>{notice.author.first_name} {notice.author.last_name}</p>
            {values.canDel ?
                <Button variant="danger" onClick={onClick}>
                    {values.buttonText}
                </Button> : ""}
        </div>
    )


}

export default Notice
