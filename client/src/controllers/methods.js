import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from 'jsonwebtoken';
import axios from "axios";

const getUserFromToken = async () => {
    let token = localStorage.getItem('token');
    let user = null
    if (token) {
        console.log(token)
        axios.post(`${process.env.REACT_APP_API}/usertoken`,{
            token
        }).then((response) => {
            //console.log("Signup Success", response);
            if(!response.data.user){
                toast.error(response.data.error);
            }
            console.log(response.data)
            user = response.data.user
            console.log("here")

            // setValues({...values, first_name: '', last_name: '', email: '', buttonText: 'Submit', success: true})
        }).catch((error) => {
            console.log('Signup Error', error.response.data);
            toast.error(error.response.data.error);
        });
    }
    return user
};

export {getUserFromToken};