import Layout from './core/Layout';
import React, { useState, useEffect } from "react";

import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";
import { getUserFromToken } from './controllers/methods';
import Notices from './components/notices/Notices';
const App = ({match}) => {
  const [values, setValues] = useState({
    user: null,
    notices: null,
    token: null
});
  useEffect(async () => {
    let token = localStorage.getItem('token');

    if (token) {
        console.log(token)
        //setValues({...values, token: token})
        axios.post(`${process.env.REACT_APP_API}/usertoken`,{
            token
        }).then((response) => {
            //console.log("Signup Success", response);
            if(!response.data.user){
                toast.error(response.data.error);
            }
            console.log(response.data)
            const user = response.data.user
            axios.post(`${process.env.REACT_APP_API}/notices/all`,{
            token
        }).then((response) => {
            //console.log("Signup Success", response);
            if(!response.data.notices){
                toast.error(response.data.error);
            }
            console.log(response.data)
            const notices = response.data.notices
            //setValues({...values, notices: notices})
            setValues({...values, user: user, notices: notices, token: token})

            // setValues({...values, first_name: '', last_name: '', email: '', buttonText: 'Submit', success: true})
        }).catch((error) => {
            console.log('Signup Error', error.response.data);
            toast.error(error.response.data.error);
        });

            // setValues({...values, first_name: '', last_name: '', email: '', buttonText: 'Submit', success: true})
        }).catch((error) => {
            console.log('Signup Error', error.response.data);
            toast.error(error.response.data.error);
        });
    }
}, []);

if(values.user){
  return (
    <Layout token={values.token}>
      <h1>Hello React, welcome Home!</h1>
      {values.user ? "Hello, " + values.user.first_name : "Hello React, welcome Home!"}
      {values.notices ? <Notices notices={values.notices} user={values.user} /> : ""}
    </Layout>
  );
}else{
  return (
    <Layout>
      <h1>Hello React, welcome Home!</h1>
      {values.user ? "Hello, " + values.user.first_name : "Hello React, welcome Home!"}
    </Layout>
  );
}

};

export default App;
