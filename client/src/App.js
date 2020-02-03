import React from 'react';
import logo from './logo.svg';
//import './styling/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginSignUpScreen from './components/LoginSignUpScreen';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import RegisterScreen from './components/RegisterScreen';
import Dashboard from "./components/Dashboard.js";


function App() {

  return (
    // app wrapped in a router, starts by default with login page
    // will route users to game dashboard once signed in or registered
    <Router>
      <div className="App">

        {/*<Header />     */}  
        
        <Switch>
          <Route exact path="/" component={LoginSignUpScreen}/>
          <Route path ="/register" component={RegisterScreen}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>        
        </Switch>
      </div>
    </Router>
  );
}



export default App;
