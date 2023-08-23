import React, { useContext, useEffect, useState } from "react";
import authContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { getLoggedInUserData, isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext);

  const [credentials, setCredetials] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredetials({ ...credentials, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const { success, authToken } = await response.json();

    // console.log(authToken);
    setCredetials({ email: "", password: "" });
    if (success) {
      localStorage.setItem('authToken', authToken);
      setIsUserLoggedIn(true);
      navigate('/');
      console.log("Logged In");
      getLoggedInUserData();
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('authToken')){
      setIsUserLoggedIn(true)
    }
    else{
      setIsUserLoggedIn(false)
    }
  })
  

  return (
    <div className="flex  flex-col w-full justify-center items-center mt-10">
      <div className="flex flex-col bg-slate-300 p-3 rounded-lg">
        <h1 className="text-center w-full mb-3">Login Form</h1>
        <form
          id="login"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* <h1>{isUserLoggedIn ? "Logged in" : "Not logged in"}</h1> */}

          <div className="flex justify-between items-center">
            <h1>Email</h1>
            <input
              name="email"
              value={credentials.email}
              onChange={onChange}
              type="email"
              className="ml-3 px-2 py-1 outline-none rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <h1>Password</h1>
            <input
              name="password"
              value={credentials.password}
              onChange={onChange}
              type="password"
              className="ml-3 px-2 py-1 outline-none rounded-lg"
            />
          </div>
          <h4 className="text-center -my-2 text-base">
            don't have account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 "
            >
              register
            </button>
          </h4>
          <div className="flex justify-between items-center">
            <button className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg w-full">
              Login
            </button>
          </div>
        </form>
      </div>
      <h1 className="mt-20">{isUserLoggedIn ? "Logged in" : "not logged in"}</h1>
    </div>
  );
};

export default LoginForm;
