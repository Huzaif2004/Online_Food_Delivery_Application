import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CityContext } from './context/CityContext';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserDetails, setisloggedin } = useContext(CityContext);
  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      margin: '10px 0',
      backgroundColor: '#e80911',
      color: 'white',
      width: '350px' // Corrected to lowercase 'w'
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:8080/api/getusers');
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        toast.success("Login successful!"); // Show success toast
        console.log('Login successful:', user);
        setUserDetails(user);
        setisloggedin(true);
        navigate('/home');
      } else {
        setInvalidLogin(true);
        toast.error("Invalid email or password"); // Show error toast
        console.log('Invalid email or password');
      }
    } catch (error) {
      toast.error("Error fetching users"); // Show error toast for network or server error
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className='signin'>
      <div className="signin-container">
        <div className='signin-box'>
          <form onSubmit={handleSubmit}>
            <div>
              <h2>SignIn</h2>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                placeholder="Email"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                style={{ marginTop: "15px" }}
                required
              />
            </div>
            {invalidLogin && <p style={{ color: "red", fontSize: "15px", margin: "5px 0 0 5px" }}>Email or password is invalid!</p>}
            <button type="submit" style={{ color: "black" }}>Sign In</button>
            <div className="overline-container">
              <hr className="line" />
              <span className="overline-text">OR</span>
            </div>
            <button style={styles.button}>
              Continue with Google
            </button>
            <button style={styles.button}>
              Continue with Facebook
            </button>
            <p style={{ marginTop: "10px" }}>New to the App!!  <Link to='/signup' style={{ color: "#e18a0f" }}>   Sign Up</Link></p>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
