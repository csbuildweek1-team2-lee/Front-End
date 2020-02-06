import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginSignUpScreen from '../components/LoginSignUpScreen';

const Header = (props) => {

  const logout = (e) => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className="header">
      
      <h2>The Infinite Fortress</h2>

      <button onClick = {logout} className = "notifications-reject-btn">
          Exit
      </button>

      <Router>
        
        
       
      <Route exact path="/" component={LoginSignUpScreen}/>
              
        
     
    </Router>

    </div>
  );
}

export default Header;