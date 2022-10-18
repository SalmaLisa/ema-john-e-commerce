import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import img from '../../assets/google.svg'
import { AuthContext } from '../../Contexts/UserContext';

const Login = () => {
  const [error, setError] = useState('');

  const { login,googleSignIn } = useContext(AuthContext);

  
  const handleFormSubmit = e => {
    e.preventDefault();
    setError('')
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
   
    login(email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        form.reset()
      })
      .catch(error => {
        setError((error.code))
        console.error( error)
    })
  }
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
      })
    .catch(error=>console.error(error))
  }
  return (
    <div className='form-container'>
      <h1 className='form-tile'>Login</h1>
      <form onSubmit={handleFormSubmit}>
        {
          error && <p className='password-error'> Error : {error}</p>
        }
        <div className='form-control'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='email' required/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='password' required/>
        </div>
        <button className='submit-btn' type='submit'>Login</button>
        <p className='signup-link'><small >New to Ema-John ? <Link to='/signup'>Create a new account</Link></small></p>
      </form>
      <div className='or-border'>
        <hr />
        <span>or</span>
        <hr />
      </div>
      <button onClick={handleGoogleSignIn} className='google-btn'>
        <img src={img} alt="" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Login;