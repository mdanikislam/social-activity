import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import logo from '../../Image/logos/social_activity.png'
import google from '../../Image/logos/google.png'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig)

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } }
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const newUser = { ...user };
        newUser.isSignedIn = true;
        newUser.name = displayName;
        newUser.email = email;
        newUser.photo = photoURL;
        setUser(newUser);
        history.replace(from);
      })
      .catch(err => {
        const errorCode = err.code;
        const errMessage = err.message;
        const email = err.email;
        console.log(errorCode, errMessage, email);
      })
  }
  const logoStyle = {
    width: '10%',
    marginLeft: '400px'
  };
  const loginArea = {
    backgroundColor: '#fff',
    margin: '50px auto',
    padding: '120px 0',
    border: '1px solid #000',
    width: '570px',
    height: '400px',
    borderRadius: '4px',
    textAlign: 'center'
  }
  const loginBtn = {
    fontWeight: '600',
    display: 'flex',
    margin: '20px auto',
    padding: '5px',
    border: '1px solid #000',
    width: '70vh',
    height: '40px',
    borderRadius: '50px',
    cursor: 'pointer'
  }
  return (
    <div style={{ backgroundColor: '#e5e5e5', height: '100vh' }}>
      <img style={logoStyle} src={logo} alt="" />
      <div style={loginArea} className='my-5'>
        <h4>Login With</h4>
        <div style={loginBtn} onClick={handleGoogleSignIn}>
          <img src={google} style={{ width: '25px' }} alt="" />
          <p className='ml-5 pl-5'>Continue with Google</p>
        </div>
        <p>Don't have an account?<a href='/'>Create an account</a></p>
      </div>
    </div>
  );
};

export default Login;