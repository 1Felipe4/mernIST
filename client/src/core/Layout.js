import {Link, withRouter} from 'react-router-dom';
import React, { useState, useEffect, Fragment } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from "axios";
import LogOut from '../components/users/LogOut';

const Layout = ({children, match, token })=> {


    const isActive = (path) => {
       return match.path === path ? {color: '#F382FC', fontWeight: 'bolder' }  : {color: '#fff'} ;
    };

    const nav = ()=> (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}> Home </Link>
            </li>
            <li className="nav-item">
                <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup </Link>
            </li>
            <li className="nav-item">
                <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin </Link>
            </li>
        </ul>
    )

    const loggedInNav = ()=> (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}> Home </Link>
            </li>
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link" style={isActive('/dashboard')}> Dashboard </Link>
            </li>
            <li className="nav-item">
                <LogOut/>
            </li>
        </ul>
    )

    return (
        <Fragment>
            {token ? loggedInNav() : nav()}
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);