import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import React, { useState, useEffect } from "react";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { useHistory } from "react-router-dom";




const Activate = ({ match }) => {
    const history = useHistory();
    const [values, setValues] = useState({
        first_name: '',
        token: '',
    });

    useEffect(() => {
        let token = match.params.token;
        if (token) {
            // console.log(token); // for debugging purposes
            let { first_name } = jwt.decode(token);
            setValues({ ...values, first_name, token });
        }
    }, []);

    const clickSubmit = (event) => {
        event.preventDefault();//prevents page reload
        let token = match.params.token;
        axios
        .post(`${process.env.REACT_APP_API}/account-activation`, {
        token
    })
    .then((response) => {
    console.log('ACCOUNT ACTIVATION', response);
    toast.success(response.data.message);
    setTimeout(() => {
    history.push('/signin');
    }, 3000)
    
    })
    .catch((error) => {
    console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
    toast.error(error.response.data.error);
    
    });
    
    };

    const activationLink = () => (
        <div>
            {/* className="text-center" */}
            <h2 >Hey {values.first_name}, Ready to activate your account?</h2>
            <button className="btn btn-outline-primary" onClick={clickSubmit} >
                Activate Account
            </button>
        </div>
    )

    return (
        <Layout>
            <ToastContainer />
            {/* {JSON.stringify({values})} */}

            <h1>Activate page</h1>
            {activationLink()}
        </Layout>
    )
}

export default Activate
