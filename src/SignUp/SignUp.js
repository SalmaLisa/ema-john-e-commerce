import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import img from '../assets/google.svg'
import { AuthContext } from '../Contexts/UserContext';


const SignUp = () => {
  const [passwordError, setPasswordError] = useState('');
  const { createUser,googleSignIn } = useContext(AuthContext);
 
  const handleFormSubmit = e => {
    e.preventDefault();
    setPasswordError('')
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (!(password === confirmPassword)) {
      setPasswordError("password doesn't match !")
    }
    console.log(email, password, confirmPassword)
    createUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        form.reset()
      })
    .catch(error=>console.error(error))

  }
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
      })
    .catch(error=>console.error(error))
  }
  return (
    <div className='signUpForm-container'>
      <h1 className='form-tile'>Sign Up</h1>
      <form onSubmit={handleFormSubmit} >
        <div className='form-control'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' placeholder='email' required/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='password' required/>
        </div>
        <div className='form-control'>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name='confirmPassword' placeholder='confirm password' required/>
        </div>
        {
          passwordError && <p className='password-error'>{passwordError}</p>
        }
        <button className='submit-btn' type='submit'>Sign Up</button>
        <p className='signup-link'><small >Already have an account ? <Link to='/login'>Login</Link></small></p>
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

export default SignUp;