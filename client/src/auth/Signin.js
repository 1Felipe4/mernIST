import React, {useState} from "react";
import Layout from "../core/Layout"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";
import { useHistory } from "react-router-dom";



const Signin = () => {
    const history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'sign in'
    });

    const { email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value})
    }

    // on click of signin button 
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'signing in' });
        axios
            .post(`${process.env.REACT_APP_API}/signin`, {
                email, password
            })
            .then((response) => {
                console.log('SIGNIN SUCCESS', response);
                // consider saving the response (user, token) in local storage and cookie respectively
                setValues({ ...values, email: '', password: '', buttonText: 'Sign in', success: true })
                toast.success(`Hey ${response.data.user.first_name}, Welcome back!`);
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    history.push('/');
                    }, 3000)
            })
            .catch((error) => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Sign in' });
                toast.error(error.response.data.error);

            });

    };


    const signinForm = () => (
        
        <form>

            <div className="form-group">
                <label className="text-muted">email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')}  />
            </div>

            <div className="form-group">
                <label className="text-muted">password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')}  />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
            
        </form>
    )
    return (
        <Layout>
            <ToastContainer />
            <h1 className="text-center" >Sign in </h1>
            {signinForm()}
        </Layout>
    )
}

export default Signin