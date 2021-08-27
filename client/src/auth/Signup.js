import React, {useState} from "react";
import Layout from '../core/Layout';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";


const Signup = () => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    // destructure values to allow direct referencing
    const { first_name, last_name, email, password, buttonText } = values;

    // This handler is invoked for every change event on the form.
    const handleChange = (name) =>  (event) => {
        setValues({ ...values, [name]: event.target.value})
    }

    // Here we will write the code to manage what happens when the submit button is clicked
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText:"submitting"});
        axios.post(`${process.env.REACT_APP_API}/signup`,{
            first_name, last_name, email, password
        }).then((response) => {
            //console.log("Signup Success", response);
            setValues({...values, first_name: '', last_name: '', email: '', buttonText: 'Submit', success: true})
            toast.success(response.data.message);
        }).catch((error) => {
            //console.log('Signup Error', error.response.data);
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        });
       
    }

    // The following function defines the signup form with it's fields and all the respective bindings already set
    const signupForm = () => (
        
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input type="text" className="form-control" value={first_name} onChange={handleChange('first_name')} />
            </div>
            
            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input type="text" className="form-control" value={last_name} onChange={handleChange('last_name')} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')} />
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
            <h1 className="text-center">Sign up</h1>
            {/* uncomment the following line to troubleshoot/view the internal values of the variables */}
            {/* {JSON.stringify({ name, email, password})} */}

            {/* display the signup form on the page */}
            {signupForm()}
        </Layout>
    )

}

export default Signup;