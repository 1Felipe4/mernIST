import Layout from './Layout';
import React, { useState, useEffect } from "react";
import {Link, withRouter} from 'react-router-dom';

import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";
const Dashboard = ({match}) => {
  const [values, setValues] = useState({
    user: null,
    isStudent: false,
    isLeader: false,
    isFaculty: false,
    token: null
  });
  useEffect(async () => {
    const token = localStorage.getItem('token');

    if (token) {
        axios.post(`${process.env.REACT_APP_API}/usertoken`,{
            token
        }).then((response) => {
            //console.log("Signup Success", response);
            if(!response.data.user){
                toast.error(response.data.error);
            }
            console.log(response.data)
            const user = response.data.user
            switch (user.role.role_code) {
              case "student":
                setValues({...values, user: user, isStudent: true, token: token})
                break;
              case "pending_leader":
                setValues({...values, user: user, isStudent: true, token: token})
                break;
              case "student_leader":
                setValues({...values, user: user, isLeader: true, token: token})
                break;
              case "faculty":
                setValues({...values, user: user, isFaculty: true, token: token})
                break;
              default:
                break;
            }

            // setValues({...values, first_name: '', last_name: '', email: '', buttonText: 'Submit', success: true})
        }).catch((error) => {
            console.log('Signup Error', error.response.data);
            toast.error(error.response.data.error);
        });

      
    }
}, []);

const studentOptions = ()=> (
  <ul>
      <li className="nav-item">
          <Link to="/apply-leader" className="nav-link" >Apply As Leader </Link>
      </li>
  </ul>
)

const leaderOptions = ()=> (
  <ul>
      <li className="nav-item">
          <Link to="/notices/new" className="nav-link" > New Notice </Link>
      </li>
  </ul>
)

const facultyOptions = ()=> (
  <ul>
      <li className="nav-item">
          <Link to="/notices/new" className="nav-link" > New Notice </Link>
      </li>
      <li className="nav-item">
          <Link to="/users/pending" className="nav-link" >Pending Leaders </Link>
      </li>
  </ul>
)

  return (
    <Layout token={values.token}>
      <h1>{values.user ? "Hello, " + values.user.first_name : ""}</h1>

      {values.isFaculty ? facultyOptions() : ""}
      {values.isStudent ? studentOptions() : ""}
      {values.isLeader ? leaderOptions() : ""}


      
    </Layout>
  );


};

export default Dashboard;
