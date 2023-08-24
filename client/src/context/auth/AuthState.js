import React, { useEffect, useState } from 'react'
import authContext from './authContext'

const AuthState = (props) => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)

  const checkUserLogin = () => {
    if (localStorage.authToken) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false)
    }
  }


  const [loggedInUserData, setLoggedInUserData] = useState([]);


  const getLoggedInUserData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    const userData = await response.json();
    setLoggedInUserData(userData);
    console.log(userData);
  };


  useEffect(()=>{
    getLoggedInUserData();
  },[]);


  return (
    <authContext.Provider value={{ getLoggedInUserData, loggedInUserData, isUserLoggedIn, setIsUserLoggedIn, checkUserLogin }}>
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState