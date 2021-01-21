import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/AddJob'
import Navbar from './components/templates/Navbar'
import Example from './components/templates/Example'
import ApplicantDashboard from './components/Users/Dashboard'
import Profile from './components/Users/ApplicantDashboard'
import SignIn from './components/templates/SignIn'
import SignUp from './components/templates/SignUp'
import UserService from './services/UserService'


const AuthRoute = ({ loggedIn, role, path, reloadHook, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ?
      <Redirect to='/' /> :
      <Component  reloadHook={reloadHook} {...props} />
    )}
  />
);

const PrivateRoute = ({ loggedIn, user, path, reloadHook, acomponent: AComponent, rcomponent: RComponent }) => (
  <Route
    exact path={path}
    render={ props => {
      if (loggedIn && user.user.role==='applicant')
        return <AComponent reloadHook={reloadHook} {...props} />
      else if (loggedIn)
      return <RComponent user={user} reloadHook={reloadHook}  {...props} />
      else return <Redirect to='/login' />
    }}
  />
);

const App =  () => {
 
  const [ user, setUser] = useState({
    loggedIn:false,
    user : {},
    role : {}
  })

    
  
  const reloadHook = () => {
    
    UserService.checkLogin().then(r => {
      if(r.user){
        setUser({
          loggedIn:true,
          user: r.user,
          role: r.applicant ? r.applicant : r.recruiter
        })
      }
      else{
        setUser({
          loggedIn:false,
          user : {},
          role : {}
        })   
      }
    })
  }   



  useEffect(reloadHook,[])

  
  console.log(UserService.checkLogin(),'asdfasdf')
  return (
    <Router>
      <div >
      <Navbar loggedIn={user.loggedIn} reloadHook={reloadHook} />
        <br/>
        <Switch>
          <AuthRoute loggedIn={user.loggedIn}  exact path="/register" user={user} reloadHook={reloadHook} component={SignUp}/>
          <AuthRoute loggedIn={user.loggedIn}  exact path="/login" user={user}  reloadHook={reloadHook}  component={SignIn}/>
          <AuthRoute loggedIn={user.loggedIn}  exact path="/dashboard" user={user}  component={Navbar}  />
          <PrivateRoute loggedIn={user.loggedIn}  exact path="/users" user={user}  acomponent={UsersList} rcomponent={UsersList}  />
          <PrivateRoute  loggedIn={user.loggedIn}  exact path="/profile" user={user}  acomponent={Profile} rcomponent={Profile}/>
          <PrivateRoute loggedIn={user.loggedIn}   exact path="/" user={user}  acomponent={Profile} rcomponent={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
