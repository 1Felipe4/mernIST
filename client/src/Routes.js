import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Activate from './auth/Activate';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Profile from './components/users/Profile';
import Users from './components/users/Users';
import AddNotice from './components/notices/AddNotice';
import Notices from './components/notices/Notices';
import ApplyLeader from './components/users/ApplyLeader';
import LogOut from './components/users/LogOut';
import PendingUsers from './components/users/PendingUsers';
import Dashboard from './core/Dashboard';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin} />
                <Route path="/auth/activate/:token" component={Activate} />
                <Route path="/users/all" component={Users} />                
                <Route path="/me" component={Profile} />
                <Route path="/notices/new" component={AddNotice} />
                <Route path="/notices/all" component={Notices} />
                <Route path="/apply-leader" component={ApplyLeader} />
                <Route path="/logout" component={LogOut} />
                <Route path="/users/pending" component={PendingUsers} />
                <Route path="/dashboard" component={Dashboard} />


            </Switch>
        </BrowserRouter>
    )
}

export default Routes