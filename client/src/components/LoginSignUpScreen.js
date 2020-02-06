import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styling/App.css';

const LoginSignupScreen = (props) => { 

  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    })
   
  }

  const handleSubmit = (e) => {
    console.log('login creds: ', loginCredentials)
    e.preventDefault();
    axios.post(
      //'https://lambda-mud-test.herokuapp.com/api/login/', loginCredentials
      'https://csbuildonelee.herokuapp.com/api/login/', loginCredentials
      )
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.key);
        localStorage.setItem("username", loginCredentials.username);        
        props.history.push('/dashboard');
      })
      .catch (err => {
        console.log(err);
      })
  }

  return (
    <div className="login-screen">

      <div className="login-form-container">

        <h2 className="login-form-title">Sign In </h2>

        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        
        <form onSubmit={handleSubmit} className="login-form">
          <input 
          onChange={handleChange}
          className="input-email"          
          name = "username"         
          type="text"          
          placeholder = "Username"
          required
          />
          <input 
          onChange={handleChange}
          className="input-password"
          name="password"
          type="password"
          placeholder="Password"
          required
          />          

          <button>Enter</button>
        </form>

        <div className="register-description">
          <p>Don't have an account? Sign Up <Link to='/register'>Here</Link></p>
        </div>
        
      </div>
    </div>
  );
}

export default LoginSignupScreen;