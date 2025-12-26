
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';

import { getAuth, updateProfile, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

      initializeApp(firebaseConfig);

function Login() {
const [newUser, setNewUser] = useState(false);
const [user, setUser] = useState({
  isSignedIn: false,
  name: '',
  email: '',
  password: '',
  photo: '',
  error: '',
  success: false
})

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shipment";

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        
        // 1. Update local state
        setUser(signedInUser);
        
        // 2. Update Global Context (CRITICAL for PrivateRoute)
        setLoggedInUser(signedInUser);
        
        // 3. Redirect to Shipment
        history(from, { replace: true });
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleFbSignIn = () => {
    const auth = getAuth();
signInWithPopup(auth, facebookProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log('fb user info', user);
    setUser(user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;


    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }

  const handleSignOut = () => {
    const auth = getAuth();
signOut(auth).then(() => {
  const signedOutUser = {
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  }
  setUser(signedOutUser);
}).catch((error) => {
  console.log(error);
});
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber ;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    const auth = getAuth();
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(res => {
        const newUserEnfo = {...user};
        newUserEnfo.error = '';
        newUserEnfo.success = true;
        setUser(newUserEnfo);
        updateUserName(user.name);
      })
      .catch(err => {
        const newUserEnfo = {...user};
        newUserEnfo.error = err.message;
        newUserEnfo.success = false;
        setUser(newUserEnfo);
        
      })
    }

    if(!newUser && user.email && user.password){
      // Handle sign in for existing users here
      const auth = getAuth();
signInWithEmailAndPassword(auth, user.email, user.password)
  .then(res => {
    // Signed in 
    const newUserEnfo = {...user};
        newUserEnfo.error = '';
        newUserEnfo.success = true;
        
        setUser(newUserEnfo);
        setLoggedInUser(newUserEnfo);
        history(from, { replace: true });
        console.log('sign in user info', res.user);
    // ...
  })
  .catch((error) => {
    const newUserEnfo = {...user};
        newUserEnfo.error = error.message;
        newUserEnfo.success = false;
        setUser(newUserEnfo);
  });
    }

    e.preventDefault();
  }

const auth = getAuth();
const updateUserName = (name) => {
updateProfile(auth.currentUser, {
  displayName: name,
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
})
}
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
        <button onClick={handleFbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignedIn && <div>
          <h1>Welcome, {user.name}</h1>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" referrerPolicy="no-referrer"/>
        </div>
      }
      
      <h1>Our own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
     {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}
      <br />
      <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required />
      <br />
      <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
      <br />
      <input type="submit" value={newUser ? "Create Account" : "Sign In"} />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
     {user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'signed in'} successfully</p>}
    </div>
  );
}

export default Login;