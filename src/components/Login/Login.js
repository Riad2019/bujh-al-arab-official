import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';


const Login = () => {

   const [loggedInUser,setLoggedInUser]=useContext( UserContext)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

 }
    
    const handleGoogleSignIn=()=> {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    const {displayName , email} = result.user;
    const signInUser = {name: displayName, email}
    setLoggedInUser(signInUser)
    

    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign IN</button>
        </div>
    );
};

export default Login;