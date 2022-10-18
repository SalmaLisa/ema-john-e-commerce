import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import  {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
   return createUserWithEmailAndPassword(auth,email,password)
  }
  
  const login = (email, password)=> {
   return signInWithEmailAndPassword(auth,email,password)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    })
    return () => {
      unsubscribe();
    }
  }, [])
  
  const logOut = () => {
   return signOut(auth)
  }

  const googleSignIn = () => {
    return signInWithPopup(auth,googleProvider)
  }
  const authInfo={createUser,login,user,logOut,googleSignIn}
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;