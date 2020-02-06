import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const RegisterScreen = (props) => {
  /*const [newUserInfo, setNewUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })*/

  const [newUserInfo, setNewUserInfo] = useState({
    username: '',    
    password1: '',
    password2: ''
  })

  const handleChange = (e) => {   
    e.preventDefault(); 
    setNewUserInfo({
      ...newUserInfo,
      [e.target.name]: e.target.value
    })    
         
  };

  // 'https://csbuildonelee.herokuapp.com/api/registration/'

  const handleSubmit = (e) => {
    console.log("new user info", newUserInfo)  
    e.preventDefault();    
    axios.post('https://csbuildonelee.herokuapp.com/api/registration/', newUserInfo) 
      .then(res => {
        localStorage.setItem('token', res.data.key);
        console.log("register res", res.data);        
        axios.post('https://csbuildonelee.herokuapp.com/api/login/', 
        {username: newUserInfo.username, password: newUserInfo.password1})
          .then(res => {
            localStorage.setItem('token', res.data.key);
            localStorage.setItem("username", newUserInfo.username);
            props.history.push('/dashboard');
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="register-screen">
      <div className="register-form-container">

      <h2 className="register-form-title">Sign Up </h2>

        <form onSubmit={handleSubmit} className="register-form">
          
            {/*<input 
            onChange={handleChange}
            name="firstname"                                    
            placeholder="First Name"
            type="text"
            required
            />
            <input 
            onChange={handleChange}
            name="lastname"
            placeholder="Last Name"
            type="text"
            required
            />        
            <input 
            onChange={handleChange}
            name="email"
            placeholder="Desired Email"
            type="email"
            required
            />*/}

            <input 
            onChange={handleChange}
            name="username"                                    
            placeholder="Username"
            type="text"
            required
            />

            <input 
            onChange={handleChange}
            name="password1"
            placeholder="Desired Password"
            type="password"
            required
            />

            <input 
            onChange={handleChange}
            name="password2"
            placeholder="Desired Password"
            type="password"
            required
            />
         
          <button>Sign Up</button>
        </form>

        <div className="login-description">
          <p>Already have an account? Login <Link to='/'>Here</Link></p>
        </div>

        
      </div>
    </div>
  );
}
export default RegisterScreen;