import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../context/auth/authContext";


const Navbar = () => {

    const navigate = useNavigate();
    const {setIsUserLoggedIn}= useContext(authContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const checkUserLogin = ()=>{
        if(localStorage.authToken){
            setIsLoggedIn(true);
            setIsUserLoggedIn(true);
        }else{
            setIsLoggedIn(false);
            setIsUserLoggedIn(false);
        }
    }

    useEffect(()=>{
        checkUserLogin();
    })


  return (
    <div className="flex w-full justify-end sticky top-0 bg-slate-400">
      {isLoggedIn ? (
        <button
          className="p-2 bg-blue-500 m-2 mr-4 rounded-lg"
          onClick={() => {
            localStorage.clear();
            checkUserLogin()
          }}
        >
          Log Out
        </button>
      ) : (
        <button
          className="p-2 bg-blue-500 m-2 mr-4 rounded-lg"
          onClick={()=>{
            navigate("/login")
            checkUserLogin()
        }}
        >
          Log in
        </button>
      )}
    </div>
  );
};

export default Navbar;
